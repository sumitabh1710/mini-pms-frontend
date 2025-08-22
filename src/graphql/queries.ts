import { gql } from '@apollo/client';

// Fetch all organizations with enhanced fields
export const GET_ORGANIZATIONS = gql`
  query GetOrganizations {
    organizations {
      id
      name
      slug
      contactEmail
      projectCount
      activeProjectsCount
      createdAt
      updatedAt
    }
  }
`;

// Fetch single organization
export const GET_ORGANIZATION = gql`
  query GetOrganization($slug: String!) {
    organization(slug: $slug) {
      id
      name
      slug
      contactEmail
      projectCount
      activeProjectsCount
      createdAt
    }
  }
`;

// Fetch projects by organization slug with enhanced filtering and fields
export const GET_PROJECTS = gql`
  query GetProjects(
    $organizationSlug: String
    $status: String
    $search: String
  ) {
    projects(
      organizationSlug: $organizationSlug
      status: $status
      search: $search
    ) {
      id
      name
      description
      status
      dueDate
      taskCount
      completedTasksCount
      completionPercentage
      isOverdue
      createdAt
      updatedAt
      organization {
        id
        name
        slug
      }
      taskStatistics {
        todoCount
        inProgressCount
        doneCount
        totalCount
        completionPercentage
      }
    }
  }
`;

// Fetch single project with full details
export const GET_PROJECT = gql`
  query GetProject($id: Int!) {
    project(id: $id) {
      id
      name
      description
      status
      dueDate
      taskCount
      completedTasksCount
      completionPercentage
      isOverdue
      createdAt
      updatedAt
      organization {
        id
        name
        slug
        contactEmail
      }
      taskStatistics {
        todoCount
        inProgressCount
        doneCount
        totalCount
        completionPercentage
      }
    }
  }
`;

// Fetch tasks by project ID with enhanced filtering
export const GET_TASKS = gql`
  query GetTasks(
    $projectId: Int!
    $status: String
    $assigneeEmail: String
  ) {
    tasks(
      projectId: $projectId
      status: $status
      assigneeEmail: $assigneeEmail
    ) {
      id
      title
      description
      status
      assigneeEmail
      dueDate
      commentCount
      isOverdue
      createdAt
      updatedAt
      project {
        id
        name
        organization {
          id
          name
          slug
        }
      }
    }
  }
`;

// Fetch single task with full details
export const GET_TASK = gql`
  query GetTask($id: Int!) {
    task(id: $id) {
      id
      title
      description
      status
      assigneeEmail
      dueDate
      commentCount
      isOverdue
      createdAt
      updatedAt
      project {
        id
        name
        status
        organization {
          id
          name
          slug
        }
      }
    }
  }
`;

// Fetch task comments by task ID
export const GET_TASK_COMMENTS = gql`
  query GetTaskComments($taskId: Int!) {
    taskComments(taskId: $taskId) {
      id
      content
      authorEmail
      timestamp
      updatedAt
      task {
        id
        title
      }
    }
  }
`;

// Fetch project statistics for dashboard
export const GET_PROJECT_STATISTICS = gql`
  query GetProjectStatistics($organizationSlug: String!) {
    projectStatistics(organizationSlug: $organizationSlug) {
      totalProjects
      activeProjects
      completedProjects
      onHoldProjects
      totalTasks
      completedTasks
      completionRate
    }
  }
`;

// Fetch status choices for dropdowns
export const GET_PROJECT_STATUS_CHOICES = gql`
  query GetProjectStatusChoices {
    projectStatusChoices {
      value
      display
    }
  }
`;

export const GET_TASK_STATUS_CHOICES = gql`
  query GetTaskStatusChoices {
    taskStatusChoices {
      value
      display
    }
  }
`;