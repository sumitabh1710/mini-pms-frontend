import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { Task } from "../graphql/types";

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: {
    title: string;
    description: string;
    status: string;
    assigneeEmail?: string;
    dueDate?: string;
  }) => void;
  task?: Task | null;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, onSubmit, task }) => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    status: "TODO",
    assigneeEmail: "",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setValues({
        title: task.title,
        description: task.description || "",
        status: task.status,
        assigneeEmail: task.assigneeEmail || "",
        dueDate: task.dueDate || "",
      });
    } else {
      setValues({ title: "", description: "", status: "TODO", assigneeEmail: "", dueDate: "" });
    }
  }, [task]);

  const handleSubmit = () => {
    onSubmit(values);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{task ? "Edit Task" : "Create Task"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={values.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={values.description}
          onChange={(e) => setValues({ ...values, description: e.target.value })}
        />
        <TextField
          select
          label="Status"
          fullWidth
          margin="normal"
          value={values.status}
          onChange={(e) => setValues({ ...values, status: e.target.value })}
        >
          <MenuItem value="TODO">To Do</MenuItem>
          <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
          <MenuItem value="DONE">Done</MenuItem>
        </TextField>
        <TextField
          label="Assignee Email"
          fullWidth
          margin="normal"
          value={values.assigneeEmail}
          onChange={(e) => setValues({ ...values, assigneeEmail: e.target.value })}
        />
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={values.dueDate}
          onChange={(e) => setValues({ ...values, dueDate: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {task ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskForm;
