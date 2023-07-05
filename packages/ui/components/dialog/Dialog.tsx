'use client';

import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface DialogProps {
    children: React.ReactNode;
    trigger: React.ReactNode;
}

export const Dialog = ({ children, trigger }: DialogProps) => {
    return (
        <DialogPrimitive.Root>
            <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
            <DialogPrimitive.Portal>
                city-70 data-[state=open]:animate-over
                <DialogPrimitive.Overlay className="bg-black-100 z-10 opalayShow fixed inset-0 " />
                <DialogPrimitive.Content className="data-[state=open]:animate-contentShow fixed z-20 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    {children}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
};

export const DialogClose = DialogPrimitive.Close;
