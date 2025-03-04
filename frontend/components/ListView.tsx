import React from 'react';
import {Task} from '@/types';

interface ListViewProps {
    tasks: Task[];
}

export default function ListView({tasks}: ListViewProps) {
    if (!tasks.length) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">
                    No tasks found
                </p>
            </div>
        );
    }

    return (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.map(task => (
                <li
                    key={task.id}
                    className="py-4 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150 rounded-md"
                >
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                                <span className="text-indigo-600 dark:text-indigo-300 text-sm font-medium">
                                    {task.id}
                                </span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {task.name}
                            </p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
