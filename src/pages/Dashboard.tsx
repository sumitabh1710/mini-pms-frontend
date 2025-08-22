import React from "react";
import { useQuery } from "@apollo/client";
import { Container, Typography, Box } from "@mui/material";
import ProjectCard from "../components/ProjectCards";
import { GET_PROJECTS } from "../graphql/queries";
import { Project } from "../graphql/types";

const Dashboard: React.FC = () => {
  const { data, loading, error } = useQuery<{ projects: Project[] }>(GET_PROJECTS);

  if (loading) return <Typography>Loading projects...</Typography>;
  if (error) return <Typography>Error loading projects</Typography>;

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Projects
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {data?.projects?.map((project) => (
          <Box key={project.id} flexBasis={{ xs: "100%", sm: "48%", md: "30%" }}>
            <ProjectCard project={project} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Dashboard;
