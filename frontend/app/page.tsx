'use client';

import {useState, useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {GET_PROJECTS, GET_PROJECT_WITH_TASKS} from '@/lib/queries';

export default function Home() {
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
        null
    );

    const {
        loading: projectsLoading,
        error: projectsError,
        data: projectsData,
    } = useQuery(GET_PROJECTS);

    const {
        loading: tasksLoading,
        error: tasksError,
        data: taskData,
    } = useQuery(GET_PROJECT_WITH_TASKS, {
        variables: {id: selectedProjectId},
        skip: !selectedProjectId,
    });

    useEffect(() => {
        if (!selectedProjectId && projectsData?.projects?.length > 0) {
            setSelectedProjectId(projectsData.projects[0].id);
        }
    }, [projectsData, selectedProjectId]);

    if (projectsLoading) return <p>Loading projects...</p>;
    if (projectsError)
        return <p>Error loading projects: {projectsError.message}</p>;

    const projects = projectsData?.projects || [];
    const tasks = taskData?.project?.tasks || [];

    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold mb-4'>Task Manager</h1>

            <div className='mb-4'>
                <label htmlFor='project-select' className='block mb-2'>
                    Select Project:
                </label>
                <select
                    id='project-select'
                    value={selectedProjectId || ''}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    className='border p-2 rounded w-full md:w-auto'
                >
                    <option value='' disabled>
                        Select a project
                    </option>
                    {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedProjectId && (
                <div className='mt-6'>
                    <h2 className='text-xl font-semibold mb-4'>
                        {taskData?.project?.name}: Tasks
                    </h2>

                    {tasksLoading ? (
                        <p>Loading tasks...</p>
                    ) : tasksError ? (
                        <p>Error loading tasks: {tasksError.message}</p>
                    ) : (
                        <div>
                            <ul className='space-y-2'>
                                {tasks.map((task) => (
                                    <li
                                        key={task.id}
                                        className='border p-3 rounded'
                                    >
                                        {task.name}
                                    </li>
                                ))}
                            </ul>

                            {tasks.length === 0 && <p>No tasks found</p>}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
