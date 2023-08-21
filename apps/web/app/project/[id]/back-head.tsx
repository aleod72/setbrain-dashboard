'use client';

import { Button } from 'ui/components/button/Button';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

export const BackHead = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className="w-full flex justify-between">
            <Button
                iconButton="angle-left"
                buttonIcon={true}
                onClick={() => router.back()}
            ></Button>
            {pathname.includes('tasks/') && !pathname.includes('edit') && (
                <Link
                    href={pathname.split('/')[4] + '/edit'}
                    className="md:hidden"
                >
                    <Button iconLeft="pencil">Modifier</Button>
                </Link>
            )}
        </div>
    );
};
