import React from 'react';
import {Task} from '@/types';

interface GridViewProps {
    tasks: Task[];
}

export default function GridView({tasks}: GridViewProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tasks.map(task => (
                <div
                    key={task.id}
                    className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-150"
                >
                    <div className="px-4 pb-5 pt-3 sm:px-4 h-full flex flex-col">
                        <div className="flex-shrink-0 self-start">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                                Task {task.id}
                            </span>
                        </div>
                        <div className="my-4 flex-grow flex items-center justify-center">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white text-center">
                                {task.name}
                            </h3>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
