import React, { Suspense } from 'react';
import { ActivitiesCarousel } from 'tasks/components/activities-carousel';
import {
    HomeTaskCarousel,
    HomeTaskCarouselSkeleton,
} from 'tasks/components/home-task-carousel';
import { HomeHead } from './home-head';
import { FileCarousel } from 'files/components/file-carousel';
import { MobileMenu, MobileMenuSkeleton } from 'auth/components/mobile-menu';
import { Communication, CommunicationSkeleton } from 'communication/components/communication';

function HomeProjectPage() {
    return (
        <>
            <Suspense fallback={<MobileMenuSkeleton />}>
                <MobileMenu />
            </Suspense>
            <HomeHead></HomeHead>
            <Suspense fallback={<HomeTaskCarouselSkeleton />}>
                <HomeTaskCarousel></HomeTaskCarousel>
            </Suspense>
            <div className="flex flex-col gap-6 md:flex-row">
                <div className="flex flex-col gap-10 w-full md:max-w-[646px]">
                    <ActivitiesCarousel></ActivitiesCarousel>
                    <FileCarousel></FileCarousel>
                </div>
                <Suspense fallback={<CommunicationSkeleton />}>
                    <Communication />
                </Suspense>
            </div>
        </>
    );
}

export default HomeProjectPage;
