import * as ReactLoadingSkeleton from 'react-loading-skeleton';

export const Skeleton = (props: ReactLoadingSkeleton.SkeletonProps) => {
    return (
        <ReactLoadingSkeleton.default
            {...props}
            style={
                {
                    '--base-color': '#5b5b5b',
                    '--highlight-color': '#6a6a6a',
                } as React.CSSProperties
            }
        ></ReactLoadingSkeleton.default>
    );
};
