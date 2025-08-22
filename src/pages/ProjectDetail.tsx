import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Typography, Box, Button } from "@mui/material";
import { GET_TASKS } from "../graphql/queries";
import { CREATE_TASK, UPDATE_TASK, DELETE_TASK } from "../graphql/mutations";
import TaskCard from "../components/TaskCard";
import { Task } from "../graphql/types";
import TaskForm from "../components/TaskForm";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = id ? parseInt(id, 10) : null;

  const { data, loading, error, refetch } = useQuery<{ tasks: Task[] }>(
    GET_TASKS,
    {
      variables: { projectId: projectId! },
      skip: !projectId,
    }
  );

  const [createTask] = useMutation(CREATE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const [openForm, setOpenForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Open modal (for create or edit)
  const handleOpenForm = (task?: Task) => {
    setEditingTask(task || null);
    setOpenForm(true);
  };

  // Close modal (reset editing state)
  const handleCloseForm = () => {
    setEditingTask(null);
    setOpenForm(false);
  };

  // Create or update a task
  const handleSubmitTask = async (values: {
    title: string;
    description: string;
    status: string;
    assigneeEmail?: string;
    dueDate?: string;
  }) => {
    try {
      const normalizedValues = {
        ...values,
        // ensure dueDate is in ISO UTC format if provided
        dueDate: values.dueDate
          ? new Date(values.dueDate).toISOString()
          : undefined,
      };

      if (editingTask) {
        await updateTask({
          variables: {
            taskId: Number(editingTask.id),
            ...normalizedValues,
          },
        });
      } else {
        await createTask({
          variables: {
            input: {
              projectId: projectId!,
              ...normalizedValues,
            },
          },
        });
      }

      await refetch();
      handleCloseForm();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId: number | string) => {
    try {
      await deleteTask({ variables: { taskId: Number(taskId) } });
      await refetch();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  if (loading) return <Typography>Loading tasks...</Typography>;
  if (error) return <Typography>Error loading tasks</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Project Tasks
      </Typography>

      {/* Create Task Button */}
      <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenForm()}
        >
          Create Task
        </Button>
      </Box>

      {/* Task List */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {data?.tasks?.map((task) => (
          <Box key={task.id} flexBasis={{ xs: "100%", sm: "48%", md: "30%" }}>
            <TaskCard
              task={task}
              onEdit={() => handleOpenForm(task)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          </Box>
        ))}
      </Box>

      {/* Task Form Modal */}
      <TaskForm
        open={openForm}
        onClose={handleCloseForm}
        onSubmit={handleSubmitTask}
        task={editingTask}
      />
    </Container>
  );
};

export default ProjectDetail;
