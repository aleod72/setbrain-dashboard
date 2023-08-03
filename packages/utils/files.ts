import { cache } from 'react';
import { Database } from 'types/database';
import { SupabaseClient } from '@supabase/supabase-js';

export const getFile = cache(async (fileId: string, token: string) => {
    const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?fields=*&supportsAllDrives=true`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then((res) => res.json());

    return response;
});

export const getShorcutsDetails = cache(
    async (fileId: string, token: string) => {
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files/${fileId}?fields=thumbnailLink,size&supportsAllDrives=true`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then((res) => res.json());

        return response;
    }
);

export const getFileSharedUsers = cache(
    async (fileId: string, supabase: SupabaseClient<Database>) => {
        const response = await supabase
            .from('files')
            .select('shared_users')
            .eq('drive_id', fileId);

        return response.data && response.data.length > 0
            ? response.data[0].shared_users
            : [];
    }
);

export const getFilesIn = cache(
    async (folderId: string, token: string, driveId?: string) => {
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=*${
                driveId
                    ? `&supportsAllDrives=true&driveId=${driveId}&corpora=drive&includeItemsFromAllDrives=true`
                    : ''
            }`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then((res) => res.json());

        return response;
    }
);

export const getFileParrent = cache(async (fileId: string, token: string) => {
    const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileId}?fields=parents`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then((res) => res.json());

    return response.parents;
});

export const getFileId = cache(async (fileName: string, token: string) => {
    const response = await fetch(
        `https://www.googleapis.com/drive/v3/files/${fileName}?fields=id`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then((res) => res.json());

    return response.id;
});

export const getFiles = cache(async (fileIds: string[], token: string) => {
    const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?id=${fileIds.join(
            ','
        )}&fields=*`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then((res) => res.json());

    return response;
});

export const uploadFile = async (
    fileDriveId: string,
    supabase: SupabaseClient<Database>,
    creatorId: string,
    shared_user: string[],
    token: string,
    parentFolderName: string
) => {
    const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('drive_id', fileDriveId);

    if (error) {
        console.log('Error fetching data:', error.message);
        return;
    }

    const sharedDriveID = process.env.NEXT_PUBLIC_SHARED_DRIVE_ID;
    const taskFolderId = process.env.NEXT_PUBLIC_TASK_FOLDER_ID;

    if (!sharedDriveID || !taskFolderId) {
        throw new Error('Missing env variables');
    }

    const taskFolder = await createFolderIfNotExist(
        parentFolderName,
        token,
        taskFolderId,
        sharedDriveID
    );

    const shortcutFile = await fetch(
        `https://www.googleapis.com/drive/v3/files`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                parents: ['root'],
                mimeType: 'application/vnd.google-apps.shortcut',
                shortcutDetails: {
                    targetId: fileDriveId,
                },
            }),
        }
    ).then((res) => res.json());

    const parentsOfCopiedFile = await getFileParrent(shortcutFile.id, token);

    await fetch(
        `https://www.googleapis.com/drive/v3/files/${
            shortcutFile.id
        }?addParents=${taskFolder}&removeParents=${parentsOfCopiedFile.join(
            ','
        )}&fields=*&supportsAllDrives=true&driveId=${sharedDriveID}`,
        {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    ).then((res) => res.json());

    if (data.length > 0) {
        return supabase
            .from('files')
            .select()
            .eq('drive_id', fileDriveId)
            .single();
    } else {
        return supabase
            .from('files')
            .insert({
                creator: creatorId,
                shared_users: shared_user,
                drive_id: shortcutFile.id,
            })
            .select()
            .single();
    }
};

export const createFolderIfNotExist = async (
    folderName: string,
    token: string,
    parentFolderId: string,
    driveId?: string
) => {
    const { files } = await getFilesIn(parentFolderId, token, driveId);

    const folder = files.find(
        (file: { name: string; trashed: boolean }) =>
            file.name === folderName && file.trashed === false
    );

    if (folder) {
        return folder.id;
    } else {
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files?driveId=${driveId}&supportsAllDrives=true`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: folderName,
                    mimeType: 'application/vnd.google-apps.folder',
                    parents: [parentFolderId],
                }),
            }
        ).then((res) => res.json());

        return response.id;
    }
};
