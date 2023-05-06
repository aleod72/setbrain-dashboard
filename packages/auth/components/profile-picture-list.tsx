'use client';

import React from 'react';
import { Skeleton } from 'ui/components/skeleton/Skeleton';

import { profileContext } from '../providers/profile-provider';
import { ProfilePicture } from './profile-picture';

interface ProfilePictureListProps {
    ids: string[];
}

export const ProfilePictureList = ({ ids }: ProfilePictureListProps) => {
    const profile = React.useContext(profileContext);
    const [viewedIds, setViewedIds] = React.useState<string[]>([]);
    const loggedUserIdIndex = profile ? ids.indexOf(profile.id) : 0;

    React.useEffect(() => {
        const listId = [...ids];

        if (loggedUserIdIndex === 0) {
            setViewedIds(listId.slice(0, 4));
        }
        setViewedIds(
            listId.splice(loggedUserIdIndex + 1, listId.length).slice(0, 3)
        );
    }, [ids, loggedUserIdIndex, profile]);

    return (
        <div className="flex w-full h-full">
            {ids.length > 4 && (
                <span className="mr-[1px] bg-lightgrey-100 border-2 border-black-24 h-full rounded-full grid place-items-center text-pretitle-s aspect-square">
                    {ids.length - 4}
                </span>
            )}
            {viewedIds.map((id, index) => {
                return (
                    <span
                        className="ml-[-10px] h-full aspect-square"
                        key={'picture-' + id + '-' + index}
                    >
                        <ProfilePicture id={id}></ProfilePicture>
                    </span>
                );
            })}
            {loggedUserIdIndex == 0 && profile && (
                <span className="ml-[-10px] h-full aspect-square">
                    <ProfilePicture
                        id={profile.id}
                        isLogged={true}
                    ></ProfilePicture>
                </span>
            )}
        </div>
    );
};

export const ProfilePictureListSkeleton = () => {
    return (
        <div className="flex h-full w-full">
            <span className="ml-[-10px] relative h-full aspect-square">
                <Skeleton
                    width={'100%'}
                    height={'100%'}
                    circle={true}
                    className="aspect-square border-2 border-black-24"
                ></Skeleton>
            </span>
            <span className="ml-[-10px] relative h-full aspect-square">
                <Skeleton
                    width={'100%'}
                    height={'100%'}
                    circle={true}
                    className="aspect-square border-2 border-black-24"
                ></Skeleton>
            </span>
            <span className="ml-[-10px] relative h-full aspect-square">
                <Skeleton
                    width={'100%'}
                    height={'100%'}
                    circle={true}
                    className="aspect-square border-2 border-black-24"
                ></Skeleton>
            </span>
        </div>
    );
};
