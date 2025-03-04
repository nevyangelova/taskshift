import {useCallback, useMemo, useEffect, useState} from 'react';
import {useQuery, NetworkStatus} from '@apollo/client';
import {GET_PROJECTS, GET_PROJECT_WITH_TASKS} from '@/lib/queries';
import {Project, Task, ViewType} from '@/types';
import {useLocalStorage} from '@/hooks/useLocalStorage';

/**
 * Custom Hook vs. Context Provider for State Management
 *
 * For this task management application, I've chosen a custom hook approach
 * rather than a Context Provider pattern.
 *
 * Approaches Considered:
 *
 * 1. Custom Hook Approach (implemented)
 *    - Encapsulates all data fetching, state management, and localStorage persistence
 *    - Provides memoized data and handlers
 *    - Component-level integration
 *
 * 2. Context Provider Approach (alternative)
 *    - Would provide global state access
 *    - Requires more boilerplate (Provider, reducers, etc.)
 *    - Causes wider re-render scope
 *
 * Rationale for Custom Hook:
 *
 * - Simplicity: The application manages just two preferences (viewType and selectedProjectId)
 * - Scope: The preferences are primarily used in the main page component
 * - Performance: Prevents unnecessary re-renders of unrelated components
 * - Maintenance: Easier to understand and maintain for a small/medium application
 * - Composition: Allows combining multiple hooks (useQuery, useLocalStorage) cleanly
 * - Testing: Simpler to test in isolation
 *
 * The implementation below demonstrates how this custom hook encapsulates
 * all the necessary logic while providing a clean API for components.
 */

export function useTaskManager() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [viewType, setViewType] = useLocalStorage<ViewType>(
        'viewType',
        'list'
    );
    const [selectedProjectId, setSelectedProjectId] = useLocalStorage<
        string | null
    >('selectedProjectId', null);

    // Fetch all projects with optimized caching
    const {data: projectsData, loading: projectsLoading} = useQuery(
        GET_PROJECTS,
        {
            fetchPolicy: 'cache-first',
            onError: error => {
                setErrorMessage(`Failed to load projects: ${error.message}}`);
            }
        }
    );

    const {
        data: taskData,
        loading: tasksLoading,
        networkStatus
    } = useQuery(GET_PROJECT_WITH_TASKS, {
        variables: {id: selectedProjectId},
        skip: !selectedProjectId,
        fetchPolicy: 'cache-and-network',
        notifyOnNetworkStatusChange: true, // This enables networkStatus value to avoid flickering
        onError: error => {
            setErrorMessage(`Failed to load tasks: ${error.message}`);
        }
    });

    useEffect(() => {
        if ((projectsData || taskData) && errorMessage) {
            setErrorMessage(null);
        }
    }, [projectsData, taskData, errorMessage]);

    // Memoize derived data with proper type annotations
    const projects = useMemo<Project[]>(
        () => projectsData?.projects || [],
        [projectsData]
    );

    const tasks = useMemo<Task[]>(
        () => taskData?.project?.tasks || [],
        [taskData]
    );

    const currentProject = useMemo<Project | undefined>(
        () => taskData?.project,
        [taskData]
    );

    useEffect(() => {
        if (!selectedProjectId && projects.length > 0) {
            setSelectedProjectId(projects[0].id);
        }
    }, [projects, selectedProjectId, setSelectedProjectId]);

    const handleProjectChange = useCallback(
        (projectId: string) => {
            setSelectedProjectId(projectId);
        },
        [setSelectedProjectId]
    );

    // Fix the type error by directly setting the value
    const toggleViewType = useCallback(() => {
        setViewType(viewType === 'list' ? 'grid' : 'list');
    }, [viewType, setViewType]);

    // Check if we're in a refetch state (changing variables) vs initial loading
    const isRefetching =
        networkStatus === NetworkStatus.refetch ||
        networkStatus === NetworkStatus.setVariables;

    return {
        viewType,
        selectedProjectId,
        projects,
        tasks,
        currentProject,
        projectsLoading,
        tasksLoading: tasksLoading && !isRefetching, // Only show loading on initial load, not refetch
        isRefetching, // Normally I would expose refetching state for UI indicators
        isLoading: projectsLoading || (tasksLoading && !isRefetching),
        errorMessage,
        handleProjectChange,
        toggleViewType
    };
}
