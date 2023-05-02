import {
    ProjectCard,
    ProjectCardSkeleton,
} from 'projects/components/project-card/project-card';
import React, { Suspense } from 'react';
import {DynamicLink} from 'ui/components/dynamic-link/DynamicLink';
import { isMobile } from 'utils/mobile';
import { getAllProjectsIds } from 'utils/projects';

import { ProfileCard } from './profile-card';

export const TabbarDesktop = (async () => {
    const { data } = await getAllProjectsIds();

    return (
        <section className="max-w-xs bg-darkgrey-100 py-10 px-7">
            <div className="flex flex-col gap-6 w-full">
                <ProfileCard />

                <div className="flex flex-col gap-5">
                    <h1 className="text-subtitle-sb text-white-100 font-bold">
                        Projets
                    </h1>
                    <div className="flex flex-col gap-6">
                        {data &&
                            data.map((project) => (
                                <Suspense
                                    key={project.id}
                                    fallback={<ProjectCardSkeleton />}
                                >
                                    <ProjectCard projectId={project.id} />
                                </Suspense>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}) as unknown as () => JSX.Element;

export const TabbarMobile = () => {
    return (
        <div className='fixed w-full bottom-0 py-7 px-9 flex gap-8 justify-between bg-darkgrey-100 text-white-48 z-20'>
            <DynamicLink href={'/home'} activeClass='text-white-100'>
                <i className="fi fi-sr-apps text-2xl"></i>
            </DynamicLink>
            <DynamicLink href={'/tasks'} activeClass='text-white-100'>
                <i className="fi fi-br-list-check text-2xl"></i>
            </DynamicLink>
            <DynamicLink href={'/admin'} activeClass='text-white-100'>
                <i className="fi fi-sr-edit text-2xl"></i>
            </DynamicLink>
            <DynamicLink href={'/stats'} activeClass='text-white-100'>
                <i className="fi fi-sr-stats text-2xl"></i>
            </DynamicLink>
            <DynamicLink href={'/files'} activeClass='text-white-100'>
                <i className="fi fi-sr-folder text-2xl"></i>
            </DynamicLink>
        </div>
    );
};

export const Tabbar = () => {
    return <>{isMobile() ? <TabbarMobile /> : <TabbarDesktop />}</>;
};
