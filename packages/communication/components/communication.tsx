import React from 'react';
import { Chat } from './chat';

export const Communication = () => {
    return (
        <div className="flex flex-col gap-3 w-full px-5 md:px-0 md:max-w-[300px]">
            <h1 className="text-subtitle-sb text-white-100 font-bold">
                Communication
            </h1>
            <Chat />
        </div>
    );
};
