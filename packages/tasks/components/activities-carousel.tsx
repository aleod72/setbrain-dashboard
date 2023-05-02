'use client';

import { projectContext } from 'projects/providers/project-provider';
import React from 'react';
import { getAllActivitiesIdsByProject } from 'utils/activities';

import { ActivitiesRealtime } from './activities-realtime';

export const ActivitiesCarousel = () => {
    const { id } = React.useContext(projectContext) ?? { id: '' };
    const [ids, setIds] = React.useState<number[]>([]);

    React.useEffect(() => {
        const getActivitiesIds = async () => {
            const activitiesIdsArray = await getAllActivitiesIdsByProject(id);

            if (activitiesIdsArray.error) return null;
            const ids = activitiesIdsArray.data.map((activity) => activity.id);

            setIds(ids);
        };

        getActivitiesIds();
    }, [id]);

    return (
        <div className="flex flex-col gap-3 px-5 md:px-0">
            <h1 className="text-subtitle-sb text-white-100 font-bold">
                Travail en cours
            </h1>
            {ids.length > 0 ? (
                <ActivitiesRealtime ids={ids}></ActivitiesRealtime>
            ) : (
                <div className="w-full grid place-items-center bg-darkgrey-100 border-2 border-grey-72 rounded-3xl py-6 px-5 md:w-[676px]">
                    <span className="text-body-s text-white-48">
                        Il n&apos;y a pas de travaux pour l&apos;instant
                    </span>
                </div>
            )}
        </div>
    );
};
