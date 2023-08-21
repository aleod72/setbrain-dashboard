import { cva, VariantProps } from 'class-variance-authority';
import React, { ComponentPropsWithoutRef } from 'react';

export const button = cva('flex items-center rounded-xl text-white-100 gap-2', {
    variants: {
        intent: {
            primary:
                'border-4 bg-grey-100 border-grey-86 hover:bg-darkgrey-72 hover:border-darkgrey-48 focus:bg-darkgrey-86 focus:border-darkgrey-72',
            stroked: 'border-4 border-grey-100',
            backgroundless: 'border-none bg-transparent',
            social: 'border-4 bg-blue-100 border-blue-48 hover:bg-blue-72 hover:border-blue-24 focus:bg-blue-86 focus:border-blue-72',
        },
        fullWidth: {
            true: 'w-full justify-center py-3',
            false: 'w-fit',
        },
        small: {
            true: 'py-1 px-2 text-pretitle-s',
            false: 'py-2 px-4 text-body-m',
        },
        buttonIcon: {
            true: 'grid !px-0 !py-0 place-items-center h-11 !w-11',
            false: 'py-2 px-4',
        },
        disabled: {
            true: 'bg-black-72 border-black-72 cursor-not-allowed text-white-48 hover:bg-black-72 hover:border-black-72 focus:bg-black-72 focus:border-black-72',
        },
        bold: {
            true: 'font-bold',
            false: 'font-normal',
        },
    },
    defaultVariants: {
        intent: 'primary',
        fullWidth: false,
        disabled: false,
        small: false,
        bold: false,
    },
});

export interface ButtonProps extends VariantProps<typeof button> {
    children?: React.ReactNode;
    iconLeft?: string;
    iconRight?: string;
    onClick?: Partial<ComponentPropsWithoutRef<'button'>>['onClick'];
    width?: string;
    height?: string;
    iconButton?: string;
}

export function Button(props: ButtonProps) {
    const {
        children,
        buttonIcon,
        iconButton,
        iconLeft,
        iconRight,
        disabled,
        intent,
        small,
        width,
        height,
        onClick,
    } = props;

    const iconStyle =
        (buttonIcon
            ? small
                ? 'text-base h-2'
                : 'text-base h-4 w-4 relative before:top-0 before:left-0 before:absolute'
            : 'text-white-72 text-sm h-[18px]') +
        (disabled ? ' text-white-24' : '');
    const iconType: 'fi-brands-' | 'fi-rr-' =
        intent === 'social' ? 'fi-brands-' : 'fi-rr-';

    const buttonContent = (
        <>
            {iconLeft && (
                <i
                    className={`fi ${iconType + iconLeft} ${iconStyle}`}
                    data-testid="iconLeft"
                ></i>
            )}
            {buttonIcon ? (
                <i
                    className={`fi fi-rr-${iconButton} ${iconStyle}`}
                    data-testid="icon"
                ></i>
            ) : (
                children
            )}
            {iconRight && (
                <i
                    className={`fi fi-rr-${iconRight} ${iconStyle}`}
                    data-testid="iconRight"
                ></i>
            )}
        </>
    );

    return (
        <button
            className={
                button(props) +
                (width ? ` w-[${width}]` : '') +
                (height ? ` h-[${height}]` : '')
            }
            onClick={onClick}
            data-testid="button"
        >
            {buttonContent}
        </button>
    );
}
