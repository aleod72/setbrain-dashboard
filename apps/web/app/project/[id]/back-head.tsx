'use client';

import { Button } from 'ui/components/button/Button';
import { useRouter } from 'next/navigation';

export const BackHead = () => {
    const router = useRouter();

    return (
        <div className="w-full">
            <Button
                iconButton="angle-left"
                buttonIcon={true}
                onClick={() => router.back()}
            ></Button>
        </div>
    );
};
