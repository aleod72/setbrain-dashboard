import React, { use } from 'react';
import { Dialog } from 'ui/components/dialog/Dialog';
import { getFile } from 'utils/files';
import { googleDriveContext } from '../providers/google-drive-provider';
import { File } from 'types/database';
import Image from 'next/image';
import { Input } from 'ui/components/input/Input';

interface FileUploadDialogProps {
    children: React.ReactNode;
    fileId: string;
}

export const FileUploadDialog = ({
    children,
    fileId,
}: FileUploadDialogProps) => {
    const driveToken = React.useContext(googleDriveContext);
    const file = use<File>(getFile(fileId, driveToken || ''));

    return (
        <Dialog trigger={children}>
            <div className="w-[40vw] h-[40vh] overflow-scroll overflow-x-hidden px-[22px] py-5 bg-darkgrey-100 rounded-3xl border border-darkgrey-48 flex flex-col gap-4">
                <h1 className="text-white-100 text-subtitle-sb font-bold">
                    Ajouter une pièce jointe
                </h1>

                <div className="flex flex-col">
                    <h2>Prévisualisation</h2>
                    <div className="relative h-52 w-40">
                        <Image
                            src={file.thumbnailLink || ''}
                            alt={file.name || ''}
                            fill={true}
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <h2>Options</h2>
                    <Input
                        type="text"
                        disabled={true}
                        label="Nom du fichier"
                        placeholder={file.name || ''}
                    ></Input>
                </div>
            </div>
        </Dialog>
    );
};
