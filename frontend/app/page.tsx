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
        <main className="mb-8" role="main">
            <h1
                tabIndex={-1}
                className="sr-only focus:not-sr-only focus:outline-none focus:p-2"
            >
                Task Manager
            </h1>

            <div
                className="md:flex md:items-center md:justify-between"
                role="toolbar"
                aria-label="Task view controls"
            >
                <ProjectSelector
                    projects={projects}
                    selectedProjectId={selectedProjectId}
                    onProjectChange={handleProjectChange}
                />
                <ViewToggle viewType={viewType} onToggle={toggleViewType} />
            </div>

            {selectedProjectId && (
                <div className="mt-8">
                    <h2
                        className="text-xl font-semibold text-gray-900 dark:text-white mb-4"
                        id="tasks-heading"
                    >
                        {currentProject?.name}: Tasks
                    </h2>

                    {tasksLoading ? (
                        <LoadingState useSkeleton={true} type={viewType} />
                    ) : errorMessage ? (
                        <ErrorState message={errorMessage} />
                    ) : (
                        <div
                            className="mt-4"
                            role="region"
                            aria-labelledby="tasks-heading"
                        >
                            {viewType === 'list' ? (
                                <ListView tasks={tasks} />
                            ) : (
                                <GridView tasks={tasks} />
                            )}
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
