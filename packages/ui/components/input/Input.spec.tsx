import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { VariantProps } from 'class-variance-authority';
import { beforeEach, describe, expect, it, vitest } from 'vitest';

import { Input, input, InputProps } from './Input';

describe('Input component', () => {
    let props: InputProps;

    beforeEach(() => {
        props = {};
    });

    it('should render with id', () => {
        const testId = 'inputId';

        props.id = testId;
        render(<Input {...props} />);
        const input = screen.getByTestId('input');

        expect(input.id).eq(testId);
    });

    it('should render with correct state', () => {
        const correctInputTypeClass = {
            normal: 'border-lightgrey-100',
            error: 'border-red-100',
            success: 'border-green-100',
        };

        for (const inputState in correctInputTypeClass as VariantProps<
            typeof input
        >) {
            cleanup();
            props.state = inputState as VariantProps<typeof input>['state'];
            render(<Input {...props} />);
            const inputComponent = screen.getByTestId('input');
            const correctClass =
                correctInputTypeClass[
                    inputState as keyof VariantProps<typeof input>['state']
                ];

            expect(
                inputComponent.classList.contains(correctClass)
            ).toBeTruthy();
        }
    });

    it('should render with disable', () => {
        props.disabled = true;
        render(<Input {...props} />);
        const input = screen.getByTestId('input');

        expect(
            input.classList
                .toString()
                .includes(
                    'important:cursor-not-allowed important:bg-darkgrey-100 important:border-grey-100'
                )
        ).toBeTruthy();
    });

    it('should render with message error', () => {
        const errorMessage = 'error message';

        props.errorMessage = errorMessage;
        render(<Input {...props} />);
        const error = screen.getByText(errorMessage);

        expect(error).toBeTruthy();
    });

    it('should render with label', () => {
        const label = 'label';

        props.label = label;
        render(<Input {...props} />);
        const labelElement = screen.getByText(label);

        expect(labelElement).toBeTruthy();
    });

    it('should render with onChange', () => {
        const onChangeFunction = vitest.fn();

        props.onChange = onChangeFunction;
        render(<Input {...props} />);
        const input = screen.getByTestId('input');

        fireEvent.change(input, { target: { value: 'test' } });
        expect(onChangeFunction).toHaveBeenCalled();
    });

    it('should render with placeholder', () => {
        const placeholder = 'placeholder';

        props.placeholder = placeholder;
        render(<Input {...props} />);
        const input = screen.getByTestId('input') as HTMLInputElement;

        expect(input.placeholder).eq(placeholder);
    });
});
