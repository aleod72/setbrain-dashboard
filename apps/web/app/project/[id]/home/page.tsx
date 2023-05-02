import React from 'react';
import { ActivitiesCarousel } from 'tasks/components/activities-carousel';
import { TaskCarousel } from 'tasks/components/task-carousel';

import { HomeHead } from './home-head';

function HomeProjectPage() {
    return (
        <section className="md:py-6 pb-40 md:px-7 w-full gap-3.5 flex flex-col">
            <HomeHead></HomeHead>
            <TaskCarousel></TaskCarousel>
            <ActivitiesCarousel></ActivitiesCarousel>
        </section>
    );
}

export default HomeProjectPage;
