'use client';

import React from "react"
import { ProfilePicture } from "./profile-picture";
import { profileContext } from '../providers/profile-provider';

interface ProfilePictureListProps {
    ids: string[]
}

export const ProfilePictureList = ({ids}: ProfilePictureListProps) => {
    const profile = React.useContext(profileContext);
    const [viewedIds, setViewedIds] = React.useState<string[]>([])
    const loggedUserIdIndex = profile ? ids.indexOf(profile.id) : 0;

    React.useEffect(() => {
        const listId = [...ids];
        if(loggedUserIdIndex === 0) {
            setViewedIds(listId.slice(0, 4));
        }
        setViewedIds(listId.splice(loggedUserIdIndex +1, listId.length).slice(0, 3));
    }, [ids, profile])
    
    return <div className="flex w-full h-full">
        {ids.length > 4 && <span className="mr-[1px] bg-lightgrey-100 border-2 border-black-24 h-full rounded-full grid place-items-center text-pretitle-s aspect-square">
            {ids.length - 4}
        </span>}
        {viewedIds.map(id => {
            return <span className="ml-[-10px] h-full aspect-square" key={'picture-' + id}>
                <ProfilePicture id={id}></ProfilePicture>
            </span>
        })}
        {loggedUserIdIndex == 0 && profile && <span className="ml-[-10px] h-full aspect-square">
            <ProfilePicture id={profile.id} isLogged={true}></ProfilePicture>
        </span>}
    </div>
}