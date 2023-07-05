'use client';

import React from 'react';
import { Dialog, DialogClose } from 'ui/components/dialog/Dialog';
import { FileExplorer } from './file-explorer';
import { profileContext } from 'auth/providers/profile-provider';
import { useSupabase } from 'auth/providers/supabase-provider';
import { uploadFile } from 'utils/files';
import { FileUploadDialog } from './file-upload-dialog';

interface UploadFromDriveDialogProps {
    trigger: React.ReactNode;
}

export const UploadFromDriveDialog = ({
    trigger,
}: UploadFromDriveDialogProps) => {
    const closeButtonRef = React.useRef<HTMLButtonElement>(null);
    const openButtonRef = React.useRef<HTMLButtonElement>(null);
    const [fileId, setFileId] = React.useState<string | undefined>(undefined);
    const profile = React.useContext(profileContext);
    const supabase = useSupabase().supabase;
    const handleSeletion = async (fileId: string) => {
        if (!profile?.id) return;
        await uploadFile(fileId, supabase, profile?.id, []);
        setFileId(fileId);
        openButtonRef.current?.click();
    };

    return (
        <Dialog trigger={trigger}>
            <div className="w-[40vw] h-[40vh] overflow-scroll overflow-x-hidden px-[22px] py-5 bg-darkgrey-100 rounded-3xl border border-darkgrey-48 flex flex-col gap-4">
                <h1 className="text-white-100 text-subtitle-sb font-bold">
                    Selectionnez le fichier
                </h1>
                <FileExplorer
                    full={true}
                    forSelection={true}
                    onSelection={handleSeletion}
                ></FileExplorer>
            </div>
            <DialogClose>
                <button ref={closeButtonRef}></button>
            </DialogClose>
            <FileUploadDialog fileId={fileId || ''}>
                <button ref={openButtonRef}></button>
            </FileUploadDialog>
        </Dialog>
    );
};
