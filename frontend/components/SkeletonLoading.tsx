import React from 'react';

interface SkeletonLoadingProps {
    type: 'list' | 'grid';
    count?: number;
}

export default function SkeletonLoading({
    type,
    count = 5
}: SkeletonLoadingProps) {
    const items = Array.from({length: count}, (_, i) => i);

    if (type === 'list') {
        return (
            <div className="animate-pulse">
                {items.map(i => (
                    <div
                        key={i}
                        className="border border-gray-200 rounded-md p-4 mb-2"
                    >
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
            {items.map(i => (
                <div
                    key={i}
                    className="border border-gray-200 rounded-md p-4 h-32 flex flex-col justify-center"
                >
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto"></div>
                </div>
            ))}
        </div>
    );
}
