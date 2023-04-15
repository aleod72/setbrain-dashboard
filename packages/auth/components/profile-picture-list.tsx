'use client';

import React from "react"
import { ProfilePicture } from "./profile-picture";
import { profileContext } from '../providers/profile-provider';

interface ProfilePictureListProps {
    ids: string[]
}

export const ProfilePictureList = ({ids}: ProfilePictureListProps) => {
    
    const profile = React.useContext(profileContext);
    if(!profile) return null;
    const [viewedIds, setViewedIds] = React.useState<string[]>([]);

    React.useEffect(() => {
        const listId = [...ids];
        const loggedUserIdIndex = listId.indexOf(profile.id);
        setViewedIds(listId.splice(loggedUserIdIndex +1, listId.length).slice(0, 3));
        console.log(ids);
    }, [ids, profile])
    
    return <div className="flex">
        {ids.length > 4 && <span className="mr-[1px] bg-lightgrey-100 border-2 border-black-24 h-6 w-6 rounded-full grid place-items-center text-pretitle-s">
            {ids.length - 4}
        </span>}
        {viewedIds.map(id => {
            return <span className="ml-[-10px]" key={id}>
                <ProfilePicture id={id}></ProfilePicture>
            </span>
        })}
        <span className="ml-[-10px]">
            <ProfilePicture id={profile.id} isLogged={true}></ProfilePicture>
        </span>
    </div>
}