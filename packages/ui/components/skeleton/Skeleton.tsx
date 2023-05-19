import * as ReactLoadingSkeleton from 'react-loading-skeleton';

interface SkeletonProps extends ReactLoadingSkeleton.SkeletonProps {}

export const Skeleton = (props: SkeletonProps) => {
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
