'use client';

import React from "react"
import { getProfilePictureLinkById } from "utils/profiles";
import { useSupabase } from "../providers/supabase-provider";

interface ProfilePictureProps {
    id: string
    isLogged?: boolean
}

export const ProfilePicture = ({id, isLogged = false}: ProfilePictureProps) => {
    const supabase = useSupabase().supabase;
    const [profilePictureLink, setProfilePictureLink] = React.useState<string>('');
    
    React.useEffect(() => {
        getProfilePictureLinkById(id, supabase).then(res => setProfilePictureLink(res));
    });
    
    return <div className={`h-full aspect-square rounded-full overflow-hidden border-2 ${isLogged ? 'border-blue-100': 'border-black-24'}`}>
        <img src={profilePictureLink} />
    </div>
}

