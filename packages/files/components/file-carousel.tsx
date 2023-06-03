import React from 'react';
import { FileExplorer } from './file-explorer';
import Link from 'next/link';

export const FileCarousel = () => {
    return (
        <div className="flex flex-col gap-3 px-5 md:px-0 md:max-w-[646px]">
            <div className="flex justify-between">
                <h1 className="text-subtitle-sb text-white-100 font-bold">
                    Fichiers
                </h1>
                <Link
                    href="files"
                    className="text-body-b text-white-100 font-bold"
                >
                    Voir plus
                </Link>
            </div>
            <FileExplorer></FileExplorer>
        </div>
    );
};
