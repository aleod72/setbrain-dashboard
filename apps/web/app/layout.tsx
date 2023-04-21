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
            <body className="bg-black-100 text-white-100 h-screen w-screen flex overflow-hidden">
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
