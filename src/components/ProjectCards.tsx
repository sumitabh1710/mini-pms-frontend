import React from "react";
import { Card, CardContent, Typography, LinearProgress, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Project } from "../graphql/types";

interface Props {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
}

const ProjectCard: React.FC<Props> = ({ project, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const completion = project.taskCount ? (project.completedTasksCount / project.taskCount) * 100 : 0;

  return (
    <Card sx={{ cursor: "pointer", position: "relative" }}>
      <CardContent onClick={() => navigate(`/project/${project.id}`)}>
        <Typography variant="h6">{project.name}</Typography>
        <Typography variant="body2">Status: {project.status}</Typography>
        <Typography variant="body2">Organization: {project.organization.name}</Typography>
        <Typography variant="body2">Task Count: {project.taskCount}</Typography>
        <Typography variant="body2">Completed Tasks: {project.completedTasksCount}</Typography>
        <Box mt={1}>
          <LinearProgress variant="determinate" value={completion} />
          <Typography variant="caption">{completion.toFixed(0)}% completed</Typography>
        </Box>
      </CardContent>

      {/* Action buttons */}
      <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 1 }}>
        {onEdit && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation(); // prevent navigation
              onEdit(project);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
        {onDelete && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Card>
  );
};

export default ProjectCard;
