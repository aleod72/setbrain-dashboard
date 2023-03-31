'use client'

import React from 'react';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './project-active.module.css';

interface ProjectActiveCapsuleProps {
    projectId: string;
}

interface ProjectActiveLinkTreeProps {
  projectId: string;
}

export const ProjectActiveCapsule = (props: ProjectActiveCapsuleProps) => {
  const [active, setActive] = React.useState(false);
  const pathName = usePathname();

  React.useEffect(() => {
    if (pathName.includes(props.projectId)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathName]);
  
  if (active) {
    return <span className="h-5 w-[3px] bg-white-100 rounded-full shadow-[0px_0px_8px_rgba(255,255,255,0.5)] absolute left-[-8px]"></span>
  } else {
    return null;
  }
    
};

export const ProjectActiveLinkTree = (props: ProjectActiveLinkTreeProps) => {
  const [active, setActive] = React.useState(false);
  const pathName = usePathname();
  const pageLinks =  [
    {name: 'Général', slug: 'home', icon: 'apps'},
    {name: 'Tâches', slug: 'tasks', icon: 'list-check'},
    {name: 'Administration', slug: 'admin', icon: 'edit'},
    {name: 'Statistiques', slug: 'stats', icon: 'stats'},
    {name: 'Fichiers', slug: 'files', icon: 'folder'},
  ];

  React.useEffect(() => {
    if (pathName.includes(props.projectId)) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  if (active) {
    return <div className="flex flex-col pl-[1.45rem]">
      {pageLinks.map((link) => 
      <Link href={`/project/${props.projectId}/${link.slug}`} key={link.slug}>
        <div className='flex items-end gap-2.5'>
          <span className="pb-2">
            <span className={`mt-[-19px]  ${pathName.includes(link.slug) ? styles.vector + ' ' + styles.active : styles.vector} ${pageLinks?.indexOf(link) === 0 ? 'mt-[-8px]': ''}`}></span>
          </span>
          <div className='flex items-center h-fit gap-2 hover:text-white-24'>
            <i className={`fi fi-sr-${link.icon} h-3.5 flex items-center`}></i>
            <span className={`h-fit font-bold font-body-b cursor-pointer font-display hover:text-white-24 ${pathName.includes(link.slug) ?'text-white-100 hover:text-white-72': 'text-white-48'}`} >{link.name}</span>
          </div>
        </div>
      </Link>
      )}
 
    </div>;
  }

  return null
}