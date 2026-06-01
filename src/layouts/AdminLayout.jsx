import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { clsx } from 'clsx';

export default function AdminLayout() {
  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'solar:widget-5-linear' },
    { name: 'Manage Projects', path: '/admin/projects', icon: 'solar:buildings-2-linear' },
    { name: 'Feedback Board', path: '/admin/dashboard', icon: 'solar:chat-round-dots-linear' }, // Mocking to dashboard for demo
    { name: 'Announcements', path: '/admin/dashboard', icon: 'solar:document-text-linear' }, // Mocking to dashboard for demo
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-gray-800">
           <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
              <iconify-icon icon="solar:shield-user-linear" width="20" height="20"></iconify-icon>
            </div>
            <span className="font-semibold tracking-tight text-lg">MP Admin</span>
        </div>
        
        <div className="flex-grow py-6 px-3 space-y-1">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Management</p>
          {adminLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
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

        <div className="p-4 border-t border-gray-800">
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-gray-800">
            <iconify-icon icon="solar:logout-2-linear" width="20" height="20"></iconify-icon>
            Return to Site
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-grow flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 justify-between shrink-0 shadow-sm">
          <h1 className="font-semibold text-gray-800">Admin Portal</h1>
          <div className="flex items-center gap-4">
             <button className="text-gray-500 hover:text-gray-900">
               <iconify-icon icon="solar:bell-bing-linear" width="22" height="22"></iconify-icon>
             </button>
             <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="Admin" className="w-full h-full object-cover"/>
             </div>
          </div>
        </header>
        <div className="flex-grow p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}