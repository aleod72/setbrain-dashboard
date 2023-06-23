'use client';

import React, { use } from "react";
import { getProfileById } from "utils/profiles";
import Image from 'next/image';
import { useSupabase } from "../providers/supabase-provider";
import Skeleton from "react-loading-skeleton";

interface ProfileTagProps {
    id: string;
}

export const ProfileTag = ({id}: ProfileTagProps) => {
    const supabase = useSupabase().supabase;
    const {data, error} = use(getProfileById(id, supabase));

    if(error) return <div>Error loading user</div>;
    if(!data) return <ProfileTagSkeleton />;

    return <div className='flex items-center gap-2 px-2 py-[6px] border-2 border-lightgrey-24 rounded-xl'>
        <div className='w-fit h-fit rounded-full overflow-hidden'>
            <Image src={data.avatar_url || ''} width={27} height={27} alt={`profile picture of ${data.firstname}`}/>
        </div>
        <span className='text-body-lm text-white-100'>{data.firstname} {data.lastname}</span>
    </div>;
};

export const ProfileTagSkeleton = () => {
    return <div className='flex items-center gap-2 px-2 py-[6px] border-2 border-lightgrey-24 rounded-xl'>
        <Skeleton borderRadius={50} width={27} height={27} />
        <Skeleton width={60} height={16} />
    </div>;
};