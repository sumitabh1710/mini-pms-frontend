import React from "react";
import { Card, CardContent, Typography, LinearProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Project } from "../graphql/types";

interface Props {
  project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  const navigate = useNavigate();
  const completion = project.taskCount ? (project.completedTasksCount / project.taskCount) * 100 : 0;

  return (
    <Card
      onClick={() => navigate(`/project/${project.id}`)}
      sx={{ cursor: "pointer" }}
    >
      <CardContent>
        <Typography variant="h6">{project.name}</Typography>
        <Typography variant="body2">Status: {project.status}</Typography>
        <Box mt={1}>
          <LinearProgress variant="determinate" value={completion} />
          <Typography variant="caption">{completion.toFixed(0)}% completed</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
