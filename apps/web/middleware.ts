import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
// eslint-disable-next-line no-duplicate-imports
import { NextResponse } from 'next/server';
// eslint-disable-next-line no-duplicate-imports
import type { NextRequest } from 'next/server';
import type { Database } from 'types/database';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    // @ts-ignore
    const supabase = createMiddlewareClient<Database>({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const url = req.nextUrl.clone();

    if (!session && url.pathname !== '/login') {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    } else if (
        (session && url.pathname === '/') ||
        (session && url.pathname === '/login')
    ) {
        const { data } = (await supabase
            .from('projects')
            .select('id')) as unknown as { data: { id: string }[] };

        if (!data) return NextResponse.redirect('/');
        url.pathname = `/project/${data[0].id}/home`;
        return NextResponse.redirect(url);
    } else if (url.pathname.startsWith('/project')) {
        const projectId = url.pathname.slice(9, url.pathname.indexOf('/', 9));

        const { error } = await supabase
            .from('projects')
            .select('id')
            .eq('id', projectId);

        if (error) {
            const { data } = (await supabase
                .from('projects')
                .select('id')) as unknown as { data: { id: string }[] };

            if (!data) return NextResponse.redirect('/');
            url.pathname = `/project/${data[0].id}/home`;
            return NextResponse.redirect(url);
        }
    }

    return res;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/'],
};
