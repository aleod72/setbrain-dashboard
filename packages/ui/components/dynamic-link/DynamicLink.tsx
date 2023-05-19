'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

interface DynamicLinkProps {
    href: string;
    children: React.ReactNode;
    activeClass?: string;
}

export const DynamicLink = function ({
    href,
    children,
    activeClass = 'lik-active',
}: DynamicLinkProps) {
    const pathname = usePathname();
    const [active, setActive] = React.useState(false);
    const projectContextLink = pathname.slice(0, pathname.lastIndexOf('/'));

    useEffect(() => {
        setActive(pathname.includes(href));
    }, [pathname, href]);

    return (
        <Link
            href={projectContextLink + href}
            className={active ? activeClass : ''}
        >
            {children}
        </Link>
    );
};
