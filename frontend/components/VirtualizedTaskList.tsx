import React from 'react';
import {FixedSizeList} from 'react-window';
import {Task} from '@/types';

interface VirtualizedTaskListProps {
    tasks: Task[];
    height?: number;
    width?: string | number;
    itemSize?: number;
}

export default function VirtualizedTaskList({
    tasks,
    height = 400,
    width = '100%',
    itemSize = 60
}: VirtualizedTaskListProps) {
    const ListComponent = FixedSizeList as any;

    return (
        <ListComponent
            height={height}
            width={width}
            itemCount={tasks.length}
            itemSize={itemSize}
        >
            {({index, style}: {index: number; style: React.CSSProperties}) => {
                const task = tasks[index];
                return (
                    <div
                        style={style}
                        className="border border-gray-200 dark:border-gray-700 rounded-md p-4 mb-2 bg-white dark:bg-gray-800"
                    >
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {task.name}
                        </h3>
                    </div>
                );
            }}
        </ListComponent>
    );
}
