'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useSupabase } from '../providers/supabase-provider';

export default function SupabaseListener({
    serverAccessToken,
}: {
    serverAccessToken?: string;
}) {
    const { supabase } = useSupabase();
    const router = useRouter();

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.access_token !== serverAccessToken) {
                router.refresh();
            }
        });

        supabase.auth.getSession().then((session) => {
            if (!session.data.session) {
                console.log('disconnected');
                router.push('login');
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [serverAccessToken, router, supabase]);

    return null;
}
