import React, { useState, useEffect } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";

interface OrganizationFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string; contactEmail: string }) => void; 
  organization?: { name: string; contactEmail: string } | null;
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({
  open,
  onClose,
  onSubmit,
  organization,
}) => {
  const [values, setValues] = useState({ name: "", contactEmail: "" });
  const [errors, setErrors] = useState<{ name?: string; contactEmail?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (organization) {
      setValues({
        name: organization.name,
        contactEmail: organization.contactEmail,
      });
    } else {
      setValues({ name: "", contactEmail: "" });
    }
  }, [organization]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!values.name.trim()) newErrors.name = "Organization name is required";
    if (!values.contactEmail.trim()) newErrors.contactEmail = "Contact email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    const success = await onSubmit(values); // expects true/false from parent
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {organization ? "Edit Organization" : "Create Organization"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Organization Name"
          fullWidth
          margin="normal"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Contact Email"
          fullWidth
          margin="normal"
          value={values.contactEmail}
          onChange={(e) => setValues({ ...values, contactEmail: e.target.value })}
          error={!!errors.contactEmail}
          helperText={errors.contactEmail}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} /> : null}
        >
          {loading
            ? organization
              ? "Updating..."
              : "Creating..."
            : organization
            ? "Update"
            : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrganizationForm;
