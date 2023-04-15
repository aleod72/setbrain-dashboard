'use client';

import { useContext } from "react";
import { projectContext } from "projects/providers/project-provider";
import { profileContext } from "auth/providers/profile-provider";

export function HomeHead() {
    const {name} = useContext(projectContext) ?? {name: ''};
    const {firstname} = useContext(profileContext) ?? {name: ''};

    console.log(firstname)
    return <div>
        <h1 className='text-subtitle-mb font-bold text-white-100'>{name}</h1>
        <p className='text-body-l text-white-48'>😄 Bonjour {firstname}, ravie de vous revoir !</p>
    </div>;
}