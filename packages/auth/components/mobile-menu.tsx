import { MobileProjectMenu } from 'projects/components/mobile-project-menu';
import { ProjectCard, ProjectCardSkeleton } from 'projects/components/project-card/project-card';
import React, { Suspense } from 'react';
import { isMobile } from 'utils/mobile';
import { getAllProjectsIds } from 'utils/projects';
import { createClient } from 'utils/supabase-server';

import { ProfilePicture } from './profile-picture';

export const MobileMenu = (async () => {
    const { data } = await getAllProjectsIds();
    const supabase = createClient();
    const user = (await supabase.auth.getUser()).data.user;

    if(!isMobile() || !user) return null;

    return (
        <div className='w-full p-5 flex justify-between'>
            <MobileProjectMenu>
                <h1 className='font-bold text-subtitle-s'>Nos projets</h1>
                <div className='flex flex-col gap-3 '>
                    {data &&
                        data.map((project) => (
                            <Suspense
                                key={project.id}
                                fallback={<ProjectCardSkeleton />}
                            >
                                <ProjectCard projectId={project.id} isMobile={true}/>
                            </Suspense>
                        ))
                    }
                </div>
            </MobileProjectMenu>
            <span className='w-11 h-11 relative block'><ProfilePicture id={user.id}/></span>
        </div>);
}) as unknown as () => JSX.Element;