import React from 'react';
import { Chat, ChatSkeleton } from './chat';
import { Support, SupportSkeleton } from './support';

export const Communication = () => {
    return (
        <div className="flex flex-col gap-3 w-full h-full px-5 md:px-0 md:max-w-[312px]">
            <h1 className="text-subtitle-sb text-white-100 font-bold">
                Communication
            </h1>
            <div className='bg-darkgrey-100 border-[1px] border-darkgrey-48 rounded-3xl h-full flex flex-col'>
                <Chat />
                <Support />
            </div>
        </div>
    );
};

export const CommunicationSkeleton = () => {
    return (
        <div className="flex flex-col gap-3 w-full h-full px-5 md:px-0 md:max-w-[312px]">
            <h1 className="text-subtitle-sb text-white-100 font-bold">
                Communication
            </h1>
            <div className='bg-darkgrey-100 border-[1px] border-darkgrey-48 rounded-3xl h-full flex flex-col'>
                <ChatSkeleton />
                <SupportSkeleton />
            </div>
        </div>
    );
};
