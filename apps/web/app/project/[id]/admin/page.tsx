import { Suspense } from 'react';
import { MobileMenu, MobileMenuSkeleton } from 'auth/components/mobile-menu';
import { AdminHead } from './admin-head';
import { ArticlesView } from 'admin/articles-view';

export default function Admin({ params: { id } }: { params: { id: string } }) {
    return (
        <div className="md:overflow-hidden flex flex-col gap-3 h-full">
            <Suspense fallback={<MobileMenuSkeleton />}>
                <MobileMenu />
            </Suspense>
            <AdminHead></AdminHead>
            <ArticlesView projectId={id}></ArticlesView>
        </div>
    );
}
