import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Container, Typography, Box } from "@mui/material";
import { GET_TASKS } from "../graphql/queries";
import TaskCard from "../components/TaskCard";
import { Task } from "../graphql/types";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery<{ tasks: Task[] }>(GET_TASKS, {
    variables: { projectId: parseInt(id!, 10) },
    skip: !id,
  });

  if (loading) return <Typography>Loading tasks...</Typography>;
  if (error) return <Typography>Error loading tasks</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Project Tasks
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {data?.tasks?.map((task) => (
          <Box key={task.id} flexBasis={{ xs: "100%", sm: "48%", md: "30%" }}>
            <TaskCard task={task} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default ProjectDetail;
