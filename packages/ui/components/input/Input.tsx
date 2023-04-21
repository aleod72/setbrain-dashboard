import * as Label from '@radix-ui/react-label';
import { cva, VariantProps } from 'class-variance-authority';
import { ChangeEventHandler } from 'react';

export const input = cva(
    'bg-grey-100 p-3 rounded-lg border-2 text-white-100 text-xs focus:outline-none focus:border-lightgrey-48',
    {
        variants: {
            state: {
                normal: 'border-lightgrey-100',
                error: 'border-red-100',
                success: 'border-green-100',
            },
            disabled: {
                true: 'important:cursor-not-allowed important:bg-darkgrey-100 important:border-grey-100',
            },
            fullWidth: {
                true: 'w-full',
            },
        },
        defaultVariants: {
            state: 'normal',
            disabled: false,
            fullWidth: false,
        },
    }
);

export interface InputProps extends VariantProps<typeof input> {
    label?: string;
    disabled?: boolean;
    errorMessage?: string;
    id?: Pick<React.InputHTMLAttributes<HTMLInputElement>, 'id'>['id'];
    onChange?: ChangeEventHandler<HTMLInputElement>;
    placeholder?: Pick<
        React.InputHTMLAttributes<HTMLInputElement>,
        'placeholder'
    >['placeholder'];
    type?: Pick<React.InputHTMLAttributes<HTMLInputElement>, 'type'>['type'];
}

export function Input(props: InputProps) {
    const { label, errorMessage, id, onChange, placeholder, disabled, type } =
        props;

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <Label.Root
                    htmlFor={id}
                    className="text-white-100 text-body-m font-medium"
                >
                    {label}
                </Label.Root>
            )}
            <input
                type={type}
                className={input(props)}
                data-testid="input"
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                id={id}
            />
            {errorMessage && (
                <span className="text-red-100 text-xs">{errorMessage}</span>
            )}
        </div>
    );
}
