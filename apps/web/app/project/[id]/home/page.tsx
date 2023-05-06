import React, { Suspense } from 'react';
import { ActivitiesCarousel } from 'tasks/components/activities-carousel';
import { TaskCarousel, TaskCarouselSkeleton } from 'tasks/components/task-carousel';

import { HomeHead } from './home-head';

function HomeProjectPage() {
    return (
        <>
            <HomeHead></HomeHead>
            <Suspense fallback={<TaskCarouselSkeleton></TaskCarouselSkeleton>}><TaskCarousel></TaskCarousel></Suspense>
            <Suspense fallback={<ActivitiesCarousel></ActivitiesCarousel>}><ActivitiesCarousel></ActivitiesCarousel></Suspense>
        </>
    );
}

export default HomeProjectPage;
