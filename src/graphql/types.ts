// Base interfaces matching the enhanced backend

export interface Organization {
  id: number;
  name: string;
  slug: string;
  contactEmail: string;
  projectCount: number;
  activeProjectsCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStatistics {
  todoCount: number;
  inProgressCount: number;
  doneCount: number;
  totalCount: number;
  completionPercentage: number;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';
  dueDate?: string;
  taskCount: number;
  completedTasksCount: number;
  completionPercentage: number;
  isOverdue: boolean;
  createdAt: string;
  updatedAt: string;
  organization: Organization;
  taskStatistics: TaskStatistics;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  assigneeEmail: string;
  dueDate?: string;
  commentCount: number;
  isOverdue: boolean;
  createdAt: string;
  updatedAt: string;
  project: {
    id: number;
    name: string;
    status: string;
    organization: Organization;
  };
}

export interface TaskComment {
  id: number;
  content: string;
  authorEmail: string;
  timestamp: string;
  updatedAt: string;
  task: {
    id: number;
    title: string;
  };
}

export interface ProjectStatistics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  onHoldProjects: number;
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
}

export interface StatusChoice {
  value: string;
  display: string;
}

// Input types for mutations
export interface CreateProjectInput {
  organizationId: number;
  name: string;
  description?: string;
  status?: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD';
  dueDate?: string;
}

export interface CreateTaskInput {
  projectId: number;
  title: string;
  description?: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  assigneeEmail?: string;
  dueDate?: string;
}

// Response types for mutations
export interface MutationResponse<T = any> {
  success: boolean;
  errors: string[];
  [key: string]: T | boolean | string[];
}

export interface CreateProjectResponse {
  createProject: MutationResponse & {
    project: Project;
  };
}

export interface CreateTaskResponse {
  createTask: MutationResponse & {
    task: Task;
  };
}

export interface CreateTaskCommentResponse {
  createTaskComment: MutationResponse & {
    comment: TaskComment;
  };
}

export interface UpdateProjectResponse {
  updateProject: MutationResponse & {
    project: Project;
  };
}

export interface UpdateTaskResponse {
  updateTask: MutationResponse & {
    task: Task;
  };
}

export interface DeleteResponse {
  success: boolean;
  errors: string[];
}

// Query response types
export interface GetOrganizationsResponse {
  organizations: Organization[];
}

export interface GetProjectsResponse {
  projects: Project[];
}

export interface GetTasksResponse {
  tasks: Task[];
}

export interface GetTaskCommentsResponse {
  taskComments: TaskComment[];
}

export interface GetProjectStatisticsResponse {
  projectStatistics: ProjectStatistics;
}

export interface GetStatusChoicesResponse {
  projectStatusChoices?: StatusChoice[];
  taskStatusChoices?: StatusChoice[];
}