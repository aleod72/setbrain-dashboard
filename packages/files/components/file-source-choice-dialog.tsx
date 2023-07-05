import React from 'react';
import { Dialog } from 'ui/components/dialog/Dialog';
import { UploadFromDriveDialog } from './upload-from-drive-dialog';

interface FileUploadDialogProps {
    onClose: () => void;
    trigger: React.ReactNode;
}

export const FileSourceChoiceDialog = ({
    onClose,
    trigger,
}: FileUploadDialogProps) => {
    return (
        <Dialog trigger={trigger}>
            <div className="w-[408px] px-[22px] py-5 bg-darkgrey-100 rounded-3xl border border-darkgrey-48 flex flex-col gap-4">
                <h1 className="text-white-100 text-subtitle-sb font-bold">
                    Selectionnez la source
                </h1>
                <div className="flex flex-col gap-5">
                    <UploadFromDriveDialog
                        trigger={
                            <button className="flex flex-col w-full rounded-2xl border border-lightgrey-100 flex-col justify-start items-center gap-4 py-4 hover:bg-darkgrey-72">
                                <i className="fi fi-rs-cloud-download-alt h-12 text-5xl text-white-72"></i>
                                <span className="text-white-72 text-body-lm">
                                    Depuis le drive
                                </span>
                            </button>
                        }
                    />

                    <button className="flex flex-col w-full rounded-2xl border border-lightgrey-100 flex-col justify-start items-center gap-4 py-4 hover:bg-darkgrey-72">
                        <i className="fi fi-rr-screen h-12 text-5xl text-white-72"></i>
                        <span className="text-white-72 text-body-lm">
                            Depuis votre appareil
                        </span>
                    </button>
                    <button className="flex flex-col w-full rounded-2xl border border-lightgrey-100 flex-col justify-start items-center gap-4 py-4 hover:bg-darkgrey-72">
                        <i className="fi fi-rr-link h-12 text-5xl text-white-72"></i>
                        <span className="text-white-72 text-body-lm">
                            Depuis un lien externe
                        </span>
                    </button>
                </div>
            </div>
        </Dialog>
    );
};
