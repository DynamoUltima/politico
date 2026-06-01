import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { clsx } from 'clsx';

export default function ManageProjects() {
  const { projects, addProject } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: 'Upcoming',
    sector: 'Infrastructure',
    location: '',
    budget: '',
    progress: 0,
    timeline: '',
    image: 'https://images.unsplash.com/photo-1640906152676-dace6710d24b?w=800&q=80'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject(newProject);
    setShowForm(false);
    // reset form
    setNewProject({
      title: '', description: '', status: 'Upcoming', sector: 'Infrastructure',
      location: '', budget: '', progress: 0, timeline: '',
      image: 'https://images.unsplash.com/photo-1640906152676-dace6710d24b?w=800&q=80'
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Projects</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <iconify-icon icon={showForm ? "solar:close-circle-linear" : "solar:add-circle-linear"} width="18"></iconify-icon>
          {showForm ? 'Cancel' : 'Add New Project'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">New Project Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Project Title *</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none" value={newProject.title} onChange={e=>setNewProject({...newProject, title: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Location *</label>
                <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none" value={newProject.location} onChange={e=>setNewProject({...newProject, location: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none" value={newProject.status} onChange={e=>setNewProject({...newProject, status: e.target.value})}>
                  <option>Upcoming</option>
                  <option>Ongoing</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Sector</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none" value={newProject.sector} onChange={e=>setNewProject({...newProject, sector: e.target.value})}>
                  <option>Infrastructure</option>
                  <option>Education</option>
                  <option>Health</option>
                  <option>Environment</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Budget</label>
                <input type="text" placeholder="e.g. $500K" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none" value={newProject.budget} onChange={e=>setNewProject({...newProject, budget: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Timeline</label>
                <input type="text" placeholder="e.g. Jan 2024 - Dec 2024" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none" value={newProject.timeline} onChange={e=>setNewProject({...newProject, timeline: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Progress % (0-100)</label>
                <input type="number" min="0" max="100" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none" value={newProject.progress} onChange={e=>setNewProject({...newProject, progress: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Image URL (Unsplash)</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none" value={newProject.image} onChange={e=>setNewProject({...newProject, image: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase">Description *</label>
              <textarea required rows="3" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none resize-none" value={newProject.description} onChange={e=>setNewProject({...newProject, description: e.target.value})}></textarea>
            </div>
            <div className="pt-2 flex justify-end">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                Save Project
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-semibold tracking-wider">Project Name</th>
              <th className="px-6 py-3 font-semibold tracking-wider">Status</th>
              <th className="px-6 py-3 font-semibold tracking-wider">Sector</th>
              <th className="px-6 py-3 font-semibold tracking-wider">Progress</th>
              <th className="px-6 py-3 font-semibold tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="bg-white border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="line-clamp-1">{project.title}</div>
                  <div className="text-xs text-gray-500 font-normal mt-0.5">{project.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={clsx(
                    "px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border",
                    project.status === 'Completed' ? "bg-green-50 text-green-700 border-green-200" :
                    project.status === 'Ongoing' ? "bg-blue-50 text-blue-700 border-blue-200" :
                    "bg-amber-50 text-amber-700 border-amber-200"
                  )}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{project.sector}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 w-24">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{project.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-gray-400 hover:text-blue-600 p-1"><iconify-icon icon="solar:pen-linear" width="18"></iconify-icon></button>
                    <button className="text-gray-400 hover:text-red-600 p-1"><iconify-icon icon="solar:trash-bin-trash-linear" width="18"></iconify-icon></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}