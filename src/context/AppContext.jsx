import React, { createContext, useState, useContext } from 'react';

// Mock Data
const initialProjects = [
  {
    id: 'p1',
    title: 'Greenville High School Science Wing Renovation',
    description: 'Complete overhaul of the existing science facilities to provide state-of-the-art laboratories for our students. Includes new equipment, safety measures, and modernized classrooms.',
    status: 'Ongoing',
    sector: 'Education',
    location: 'North District',
    budget: '$1.2M',
    progress: 65,
    timeline: 'Jan 2023 - Dec 2023',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    updates: [
      { date: 'Oct 15, 2023', text: 'Structural framework completed.' },
      { date: 'Aug 02, 2023', text: 'Demolition phase finished ahead of schedule.' }
    ]
  },
  {
    id: 'p2',
    title: 'Downtown Community Health Clinic',
    description: 'Establishment of a new, fully-equipped health clinic in the downtown area to serve low-income families and provide essential primary care services.',
    status: 'Completed',
    sector: 'Health',
    location: 'Central District',
    budget: '$850K',
    progress: 100,
    timeline: 'Mar 2022 - Feb 2023',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    updates: [
      { date: 'Feb 20, 2023', text: 'Grand opening ceremony held with community leaders.' }
    ]
  },
  {
    id: 'p3',
    title: 'Riverfront Park Revitalization',
    description: 'Cleaning and restoring the riverfront area, adding new pedestrian pathways, solar lighting, and a children\'s playground.',
    status: 'Upcoming',
    sector: 'Infrastructure',
    location: 'South District',
    budget: '$450K',
    progress: 0,
    timeline: 'Est. Start: Mar 2024',
    image: 'https://images.unsplash.com/photo-1590483863412-1d577e0344c2?w=800&q=80',
    updates: []
  },
  {
    id: 'p4',
    title: 'District-wide Solar Street Lighting',
    description: 'Installing over 500 solar-powered streetlights across underserved neighborhoods to improve safety and visibility at night.',
    status: 'Ongoing',
    sector: 'Infrastructure',
    location: 'Multiple Areas',
    budget: '$2.1M',
    progress: 40,
    timeline: 'Jun 2023 - Jun 2024',
    image: 'https://images.unsplash.com/photo-1542338106-444cb3df0fbd?w=800&q=80',
    updates: [
      { date: 'Nov 01, 2023', text: 'First 200 units installed in East Ward.' }
    ]
  }
];

const initialFeedback = [
  { id: 'f1', name: 'Sarah Jenkins', category: 'Suggestion', message: 'It would be great to have more frequent bus schedules on weekends in the North District.', date: '2023-10-24', upvotes: 42 },
  { id: 'f2', name: 'Anonymous', category: 'Complaint', message: 'The potholes on Elm Street are getting worse. Need immediate attention.', date: '2023-10-22', upvotes: 115 },
  { id: 'f3', name: 'Michael T.', category: 'Question', message: 'When will the new community center open for public events?', date: '2023-10-20', upvotes: 12 },
];

const initialNews = [
  { id: 'n1', title: 'Townhall Meeting: Planning for 2024', date: 'Oct 28, 2023', excerpt: 'Join us next week as we discuss the upcoming infrastructure budget and hear from constituents.' },
  { id: 'n2', title: 'New Grants Secured for Local Businesses', date: 'Oct 15, 2023', excerpt: 'Our office has successfully lobbied for an additional $500k in state grants to support small businesses.' },
];

const AppContext = createContext();

export function AppProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects);
  const [feedbacks, setFeedbacks] = useState(initialFeedback);
  const [news, setNews] = useState(initialNews);

  const addFeedback = (newFeedback) => {
    setFeedbacks([{ ...newFeedback, id: `f${Date.now()}`, date: new Date().toISOString().split('T')[0], upvotes: 0 }, ...feedbacks]);
  };

  const upvoteFeedback = (id) => {
    setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, upvotes: f.upvotes + 1 } : f));
  };

  const addProject = (project) => {
    setProjects([{ ...project, id: `p${Date.now()}`, updates: [], progress: parseInt(project.progress) || 0 }, ...projects]);
  };

  return (
    <AppContext.Provider value={{ 
      projects, setProjects, addProject,
      feedbacks, addFeedback, upvoteFeedback,
      news 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);