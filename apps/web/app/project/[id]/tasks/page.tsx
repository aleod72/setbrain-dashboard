import { ActivitiesCarousel, TaskCarousel } from 'tasks';
import { TaskHead } from './task-head';
import { Suspense } from 'react';
import { MobileMenu, MobileMenuSkeleton } from 'auth/components/mobile-menu';

function HomeProjectPage() {
    return (
        <div className="md:overflow-hidden flex flex-col gap-3 h-full">
            <div>
                <Suspense fallback={<MobileMenuSkeleton />}>
                    <MobileMenu />
                </Suspense>
                <TaskHead />
            </div>
            <div className="flex gap-6 flex-col pb-28 md:flex-row md-:pb-0">
                <TaskCarousel />
                <ActivitiesCarousel vertical={true} />
            </div>
        </div>
    );
}

export default HomeProjectPage;
