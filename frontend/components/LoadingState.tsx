import React from 'react';
import SkeletonLoading from './SkeletonLoading';

interface LoadingStateProps {
    type?: 'list' | 'grid';
    useSkeleton?: boolean;
}

export default function LoadingState({
    type = 'list',
    useSkeleton = false
}: LoadingStateProps) {
    return (
        <div aria-live="polite" aria-busy="true">
            <p className="sr-only">Loading content...</p>

            {useSkeleton ? (
                <SkeletonLoading type={type} count={5} />
            ) : (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}
        </div>
    );
}
