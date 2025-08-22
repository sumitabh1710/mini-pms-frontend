import { gql } from '@apollo/client';

// Create new project with enhanced error handling
export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      success
      errors
      project {
        id
        name
        description
        status
        dueDate
        taskCount
        completionPercentage
        organization {
          id
          name
          slug
        }
      }
    }
  }
`;

// Create new organization (no update support)
export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($input: CreateOrganizationInput!) {
    createOrganization(input: $input) {
      success
      errors
      organization {
        id
        name
        slug
        contactEmail
        createdAt
      }
    }
  }
`;

// Create new task with enhanced error handling
export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      success
      errors
      task {
        id
        title
        description
        status
        assigneeEmail
        dueDate
        commentCount
        isOverdue
        project {
          id
          name
        }
      }
    }
  }
`;

// Add comment to task with enhanced error handling
export const CREATE_TASK_COMMENT = gql`
  mutation CreateTaskComment(
    $taskId: Int!
    $content: String!
    $authorEmail: String!
  ) {
    createTaskComment(
      taskId: $taskId
      content: $content
      authorEmail: $authorEmail
    ) {
      success
      errors
      comment {
        id
        content
        authorEmail
        timestamp
        updatedAt
      }
    }
  }
`;

// Update project
export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $projectId: Int!
    $name: String
    $description: String
    $status: String
    $dueDate: Date
  ) {
    updateProject(
      projectId: $projectId
      name: $name
      description: $description
      status: $status
      dueDate: $dueDate
    ) {
      success
      errors
      project {
        id
        name
        description
        status
        dueDate
        taskCount
        completionPercentage
        isOverdue
      }
    }
  }
`;

// Update task
export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $taskId: Int!
    $title: String
    $description: String
    $status: String
    $assigneeEmail: String
    $dueDate: DateTime
  ) {
    updateTask(
      taskId: $taskId
      title: $title
      description: $description
      status: $status
      assigneeEmail: $assigneeEmail
      dueDate: $dueDate
    ) {
      success
      errors
      task {
        id
        title
        description
        status
        assigneeEmail
        dueDate
        commentCount
        isOverdue
      }
    }
  }
`;

// Delete project
export const DELETE_PROJECT = gql`
  mutation DeleteProject($projectId: Int!) {
    deleteProject(projectId: $projectId) {
      success
      errors
    }
  }
`;

// Delete task
export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: Int!) {
    deleteTask(taskId: $taskId) {
      success
      errors
    }
  }
`;

// Delete task comment
export const DELETE_TASK_COMMENT = gql`
  mutation DeleteTaskComment($commentId: Int!) {
    deleteTaskComment(commentId: $commentId) {
      success
      errors
    }
  }
`;