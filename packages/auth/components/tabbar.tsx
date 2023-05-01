import {
    ProjectCard,
    ProjectCardSkeleton,
} from 'projects/components/project-card/project-card';
import React, { Suspense } from 'react';
import { getAllProjectsIds } from 'utils/projects';

import { ProfileCard, ProfileCardSkeleton } from './profile-card';

export const Tabbar = (async () => {
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
