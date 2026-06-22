import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useAppContext } from '../context/AppContext';

export default function AdminLayout() {
  const { logout, user } = useAppContext();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'solar:widget-5-linear' },
    { name: 'Manage Projects', path: '/admin/projects', icon: 'solar:buildings-2-linear' },
    { name: 'Feedback Board', path: '/admin/feedback', icon: 'solar:chat-round-dots-linear' },
    { name: 'Manage News', path: '/admin/news', icon: 'solar:document-text-linear' },
    { name: 'MP Settings', path: '/admin/settings', icon: 'solar:user-id-linear' },
    { name: 'Activity Log', path: '/admin/activity-log', icon: 'solar:clipboard-list-linear' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const Sidebar = ({ onLinkClick }) => (
    <>
      <div className="p-6 flex items-center gap-3 border-b border-gray-800">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
          <iconify-icon icon="solar:shield-user-linear" width="20" height="20"></iconify-icon>
        </div>
        <span className="font-semibold tracking-tight text-lg">MP Admin</span>
      </div>

      <div className="grow py-6 px-3 space-y-1">
        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Management</p>
        {adminLinks.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={onLinkClick}
            className={({ isActive }) => clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}
          >
            <iconify-icon icon={link.icon} width="20" height="20"></iconify-icon>
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800 space-y-1">
        <Link to="/" onClick={onLinkClick} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-800">
          <iconify-icon icon="solar:arrow-left-linear" width="20" height="20"></iconify-icon>
          Return to Site
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-gray-800">
          <iconify-icon icon="solar:logout-2-linear" width="20" height="20"></iconify-icon>
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shrink-0 flex-col hidden md:flex">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileSidebarOpen(false)} />
          <aside className="relative w-64 h-full bg-gray-900 text-white flex flex-col shadow-xl">
            <Sidebar onLinkClick={() => setMobileSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Admin Content */}
      <main className="grow flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-8 justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-1.5 text-gray-500 hover:text-gray-900"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <iconify-icon icon="solar:hamburger-menu-linear" width="24" height="24"></iconify-icon>
            </button>
            <h1 className="font-semibold text-gray-800">Admin Portal</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-500 truncate max-w-[180px]">{user?.email}</span>
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden shrink-0">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="Admin" className="w-full h-full object-cover"/>
            </div>
          </div>
        </header>
        <div className="grow p-4 md:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}