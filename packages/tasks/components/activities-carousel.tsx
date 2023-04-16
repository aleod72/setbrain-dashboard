import React from "react"
import { ActivitiesRealtime } from './activities-realtime';
import { getAllActivitiesIds } from "utils/activities";

export const ActivitiesCarousel = (async () => {
    const activitiesIdsArray = await getAllActivitiesIds();
    if(activitiesIdsArray.error) return null;
    const ids = activitiesIdsArray.data.map((activity) => activity.id);
    
    return <div className='flex flex-col gap-3'>
        <h1 className='text-subtitle-sb text-white-100 font-bold'>Travail en cours</h1>
        <ActivitiesRealtime ids={ids ?? []}></ActivitiesRealtime>
    </div>;
}) as unknown as () => JSX.Element;