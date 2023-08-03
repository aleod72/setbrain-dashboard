import React, { use } from 'react';
import { Dialog, DialogClose } from 'ui/components/dialog/Dialog';
import { getFile } from 'utils/files';
import { googleDriveContext } from '../providers/google-drive-provider';
import { File } from 'types/database';
import Image from 'next/image';
import { Input } from 'ui/components/input/Input';
import { UserSharing } from 'auth/components/user-sharing';
import { useSupabase } from 'auth/providers/supabase-provider';
import { Button } from 'ui/components/button/Button';

interface FileUploadDialogProps {
    children: React.ReactNode;
    onSubmit: (driveFileId: string, sharedUsers: string[]) => void;
    driveFileId: string;
    defaultSharedUsers?: string[];
}

export const FileUploadDialog = ({
    children,
    driveFileId,
    onSubmit,
    defaultSharedUsers,
}: FileUploadDialogProps) => {
    const driveToken = React.useContext(googleDriveContext);
    const file = use<File>(getFile(driveFileId, driveToken || ''));
    const [sharedUsers, setSharedUsers] = React.useState<string[]>(
        defaultSharedUsers || []
    );
    const supabase = useSupabase().supabase;
    const handleSharingChanges = async (profileIds: string[]) => {
        setSharedUsers(profileIds);
        await supabase
            .from('files')
            .update({ shared_users: profileIds })
            .match({ drive_id: driveFileId });
    };

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Dialog trigger={children}>
            <div className="w-[25vw] h-[70.5vh] overflow-scroll overflow-x-hidden px-[22px] py-5 bg-darkgrey-100 rounded-3xl border border-darkgrey-48 flex flex-col gap-4">
                <h1 className="text-white-100 text-subtitle-sb font-bold">
                    Ajouter une pièce jointe
                </h1>

                <div className="flex flex-col gap-6">
                    <h2 className="text-subtitle-s">Prévisualisation</h2>
                    <div className="flex w-full justify-center">
                        <span className="relative h-52 w-40 overflow-hidden rounded-2xl">
                            <Image
                                src={file.thumbnailLink || ''}
                                alt={file.name || ''}
                                fill={true}
                            />
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="text-subtitle-s">Options</h2>
                    <Input
                        type="text"
                        disabled={true}
                        label="Nom du fichier"
                        placeholder={file.name || ''}
                    ></Input>
                    <div>
                        <h3 className="text-body-m font-medium">Partage</h3>
                        <UserSharing
                            profileIds={defaultSharedUsers || []}
                            onChange={handleSharingChanges}
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <DialogClose>
                        <Button
                            onClick={() => onSubmit(driveFileId, sharedUsers)}
                        >
                            Importer
                        </Button>
                    </DialogClose>
                </div>
            </div>
        </Dialog>
    );
};
