'use client';

import {
    CaretSortIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from '@radix-ui/react-icons';
import * as SelectPrimitve from '@radix-ui/react-select';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

export const select = cva(
    'data-[placeholder]:text-white-48 bg-grey-100 border-4 text-white-100 py-1 px-2 rounded-lg gap-3 flex items-center box-border focus-visible:outline-blue-100 focus-visible:outline-2 focus-visible:outline-none',
    {
        variants: {
            intent: {
                normal: 'border-darkgrey-100',
                error: 'border-darkgrey-100 outline-red-100 outline-none',
                success: 'border-darkgrey-100 outline-green-100 outline-none',
            },
            fullWidth: {
                true: 'w-full justify-between',
                false: 'w-fit',
            },
        },
        defaultVariants: {
            intent: 'normal',
            fullWidth: false,
        },
    }
);

export interface SelectProps
    extends SelectPrimitve.SelectProps,
        VariantProps<typeof select> {
    children: React.ReactNode;
    label?: string;
    placeholder?: string;
    fullWidth?: boolean;
}

export interface SelectItemProps extends SelectPrimitve.SelectItemProps {
    children: React.ReactNode;
    value: string;
}

export interface SelectGroupProps extends SelectPrimitve.SelectGroupProps {
    label: string;
    children: React.ReactNode;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
    function Select({ children, ...props }, forwardedRef) {
        const scrollButtonStyle =
            'p-1 bg-grey-100 text-white-100 inline-flex items-center justify-center h-6 w-full;';

        return (
            <div className="flex flex-col gap-2">
                {props.label && (
                    <label
                        className="text-white-100 text-sm"
                        data-testid="label"
                    >
                        {props.label}
                    </label>
                )}
                <SelectPrimitve.Root {...props}>
                    <SelectPrimitve.Trigger
                        className={select(props)}
                        ref={forwardedRef}
                        data-testid="select-trigger"
                    >
                        <SelectPrimitve.Value placeholder={props.placeholder} />
                        <SelectPrimitve.Icon className="text-white-100">
                            <CaretSortIcon />
                        </SelectPrimitve.Icon>
                    </SelectPrimitve.Trigger>

                    <SelectPrimitve.Content className="bg-grey-100 p-2 box-border text-white-100 rounded-lg">
                        <SelectPrimitve.ScrollUpButton
                            className={scrollButtonStyle}
                        >
                            <ChevronUpIcon />
                        </SelectPrimitve.ScrollUpButton>
                        <SelectPrimitve.Viewport>
                            {children}
                        </SelectPrimitve.Viewport>
                        <SelectPrimitve.ScrollDownButton
                            className={scrollButtonStyle}
                        >
                            <ChevronDownIcon />
                        </SelectPrimitve.ScrollDownButton>
                    </SelectPrimitve.Content>
                </SelectPrimitve.Root>
            </div>
        );
    }
);

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
    function SelectItem({ children, ...props }: SelectItemProps, forwardedRef) {
        return (
            <SelectPrimitve.Item
                className="data-[state=checked]:text-blue-86 flex gap-1 items-center rounded-md py-1 px-2 box-border cursor-default focus:outline-none focus:bg-blue-24"
                {...props}
                ref={forwardedRef}
                data-testid="select-item"
            >
                <SelectPrimitve.ItemText>{children}</SelectPrimitve.ItemText>
                <SelectPrimitve.ItemIndicator>
                    <CheckIcon className="text-white-48" />
                </SelectPrimitve.ItemIndicator>
            </SelectPrimitve.Item>
        );
    }
);

export const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
    function SelectGroup({ children, label, ...props }, forwardRef) {
        return (
            <SelectPrimitve.Group
                {...props}
                ref={forwardRef}
                className="p-2 bg-grey-100 rounded-lg mt-2 box-border"
            >
                <SelectPrimitve.Label className="py-1 px-2 text-white-48 text-sm">
                    {label}
                </SelectPrimitve.Label>
                {children}
            </SelectPrimitve.Group>
        );
    }
);
