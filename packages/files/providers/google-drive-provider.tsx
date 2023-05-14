'use client';

import React, { use, cache, useEffect, useState } from 'react';
import { useSupabase } from 'auth/providers/supabase-provider';
import Cookies from 'js-cookie';

export const googleDriveContext = React.createContext<string | undefined>(
    undefined
);

const getSession = cache(async () => {
    const supabase = useSupabase().supabase;
    const {data, error} = await supabase.auth.getSession();

    if(error) throw error;

    return data.session;
});

export function GoogleDriveProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = use(getSession());
    const [accessToken, setAccessToken] = useState(session?.provider_token || '');
    const [refreshToken, setRefreshToken] = useState(session?.provider_refresh_token || '');

    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                const savedRefreshToken = Cookies.get('refreshToken');

                if (savedRefreshToken) {
                    setRefreshToken(savedRefreshToken);
                    const response = await fetch('https://accounts.google.com/o/oauth2/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            client_id: '418440986398-1m3bansqhk26j38iboribm0q5ojd8mr9.apps.googleusercontent.com',
                            client_secret: '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',
                            refresh_token: savedRefreshToken,
                            grant_type: 'refresh_token',
                        }),
                    });

                    const data = await response.json();

                    if (response.ok) {
                        const newAccessToken = data.access_token;

                        setAccessToken(newAccessToken);
                    }
                }
            } catch (error) {
                throw error;
            }
        };

        if (!accessToken) {
            refreshAccessToken();
        }
    }, [accessToken]);

    useEffect(() => {
        if(refreshToken !== '') {
            Cookies.set('refreshToken', refreshToken, { expires: 30 });
        }
    }, [refreshToken]);

    return <googleDriveContext.Provider value={accessToken}>
        {children}
    </googleDriveContext.Provider>;
}
