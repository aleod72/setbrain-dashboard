'use client';

import {
    ProfilePicture,
    ProfilePictureSkeleton,
} from 'auth/components/profile-picture';
import { useSupabase } from 'auth/providers/supabase-provider';
import React, { useContext } from 'react';
import { ChatMessage, Profile } from 'types/database';
import { getProfileById } from 'utils/profiles';
import { isProfile, profileContext } from 'auth/providers/profile-provider';
import Skeleton from 'react-loading-skeleton';

interface MessageProps {
    message: ChatMessage;
}

export const ChatItem = ({ message }: MessageProps) => {
    const supabase = useSupabase().supabase;
    const loggedProfile = useContext(profileContext);
    const [user, setUser] = React.useState<Profile>();
    const isLoggedUser = message.user_id == loggedProfile?.id;

    React.useEffect(() => {
        if (!message.user_id) return;
        getProfileById(message.user_id, supabase).then((res) => {
            const profile = res.data;

            if (isProfile(profile)) {
                setUser(profile);
            }
        });
    }, [message.user_id, supabase]);

    return (
        <div
            className={`flex w-full ${
                isLoggedUser ? 'justify-end' : 'justify-start'
            }`}
        >
            <div
                className={`flex w-fit items-end gap-2 ${
                    isLoggedUser && 'flex-row-reverse'
                }`}
            >
                <div className="w-6 h-6 relative">
                    {user != undefined && (
                        <ProfilePicture id={user.id}></ProfilePicture>
                    )}
                </div>
                <div
                    className={`flex flex-col bg-darkgrey-48 p-2 rounded-t-xl w-48 ${
                        isLoggedUser ? 'rounded-bl-xl' : 'rounded-br-xl'
                    }`}
                >
                    <span className="text-body-s text-white-48">
                        {user?.firstname} {user?.lastname}
                    </span>
                    <p className="text-body-s text-white-100">
                        {message.message}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const ChatItemSkeleton = () => {
    return (
        <div className="flex w-full justify-end">
            <div className="flex w-fit items-end gap-2">
                <div className="w-6 h-6 relative">
                    <ProfilePictureSkeleton></ProfilePictureSkeleton>
                </div>
                <div className="flex flex-col bg-darkgrey-48 p-2 rounded-t-xl w-48 rounded-bl-xl">
                    <Skeleton height={15} width={100} />
                    <Skeleton height={15} width={50} />
                </div>
            </div>
        </div>
    );
};
