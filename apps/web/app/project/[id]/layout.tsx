import React from "react";
import { ProjectProvider } from "projects/providers/project-provider";

export default async function ProjectLayout({
    children,
    params
  }: {
    children: React.ReactNode,
    params: { id: string }
  }) {
    return <ProjectProvider id={params.id}>
        {children}
    </ProjectProvider>
  }