'use client';

import React, { useEffect } from 'react';
import { Project } from 'types/database';
import { getProjectById } from 'utils/projects';

export const projectContext = React.createContext<Project | undefined>(
    undefined
);

function isProject(arg: any): arg is Project {
    return arg !== undefined;
}

export function ProjectProvider({
    children,
    id,
}: {
    children: React.ReactNode;
    id: string;
}) {
    const [project, setProject] = React.useState<Project | null>(null);

    useEffect(() => {
        getProjectById(id)
            .then(async (res) => {
                setProject(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    if (isProject(project)) {
        return (
            <projectContext.Provider value={project}>
                {children}
            </projectContext.Provider>
        );
    } else {
        return <>{children}</>;
    }
}
