import { cache } from 'react';
import { Database } from 'types/database';
import { SupabaseClient } from '@supabase/supabase-js';

export const getFile = cache(async (fileId: string, token: string) => {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?fields=*`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => res.json());

    return response;
});

export const getFileSharedUsers = cache(async (fileId: string, supabase: SupabaseClient<Database>) => {
    const response = await supabase.from('files').select('shared_users').eq('drive_id', fileId);

    return response.data && response.data.length > 0 ? response.data[0].shared_users: [];
});

export const getFilesIn = cache(async (folderId: string, token: string) => {
    const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&fields=*`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then((res) => res.json());

    return response;
});

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