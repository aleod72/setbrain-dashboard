import { Tabbar } from 'auth';
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
            {children}
        </ProjectProvider>
    );
}
