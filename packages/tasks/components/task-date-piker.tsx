'use client';

import { DatePicker } from 'ui/components/date-picker/DatePicker';
import { useSupabase } from 'auth/providers/supabase-provider';
import React from 'react';

interface TaskDatePickerProps {
    taskId: string;
    defaultDate?: Date;
}

export const TaskDatePicker = ({
    taskId,
    defaultDate,
}: TaskDatePickerProps) => {
    const supabase = useSupabase().supabase;
    const handleDateChange = async (date: Date) => {
        console.log(date);
        await supabase
            .from('tasks')
            .update({ end_at: date.toDateString() })
            .match({ id: taskId });
    };

    return (
        <DatePicker
            onDateChange={handleDateChange}
            defaultDate={defaultDate}
            placeholder={'Selectionnez une date de fin'}
            small={true}
        />
    );
};
