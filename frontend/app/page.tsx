'use client';

import {useTaskManager} from '@/hooks/useTaskManager';
import ProjectSelector from '@/components/ProjectSelector';
import ViewToggle from '@/components/ViewToggle';
import ListView from '@/components/ListView';
import GridView from '@/components/GridView';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';

export default function Home() {
    const {
        viewType,
        selectedProjectId,
        projects,
        tasks,
        currentProject,
        projectsLoading,
        tasksLoading,
        errorMessage,
        handleProjectChange,
        toggleViewType
    } = useTaskManager();

    if (projectsLoading) return <LoadingState />;
    if (errorMessage) return <ErrorState message={errorMessage} />;

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
                        {currentProject?.name}: Tasks
                    </h2>

                    {tasksLoading ? (
                        <LoadingState />
                    ) : errorMessage ? (
                        <ErrorState message={errorMessage} />
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
