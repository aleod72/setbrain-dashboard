'use client';
import * as PrimitiveTabs from '@radix-ui/react-tabs';

interface TabsProps {
    tabs: {
        label: string;
        content: React.ReactNode;
    }[];
    defaultTab?: string;
}

export const Tabs = ({ tabs, defaultTab }: TabsProps) => {
    return (
        <PrimitiveTabs.Root
            className="h-full flex flex-col gap-8"
            defaultValue={defaultTab}
        >
            <PrimitiveTabs.List>
                {tabs.map((tab, index) => (
                    <PrimitiveTabs.Trigger
                        key={index}
                        value={tab.label}
                        className={`py-2 px-4 rounded-md border border-lightgrey-100 text-white-48 data-[state=active]:text-white-100 data-[state=active]:bg-lightgrey-100 cursor-pointer mr-[-8px]`}
                    >
                        {tab.label}
                    </PrimitiveTabs.Trigger>
                ))}
            </PrimitiveTabs.List>
            {tabs.map((tab, index) => (
                <PrimitiveTabs.Content
                    key={index}
                    value={tab.label}
                    className="h-full"
                >
                    {tab.content}
                </PrimitiveTabs.Content>
            ))}
        </PrimitiveTabs.Root>
    );
};
