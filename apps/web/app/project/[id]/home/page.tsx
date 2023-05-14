import React, { Suspense } from 'react';
import { ActivitiesCarousel } from 'tasks/components/activities-carousel';
import { TaskCarousel, TaskCarouselSkeleton } from 'tasks/components/task-carousel';
import { HomeHead } from './home-head';
import { FileCarousel } from 'files/components/file-carousel';

function HomeProjectPage() {
    return (
        <>
            <HomeHead></HomeHead>
            <Suspense fallback={<TaskCarouselSkeleton></TaskCarouselSkeleton>}><TaskCarousel></TaskCarousel></Suspense>
            <div className="flex flex-col gap-10">
                <Suspense fallback={<ActivitiesCarousel></ActivitiesCarousel>}><ActivitiesCarousel></ActivitiesCarousel></Suspense>
                <FileCarousel></FileCarousel>
            </div>
        </>
    );
}

export default HomeProjectPage;
