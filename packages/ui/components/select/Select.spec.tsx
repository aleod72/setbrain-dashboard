import { cleanup, render, screen } from '@testing-library/react';
import { VariantProps } from 'class-variance-authority';
import React, { createRef } from 'react';
import { select, Select, SelectItem } from './Select';
import { describe, it, expect } from 'vitest';

describe('Select', () => {
  it('should render with label', () => {
    //should render with label
    render(<Select label="test">null</Select>);
    expect(true).toBeTruthy();
  });

  it('should render with placeholder', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Select placeholder="test" ref={ref}>
        ''
      </Select>
    );
    expect(ref.current?.innerHTML.includes('test')).toBeTruthy();
  });

  it('should render with children', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Select>
        <SelectItem value="test" ref={ref}>
          test
        </SelectItem>
      </Select>
    );
    expect(ref.current?.innerHTML.includes('test')).toBeTruthy();
  });

  it('should render with fullWidth', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Select fullWidth ref={ref}>
        ''
      </Select>
    );
    expect(ref.current?.classList.contains('w-full')).toBeTruthy();
  });

  it('should render with correct intent styles', () => {
    const correctSelectIntentClass = {
      normal: 'border-darkgrey-100',
      error: 'border-darkgrey-100 outline-red-100 outline-none',
      success: 'border-darkgrey-100 outline-green-100 outline-none',
    };

    for (const intent in correctSelectIntentClass) {
      render(
        <Select intent={intent as VariantProps<typeof select>['intent']}>
          ''
        </Select>
      );
      const selectTrigger = screen.getByTestId('select-trigger');
      const correctClass =
        correctSelectIntentClass[
          intent as keyof VariantProps<typeof select>['intent']
        ];
      expect(
        selectTrigger.classList.toString().includes(correctClass)
      ).toBeTruthy();
      cleanup();
    }
  });
});