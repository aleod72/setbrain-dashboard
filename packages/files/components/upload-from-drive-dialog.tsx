'use client';

import React from 'react';
import { Dialog, DialogClose } from 'ui/components/dialog/Dialog';
import { FileExplorer } from './file-explorer';
import { profileContext } from 'auth/providers/profile-provider';

interface UploadFromDriveDialogProps {
    children: React.ReactNode;
    onSubmit: (driveFileId: string) => void;
}

export const UploadFromDriveDialog = ({
    children,
    onSubmit,
}: UploadFromDriveDialogProps) => {
    const closeButtonRef = React.useRef<HTMLButtonElement>(null);
    const profile = React.useContext(profileContext);
    const handleSeletion = async (driveFileId: string) => {
        if (!profile?.id) return;

        onSubmit(driveFileId || '');
        closeButtonRef.current?.click();
    };

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Dialog trigger={children}>
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
        </Dialog>
    );
};
