import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../graphql/types";

interface Props {
  task: Task;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TaskCard: React.FC<Props> = ({ task, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="caption">
          Assigned to: {task.assigneeEmail ?? "Unassigned"}
        </Typography>

        {/* Actions */}
        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
          {onEdit && (
            <IconButton onClick={onEdit} aria-label="edit">
              <EditIcon />
            </IconButton>
          )}
          {onDelete && (
            <IconButton onClick={onDelete} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
