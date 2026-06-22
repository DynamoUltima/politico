import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import { db, auth } from '../firebase';
import {
  collection, onSnapshot, addDoc, updateDoc, doc, setDoc,
  query, orderBy, limit, writeBatch, increment, deleteDoc, arrayUnion, arrayRemove,
  serverTimestamp,
} from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

const initialProjects = [
  {
    id: 'p1',
    title: 'Greenville High School Science Wing Renovation',
    description: 'Complete overhaul of the existing science facilities to provide state-of-the-art laboratories for our students. Includes new equipment, safety measures, and modernized classrooms.',
    status: 'Ongoing',
    sector: 'Education',
    location: 'North District',
    budget: '$1.2M',
    contractor: 'BuildRight Co.',
    progress: 65,
    timeline: 'Jan 2023 - Dec 2023',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    updates: [
      { date: 'Oct 15, 2023', text: 'Structural framework completed.' },
      { date: 'Aug 02, 2023', text: 'Demolition phase finished ahead of schedule.' },
    ],
  },
  {
    id: 'p2',
    title: 'Downtown Community Health Clinic',
    description: 'Establishment of a new, fully-equipped health clinic in the downtown area to serve low-income families and provide essential primary care services.',
    status: 'Completed',
    sector: 'Health',
    location: 'Central District',
    budget: '$850K',
    contractor: 'CityWorks Inc.',
    progress: 100,
    timeline: 'Mar 2022 - Feb 2023',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    updates: [
      { date: 'Feb 20, 2023', text: 'Grand opening ceremony held with community leaders.' },
    ],
  },
  {
    id: 'p3',
    title: 'Riverfront Park Revitalization',
    description: "Cleaning and restoring the riverfront area, adding new pedestrian pathways, solar lighting, and a children's playground.",
    status: 'Upcoming',
    sector: 'Infrastructure',
    location: 'South District',
    budget: '$450K',
    contractor: 'TBD',
    progress: 0,
    timeline: 'Est. Start: Mar 2024',
    image: 'https://images.unsplash.com/photo-1590483863412-1d577e0344c2?w=800&q=80',
    updates: [],
  },
  {
    id: 'p4',
    title: 'District-wide Solar Street Lighting',
    description: 'Installing over 500 solar-powered streetlights across underserved neighborhoods to improve safety and visibility at night.',
    status: 'Ongoing',
    sector: 'Infrastructure',
    location: 'Multiple Areas',
    budget: '$2.1M',
    contractor: 'SolarGrid Solutions',
    progress: 40,
    timeline: 'Jun 2023 - Jun 2024',
    image: 'https://images.unsplash.com/photo-1542338106-444cb3df0fbd?w=800&q=80',
    updates: [
      { date: 'Nov 01, 2023', text: 'First 200 units installed in East Ward.' },
    ],
  },
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

async function seedCollection(colName, items) {
  const batch = writeBatch(db);
  items.forEach(({ id, ...data }) => {
    batch.set(doc(db, colName, id), data);
  });
  await batch.commit();
}

export function AppProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [news, setNews] = useState([]);
  const [mpPhotoURL, setMpPhotoURL] = useState(null);
  const [aboutContent, setAboutContent] = useState(null);
  const [heroBannerImages, setHeroBannerImages] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const loadedCount = useRef(0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  const markLoaded = () => {
    loadedCount.current += 1;
    if (loadedCount.current >= 3) setLoading(false);
  };

  useEffect(() => {
    const unsubProjects = onSnapshot(collection(db, 'projects'), async (snap) => {
      if (snap.empty) {
        await seedCollection('projects', initialProjects);
        return;
      }
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      markLoaded();
    });

    const unsubFeedbacks = onSnapshot(
      query(collection(db, 'feedbacks'), orderBy('date', 'desc')),
      async (snap) => {
        if (snap.empty) {
          await seedCollection('feedbacks', initialFeedback);
          return;
        }
        setFeedbacks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        markLoaded();
      }
    );

    const unsubNews = onSnapshot(collection(db, 'news'), async (snap) => {
      if (snap.empty) {
        await seedCollection('news', initialNews);
        return;
      }
      setNews(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      markLoaded();
    });

    const unsubSettings = onSnapshot(doc(db, 'settings', 'mp_profile'), (snap) => {
      if (snap.exists()) setMpPhotoURL(snap.data().photoURL || null);
    });

    const unsubAbout = onSnapshot(doc(db, 'settings', 'about_page'), (snap) => {
      if (snap.exists()) setAboutContent(snap.data());
    });

    const unsubHeroBanner = onSnapshot(doc(db, 'settings', 'hero_banner'), (snap) => {
      setHeroBannerImages(snap.exists() ? (snap.data().images || []) : []);
    });

    const unsubActivityLogs = onSnapshot(
      query(collection(db, 'activityLogs'), orderBy('timestamp', 'desc'), limit(200)),
      (snap) => setActivityLogs(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );

    return () => {
      unsubProjects();
      unsubFeedbacks();
      unsubNews();
      unsubSettings();
      unsubAbout();
      unsubHeroBanner();
      unsubActivityLogs();
    };
  }, []);

  const logActivity = (action, message, actingUser) => {
    const u = actingUser || user;
    return addDoc(collection(db, 'activityLogs'), {
      uid: u?.uid || null,
      email: u?.email || 'Unknown',
      action,
      message,
      timestamp: serverTimestamp(),
    });
  };

  const updateMpProfile = (photoURL) =>
    setDoc(doc(db, 'settings', 'mp_profile'), { photoURL }, { merge: true })
      .then(() => logActivity('settings', 'Updated MP profile photo'));

  const updateAboutContent = (data) =>
    setDoc(doc(db, 'settings', 'about_page'), data, { merge: true })
      .then(() => logActivity('settings', 'Updated About page content'));

  const addHeroBannerImage = (image) =>
    setDoc(doc(db, 'settings', 'hero_banner'), { images: arrayUnion(image) }, { merge: true })
      .then(() => logActivity('settings', 'Added a homepage hero banner image'));

  const removeHeroBannerImage = (image) =>
    updateDoc(doc(db, 'settings', 'hero_banner'), { images: arrayRemove(image) })
      .then(() => logActivity('settings', 'Removed a homepage hero banner image'));

  const addNewsItem = (item) =>
    addDoc(collection(db, 'news'), item)
      .then(() => logActivity('news', `Published news article "${item.title}"`));

  const updateNewsItem = (id, data) => {
    const title = news.find(n => n.id === id)?.title || id;
    return updateDoc(doc(db, 'news', id), data)
      .then(() => logActivity('news', `Updated news article "${title}"`));
  };

  const deleteNewsItem = (id) => {
    const title = news.find(n => n.id === id)?.title || id;
    return deleteDoc(doc(db, 'news', id))
      .then(() => logActivity('news', `Deleted news article "${title}"`));
  };

  const addFeedback = (newFeedback) =>
    addDoc(collection(db, 'feedbacks'), {
      ...newFeedback,
      date: new Date().toISOString().split('T')[0],
      upvotes: 0,
    });

  const upvoteFeedback = (id) =>
    updateDoc(doc(db, 'feedbacks', id), { upvotes: increment(1) });

  const addProject = (project) =>
    addDoc(collection(db, 'projects'), {
      ...project,
      progress: parseInt(project.progress) || 0,
      updates: [],
    }).then(() => logActivity('project', `Created project "${project.title}"`));

  const updateProject = (id, updatedData) => {
    const title = projects.find(p => p.id === id)?.title || id;
    return updateDoc(doc(db, 'projects', id), updatedData)
      .then(() => logActivity('project', `Updated project "${title}"`));
  };

  const deleteProject = (id) => {
    const title = projects.find(p => p.id === id)?.title || id;
    return deleteDoc(doc(db, 'projects', id))
      .then(() => logActivity('project', `Deleted project "${title}"`));
  };

  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await logActivity('login', 'Signed in to the admin portal', cred.user);
    return cred;
  };

  const logout = async () => {
    await logActivity('logout', 'Signed out of the admin portal');
    return signOut(auth);
  };

  return (
    <AppContext.Provider value={{
      projects, addProject, updateProject, deleteProject,
      feedbacks, addFeedback, upvoteFeedback,
      news, addNewsItem, updateNewsItem, deleteNewsItem,
      mpPhotoURL, updateMpProfile,
      aboutContent, updateAboutContent,
      heroBannerImages, addHeroBannerImage, removeHeroBannerImage,
      activityLogs,
      loading,
      user, authLoading, login, logout,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
