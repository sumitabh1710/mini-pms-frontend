import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Container,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ProjectCard from "../components/ProjectCards";
import ProjectForm from "../components/ProjectForm"; // new component
import OrganizationForm from "../components/OrganizationForm"; // new component
import { GET_PROJECTS, GET_ORGANIZATIONS } from "../graphql/queries";
import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  CREATE_ORGANIZATION,
} from "../graphql/mutations";
import { Project } from "../graphql/types";

const Dashboard: React.FC = () => {
  // State for dialogs
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const [openOrgForm, setOpenOrgForm] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [createProject] = useMutation(CREATE_PROJECT);
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [createOrganization] = useMutation(CREATE_ORGANIZATION);

  const { data, loading, error, refetch } = useQuery<{ projects: Project[] }>(
    GET_PROJECTS,
    {
      variables: selectedSlug ? { organizationSlug: selectedSlug } : {},
    }
  );

  const { data: orgData, refetch: refetchOrganizations } =
    useQuery(GET_ORGANIZATIONS);

  // --- Handlers ---
  const handleOpenProjectForm = (project?: Project) => {
    setEditingProject(project || null);
    setOpenProjectForm(true);
  };
  const handleCloseProjectForm = () => setOpenProjectForm(false);

  const handleOpenOrgForm = () => setOpenOrgForm(true);
  const handleCloseOrgForm = () => setOpenOrgForm(false);

  const handleSubmitProject = async (values: {
    name?: string;
    description?: string;
    status?: string;
    dueDate?: string; // ISO string or Date depending on your backend
    organizationId: number; // Only for createProject
  }) => {
    try {
      if (editingProject) {
        await updateProject({
          variables: {
            projectId: Number(editingProject.id),
            name: values.name,
            description: values.description,
            status: values.status,
            dueDate: values.dueDate,
          },
        });
      } else {
        await createProject({
          variables: {
            input: {
              name: values.name,
              description: values.description,
              organizationId: values.organizationId,
            },
          },
        });
      }

      await refetch();
      handleCloseProjectForm();
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };

  const handleSubmitOrganization = async (values: {
    name: string;
    contactEmail: string;
  }) => {
    try {
      await createOrganization({
        variables: { input: values },
      });
      await refetchOrganizations();
    } catch (err) {
      console.error("Error saving organization:", err);
    } finally {
      handleCloseOrgForm();
    }
  };

  if (loading) return <Typography>Loading projects...</Typography>;
  if (error) return <Typography>Error loading projects</Typography>;

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Projects
      </Typography>

      {/* Buttons */}
      <Box display="flex" gap={2} mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenProjectForm()}
        >
          Create Project
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleOpenOrgForm}
        >
          Create Organization
        </Button>
      </Box>

      <Box mb={2} width="300px">
        <FormControl fullWidth>
          <InputLabel>Filter by Organization</InputLabel>
          <Select
            value={selectedSlug || ""}
            onChange={(e) => setSelectedSlug(e.target.value || null)}
          >
            <MenuItem value="">All Organizations</MenuItem>
            {orgData?.organizations?.map((org: any) => (
              <MenuItem key={org.id} value={org.slug}>
                {org.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Project list */}
      <Box display="flex" flexWrap="wrap" gap={2}>
        {data?.projects?.map((project) => (
          <Box
            key={project.id}
            flexBasis={{ xs: "100%", sm: "48%", md: "30%" }}
          >
            <ProjectCard
              project={project}
              onEdit={() => handleOpenProjectForm(project)}
            />
          </Box>
        ))}
      </Box>

      {/* Project Form */}
      <ProjectForm
        open={openProjectForm}
        onClose={handleCloseProjectForm}
        onSubmit={handleSubmitProject}
        project={editingProject}
        organizations={orgData?.organizations || []}
      />

      {/* Organization Form */}
      <OrganizationForm
        open={openOrgForm}
        onClose={handleCloseOrgForm}
        onSubmit={handleSubmitOrganization}
      />
    </Container>
  );
};

export default Dashboard;
