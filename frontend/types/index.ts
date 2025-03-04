/**
 * Project model interface
 */
export interface Project {
    id: string;
    name: string;
    tasks?: Task[];
}

/**
 * Task model interface
 */
export interface Task {
    id: string;
    name: string;
    project_id: string;
}
