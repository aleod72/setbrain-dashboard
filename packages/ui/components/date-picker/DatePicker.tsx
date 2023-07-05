'use client';

import { useDatePicker } from '@rehookify/datepicker';
import React from 'react';
import { Button } from '../button/Button';
import { Dialog, DialogClose } from '../dialog/Dialog';
import dayjs from 'dayjs';

interface DatePickerProps {
    onDateChange: (date: Date) => void;
    placeholder?: string;
    defaultDate?: Date;
    small?: boolean;
}

export const DatePicker = ({
    onDateChange,
    defaultDate,
    placeholder,
    small,
}: DatePickerProps) => {
    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
        defaultDate
    );
    const TriggerButton = (
        <Button small={small} iconLeft="calendar">
            {selectedDate ? (
                `${dayjs(selectedDate).format('DD/MM/YYYY')}`
            ) : (
                <span className="text-white-48">
                    {placeholder ?? 'Selectionnez une date'}
                </span>
            )}
        </Button>
    );
    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        selectedDate && onDateChange(date);
    };

    return (
        <Dialog trigger={TriggerButton}>
            <DatePickerDialog onDialogClose={handleDateChange} />
        </Dialog>
    );
};

interface DatePickerDialogProps {
    onDialogClose: (date: Date) => void;
}

export const DatePickerDialog = ({ onDialogClose }: DatePickerDialogProps) => {
    const [selectedDates, onDatesChange] = React.useState<Date[]>([]);
    const {
        data: { weekDays, calendars },
        propGetters: { previousMonthButton, nextMonthButton, dayButton },
    } = useDatePicker({
        selectedDates,
        onDatesChange,
    });

    const { year, month, days } = calendars[0];

    return (
        <div className="w-[408px] min-h-[458px] px-[22px] py-5 bg-darkgrey-100 rounded-3xl border border-darkgrey-48 flex-col justify-start gap-5 flex">
            <h1 className="text-white-100 text-subtitle-sb font-bold">
                Selectionnez une date
            </h1>
            <div className="flex justify-between w-full items-center">
                <button
                    {...previousMonthButton()}
                    className="bg-grey-100 p-1 px-2 border  border-lightgrey-100 rounded-xl"
                >
                    <i className="fi fi-rr-angle-left text-sm"></i>
                </button>
                <p>
                    {month} {year}
                </p>
                <button
                    {...nextMonthButton()}
                    className="bg-grey-100 py-1 px-2 border border-lightgrey-100 rounded-xl"
                >
                    <i className="fi fi-rr-angle-right text-sm "></i>
                </button>
            </div>
            <div className="flex gap-[12px] w-full justify-center items-center">
                {weekDays.map((day) => (
                    <p className="w-10 grid place-items-center" key={day}>
                        {day}
                    </p>
                ))}
            </div>
            <div className="flex w-full justify-center flex-wrap gap-[12px]">
                {days.map((day) => {
                    const buttonStyle = `py-1 px-2  rounded-xl w-10 h-10 ${
                        !day.inCurrentMonth ? 'opacity-50' : ''
                    }
                    ${
                        day.selected
                            ? 'bg-blue-100 text-white-100 border-2 border-blue-48'
                            : 'bg-grey-100 border border-lightgrey-100'
                    }`;

                    return (
                        <button
                            className={buttonStyle}
                            key={day.$date.toString()}
                            {...dayButton(day)}
                            disabled={!day.inCurrentMonth}
                        >
                            {day.day}
                        </button>
                    );
                })}
            </div>
            <div className="flex gap-5 w-full justify-end">
                <DialogClose>
                    <Button onClick={() => onDialogClose(selectedDates[0])}>
                        Valider
                    </Button>
                </DialogClose>
            </div>
        </div>
    );
};
