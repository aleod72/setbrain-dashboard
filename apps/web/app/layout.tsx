import 'server-only';
import 'assets/global.css';
import 'react-loading-skeleton/dist/skeleton.css';

import SupabaseListener from 'auth/components/supabase-listener';
import ProfileProvider from 'auth/providers/profile-provider';
import SupabaseProvider from 'auth/providers/supabase-provider';
import { SkeletonTheme } from 'react-loading-skeleton';
import { createClient } from 'utils/supabase-server';

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return (
        <html lang="en">
            {/* eslint-disable-next-line @next/next/no-head-element*/}
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css"
                ></link>
                <link
                    rel="stylesheet"
                    href="https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css"
                ></link>
                <link
                    rel="stylesheet"
                    href="https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css"
                ></link>
                <link
                    rel="stylesheet"
                    href="https://cdn-uicons.flaticon.com/uicons-brands/css/uicons-brands.css"
                ></link>
                <link
                    rel="stylesheet"
                    href="https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css"
                ></link>
                <title>Setbrain Dashboard</title>
            </head>
            <body className="bg-black-100 text-white-100 h-full md:h-screen w-screen md:flex overflow-x-hidden">
                <SupabaseProvider>
                    <SupabaseListener
                        serverAccessToken={session?.access_token}
                    />
                    <ProfileProvider>
                        <SkeletonTheme
                            baseColor="#5b5b5b"
                            highlightColor="#6a6a6a"
                        >
                            {children}
                        </SkeletonTheme>
                    </ProfileProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
