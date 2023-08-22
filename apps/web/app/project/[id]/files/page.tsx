import { Suspense } from 'react';
import { MobileMenu, MobileMenuSkeleton } from 'auth/components/mobile-menu';
import { FilesView } from 'files/components/files-view';
import { FilesHead } from './files-head';

function FileProjectPage({ params: { id } }: { params: { id: string } }) {
    return (
        <div className="md:overflow-hidden flex flex-col gap-3 h-full">
            <Suspense fallback={<MobileMenuSkeleton />}>
                <MobileMenu />
            </Suspense>
            <FilesHead></FilesHead>
            <FilesView projectId={id} />
        </div>
    );
}

export default FileProjectPage;
