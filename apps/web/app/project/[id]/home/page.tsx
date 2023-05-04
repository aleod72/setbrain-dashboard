import React from 'react';
import { ActivitiesCarousel } from 'tasks/components/activities-carousel';
import { TaskCarousel } from 'tasks/components/task-carousel';

import { HomeHead } from './home-head';

function HomeProjectPage() {
    return (
        <>
            <HomeHead></HomeHead>
            <TaskCarousel></TaskCarousel>
            <ActivitiesCarousel></ActivitiesCarousel>
        </>
    );
}

export default HomeProjectPage;
