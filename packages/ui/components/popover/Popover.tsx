import * as PopoverPrimitive from '@radix-ui/react-popover';

interface PopoverProps extends PopoverPrimitive.PopperContentProps {
    children: React.ReactNode;
    trigger: React.ReactNode;
}

export const Popover = ({ children, trigger, ...props }: PopoverProps) => {
    return (
        <PopoverPrimitive.Root>
            <PopoverPrimitive.Trigger asChild>
                {trigger}
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                    className="rounded py-2 border-2 rounded-xl border-lightgrey-100 w-fit bg-darkgrey-100  will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                    sideOffset={5}
                    {...props}
                >
                    {children}
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
    );
};
