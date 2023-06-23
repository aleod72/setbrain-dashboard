'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import React from 'react';

interface CheckBoxProps extends CheckboxPrimitive.CheckboxProps {}

export const Checkbox = (props: CheckBoxProps) => {
  const [checked, setChecked] = React.useState(false);

  return <CheckboxPrimitive.Root
    className={`flex h-[18px] w-[18px] appearance-none items-center justify-center rounded-[4px] outline-none ${checked ? 'bg-green-100' : 'bg-grey-24'}`}
    checked={checked}
    onCheckedChange={() => setChecked(!checked)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="text-white-100">
      <CheckIcon />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>;
};