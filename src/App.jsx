import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import Projects from './pages/public/Projects';
import ProjectDetail from './pages/public/ProjectDetail';
import Feedback from './pages/public/Feedback';
import News from './pages/public/News';
import About from './pages/public/About';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="news" element={<News />} />
            <Route path="about" element={<About />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<ManageProjects />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}