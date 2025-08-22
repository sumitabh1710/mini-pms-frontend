import React, { useState, useEffect } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Organization, Project } from "../graphql/types";

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string; description: string; organizationId: number }) => void;
  project?: Project | null;
  organizations?: Organization[];
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  open,
  onClose,
  onSubmit,
  project,
  organizations,
}) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    organizationId: 0,
  });

  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    organizationId?: string;
  }>({});

  useEffect(() => {
    if (project) {
      setValues({
        name: project.name,
        description: project.description || "",
        organizationId: project.organization?.id
          ? Number(project.organization.id)
          : 0,
      });
    } else {
      setValues({ name: "", description: "", organizationId: 0 });
    }
  }, [project]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!values.name.trim()) newErrors.name = "Project name is required";
    if (!values.description.trim())
      newErrors.description = "Description is required";
    if (!values.organizationId)
      newErrors.organizationId = "Organization is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(values);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{project ? "Edit Project" : "Create Project"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Project Name"
          fullWidth
          margin="normal"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={values.description}
          onChange={(e) =>
            setValues({ ...values, description: e.target.value })
          }
          error={!!errors.description}
          helperText={errors.description}
        />
        <FormControl fullWidth margin="normal" error={!!errors.organizationId}>
          <InputLabel>Organization</InputLabel>
          <Select
            value={values.organizationId || ""}
            onChange={(e) =>
              setValues({
                ...values,
                organizationId: Number(e.target.value),
              })
            }
          >
            {organizations?.map((org) => (
              <MenuItem key={org.id} value={Number(org.id)}>
                {org.name}
              </MenuItem>
            ))}
          </Select>
          {errors.organizationId && (
            <p style={{ color: "red", fontSize: "0.8rem" }}>
              {errors.organizationId}
            </p>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {project ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectForm;
