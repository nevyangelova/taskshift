import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
    }
  }
`;

export const GET_PROJECT_WITH_TASKS = gql`
  query GetProjectWithTasks($id: ID!) {
    project(id: $id) {
      id
      name
      tasks {
        id
        name
      }
    }
  }
`;