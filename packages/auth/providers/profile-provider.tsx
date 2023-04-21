'use client';

import React from 'react';
import { Profile } from 'types/database';
import { getProfileById } from 'utils/profiles';

import { useSupabase } from './supabase-provider';

export const profileContext = React.createContext<Profile | undefined>(
    undefined
);

function isProfile(arg: any): arg is Profile {
    return arg !== undefined;
}

export default function ProfileProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = useSupabase().supabase;
    const [profile, setProfile] = React.useState<Profile | null>(null);

    React.useEffect(() => {
        if (!supabase) return;
        supabase.auth.getUser().then((res) => {
            if (!res.data.user) return null;
            getProfileById(res.data.user.id, supabase).then((res) => {
                if (res.data && isProfile(res.data)) setProfile(res.data);
            });
        });
    }, [supabase, supabase.auth]);

    if (isProfile(profile)) {
        return (
            <profileContext.Provider value={profile}>
                {children}
            </profileContext.Provider>
        );
    } else {
        return <>{children}</>;
    }
}
