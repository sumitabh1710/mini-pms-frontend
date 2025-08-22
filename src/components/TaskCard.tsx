import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Task } from "../graphql/types";

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="caption">Assigned to: {task.assigneeEmail}</Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
