import React from "react";
import { ProjectProvider } from "projects/providers/project-provider";
import { Tabbar } from "auth";

export default async function ProjectLayout({
    children,
    params
  }: {
    children: React.ReactNode,
    params: { id: string }
  }) {
    return <ProjectProvider id={params.id}>
      <Tabbar />
      {children}
    </ProjectProvider>
  }