import React from "react";
import { getSupportMessages } from "utils/support";
import { SupportItem, SupportItemSkeleton } from "./support-item";

export const Support = (async () => {
    const messages = await getSupportMessages();

    return (
        <div className="flex flex-col w-full rounded-3xl py-4 px-[14px] h-full justify-between">
            <div>
                <div className="w-full h-fit py-4 rounded-t-3xl">
                    <h1>Support</h1>
                </div>
                {
                    messages.length> 0 ? messages.length > 3 ? messages.map((message, index) => <SupportItem key={index} message={message} />) :
                    <div className='flex flex-col gap-6'>
                        {messages.slice(0, 3).map((message, index) => <SupportItem key={index} message={message} />)}
                        <div className="flex flex-col items-center justify-center w-full text-center">
                            <span className='text-white-48 text-body-s'>Pas de demandes en plus pour l&apos;instant</span>
                        </div>
                    </div> :
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <span>Pas de demandes pour l&apos;instant</span>
                    </div>
                }
            </div>
            <div className='w-full flex justify-center'>
                <a href='#' className='text-white font-bold text-body-b no-underline cursor-pointer'>Voir plus</a>
            </div>
        </div>
    );
}) as unknown as () => JSX.Element;

export const SupportSkeleton = () => {
    return (
        <div className="flex flex-col w-full rounded-3xl py-4 px-[14px] h-full justify-between">
            <div>
                <div className="w-full h-fit py-4 rounded-t-3xl">
                    <h1>Support</h1>
                </div>
                <div className='flex flex-col gap-6'>
                    <SupportItemSkeleton />
                    <SupportItemSkeleton />
                    <SupportItemSkeleton />
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <a href='#' className='text-white font-bold text-body-b no-underline cursor-pointer'>Voir plus</a>
            </div>
        </div>
    );
};