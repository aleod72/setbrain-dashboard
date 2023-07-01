'use client';

import Image from 'next/image';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSwipeable } from 'react-swipeable';

import { projectContext } from '../providers/project-provider';

export const MobileProjectMenu = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const project = React.useContext(projectContext);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const stateStyle = isMenuOpen ? 'translate-x-0' : '-translate-x-full';
    const handlers = useSwipeable({
        onSwiped: (eventData) => setIsMenuOpen(eventData.dir === 'Right'),
    });

    if (!project) return <MobileProjectMenuSkeleton />;

    return (
        <div {...handlers}>
            <div
                className="w-14 h-14 rounded-xl relative overflow-hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <Image
                    src={project.project_icon_url}
                    alt={project?.name + ' icone'}
                    fill={true}
                ></Image>
            </div>
            {isMenuOpen && (
                <span
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute bg-black-100 opacity-80 w-full h-full z-10 top-0 left-0"
                ></span>
            )}
            <div
                className={
                    'bg-darkgrey-100 absolute top-0 left-0 w-3/4 h-full py-6 pl-5 pr-10 flex flex-col gap-5 z-10 duration-75 ' +
                    stateStyle
                }
            >
                {children}
            </div>
        </div>
    );
};

export const MobileProjectMenuSkeleton = () => {
    return <Skeleton borderRadius={10} height={56} width={56}></Skeleton>;
};
