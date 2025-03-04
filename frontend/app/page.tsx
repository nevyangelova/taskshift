'use client';

import {useState, useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {GET_PROJECTS, GET_PROJECT_WITH_TASKS} from '@/lib/queries';
import ProjectSelector from '@/components/ProjectSelector';
import ViewToggle from '@/components/ViewToggle';
import ListView from '@/components/ListView';
import GridView from '@/components/GridView';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import {saveToLocalStorage, getFromLocalStorage} from '@/utils/localStorage';

export default function Home() {
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
        null
    );
    const [viewType, setViewType] = useState<'list' | 'grid'>('list');

    useEffect(() => {
        const savedViewType = getFromLocalStorage<'list' | 'grid'>(
            'viewType',
            'list'
        );
        setViewType(savedViewType);

        const savedProjectId = getFromLocalStorage<string | null>(
            'selectedProjectId',
            null
        );
        if (savedProjectId) {
            setSelectedProjectId(savedProjectId);
        }
    }, []);

    useEffect(() => {
        saveToLocalStorage('viewType', viewType);
        if (selectedProjectId) {
            saveToLocalStorage('selectedProjectId', selectedProjectId);
        }
    }, [viewType, selectedProjectId]);

    const {
        loading: projectsLoading,
        error: projectsError,
        data: projectsData
    } = useQuery(GET_PROJECTS);

    const {
        loading: tasksLoading,
        error: tasksError,
        data: taskData
    } = useQuery(GET_PROJECT_WITH_TASKS, {
        variables: {id: selectedProjectId},
        skip: !selectedProjectId
    });

    useEffect(() => {
        if (!selectedProjectId && projectsData?.projects?.length > 0) {
            setSelectedProjectId(projectsData.projects[0].id);
        }
    }, [projectsData, selectedProjectId]);

    const handleProjectChange = (projectId: string) => {
        setSelectedProjectId(projectId);
    };

    const toggleViewType = () => {
        setViewType(viewType === 'list' ? 'grid' : 'list');
    };

    if (projectsLoading) return <LoadingState />;
    if (projectsError) return <ErrorState message={projectsError.message} />;

    const projects = projectsData?.projects || [];
    const tasks = taskData?.project?.tasks || [];

    return (
        <div className="mb-8">
            <div className="md:flex md:items-center md:justify-between">
                <ProjectSelector
                    projects={projects}
                    selectedProjectId={selectedProjectId}
                    onProjectChange={handleProjectChange}
                />
                <ViewToggle viewType={viewType} onToggle={toggleViewType} />
            </div>

            {selectedProjectId && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        {taskData?.project?.name}: Tasks
                    </h2>

                    {tasksLoading ? (
                        <LoadingState />
                    ) : tasksError ? (
                        <ErrorState message={tasksError.message} />
                    ) : (
                        <div className="mt-4">
                            {viewType === 'list' ? (
                                <ListView tasks={tasks} />
                            ) : (
                                <GridView tasks={tasks} />
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
