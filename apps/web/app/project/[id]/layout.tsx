import { Tabbar } from 'auth/components/tabbar';
import { MobileMenu } from 'auth/components/mobile-menu';
import { ProjectProvider } from 'projects/providers/project-provider';
import React from 'react';

export default async function ProjectLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    return (
        <ProjectProvider id={params.id}>
            <Tabbar />
            <MobileMenu />
            <section className="md:py-6 pb-40 md:px-7 w-full gap-3.5 flex flex-col h-screen overflow-x-hidden overflow-y-scroll">
                {children}
            </section>
        </ProjectProvider>
    );
}
