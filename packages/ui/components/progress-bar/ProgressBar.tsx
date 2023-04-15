'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

export const progressBar = cva('w-full h-12 rounded-xl overflow-hidden border-lightgrey-100 border', {
    variants: {
        intent: {
            red: 'bg-red-24',
            yellow: 'bg-yellow-24',
            green: 'bg-green-24',
            blue: 'bg-blue-24'
        }
    },
    defaultVariants: {
        intent: 'green'
    }
});

export const progressBarIndicator = cva('w-full h-full rounded-lg grid place-items-center duration-500 bg-[url("/Grain.svg")]', {
    variants: {
        intent: {
            red: 'bg-red-100',
            yellow: 'bg-yellow-100',
            green: 'bg-green-100',
            blue: 'bg-blue-100'
        }
    },
    defaultVariants: {
        intent: 'green'
    }
});

export interface ProgressBarProps extends VariantProps<typeof progressBar>{
    progress: number;
    max: number;
}

export const ProgressBar = (props: ProgressBarProps) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(props.progress), 500);
        return () => clearTimeout(timer);
    }, [props.progress]);

    return <ProgressPrimitive.Root max={props.max} value={progress} className={progressBar(props)}>
        <ProgressPrimitive.Indicator className={progressBarIndicator(props)} style={{ width: `${progress}%` }}>
            <span className="text-body-lb text-darkgrey-86 font-bold animate-[opacity_0.5s_1s_ease-in-out_backwards]"> { progress >= 8 && (progress === 100 ? 'Fini !' : progress + '%')}</span>
        </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>;
    }