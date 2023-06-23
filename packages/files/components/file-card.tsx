'use client';

import React, { use, useContext } from 'react';
import { getFile } from 'utils/files';
import { googleDriveContext } from '../providers/google-drive-provider';

interface FileCardProps {
    fileId: string;
}

export const FileCard = ({fileId}: FileCardProps) => {
    const driveToken = useContext(googleDriveContext);

    if (!driveToken) return <div>Not logged in</div>;

    const file = use(getFile(fileId, driveToken));


    return <div>
        {file?.name}
    </div>;
};