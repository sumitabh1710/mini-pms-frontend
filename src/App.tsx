import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import { Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <Box sx={{
      width: "100vw",
      height: "100vh",
      overflow: "auto",
      paddingY: "20px"
    }}>
      <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
    </Box>
  );
};

export default App;
