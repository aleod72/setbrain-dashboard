import { HomeHead } from "./home-head";
import React from "react";
import { ActivitiesCarousel } from "tasks";
import { TaskCarousel } from 'tasks/components/task-carousel';

function HomeProjectPage() {
    return <section className='py-6 px-7 w-full gap-3.5 flex flex-col overflow-y-auto'>
        <HomeHead></HomeHead>
        <TaskCarousel></TaskCarousel>
        <ActivitiesCarousel></ActivitiesCarousel>
    </section>
}
  
 export default HomeProjectPage;