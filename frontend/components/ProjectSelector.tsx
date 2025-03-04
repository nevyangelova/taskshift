import React from 'react';
import {Project} from '@/types';

interface ProjectSelectorProps {
    projects: Project[];
    selectedProjectId: string | null;
    onProjectChange: (projectId: string) => void;
}

export default function ProjectSelector({
    projects,
    selectedProjectId,
    onProjectChange
}: ProjectSelectorProps) {
    return (
        <div className="mb-6">
            <label
                htmlFor="project-select"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
                Select Project
            </label>
            <select
                id="project-select"
                value={selectedProjectId || ''}
                onChange={e => onProjectChange(e.target.value)}
                className="block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
            >
                <option value="" disabled>
                    Select a project
                </option>
                {projects.map(project => (
                    <option key={project.id} value={project.id}>
                        {project.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
