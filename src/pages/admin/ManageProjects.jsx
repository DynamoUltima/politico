import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { clsx } from 'clsx';
import { formatDate } from '../../utils/formatDate';

export default function ManageProjects() {
  const { projects, addProject, updateProject, deleteProject } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [newUpdate, setNewUpdate] = useState({ date: '', text: '' });

  const initialProjectState = {
    title: '', description: '', status: 'Upcoming', sector: 'Infrastructure',
    location: '', budget: '', contractor: '', progress: 0, timeline: '',
    image: 'https://images.unsplash.com/photo-1640906152676-dace6710d24b?w=800&q=80'
  };

  const [newProject, setNewProject] = useState(initialProjectState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProject(editingId, newProject);
    } else {
      addProject(newProject);
    }
    setShowForm(false);
    setEditingId(null);
    setNewProject(initialProjectState);
  };

  const handleEdit = (project) => {
    setNewProject(project);
    setEditingId(project.id);
    setShowForm(true);
    setExpandedId(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setNewProject(initialProjectState);
  };

  const toggleUpdates = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
    setNewUpdate({ date: '', text: '' });
  };

  const handleAddUpdate = (project) => {
    if (!newUpdate.date || !newUpdate.text.trim()) return;
    const updates = [newUpdate, ...(project.updates || [])];
    updateProject(project.id, { updates });
    setNewUpdate({ date: '', text: '' });
  };

  const handleDeleteUpdate = (project, index) => {
    const updates = (project.updates || []).filter((_, i) => i !== index);
    updateProject(project.id, { updates });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Projects</h1>
        <button
          onClick={showForm ? handleCancel : () => setShowForm(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <iconify-icon icon={showForm ? "solar:close-circle-linear" : "solar:add-circle-linear"} width="18"></iconify-icon>
          {showForm ? 'Cancel' : 'Add New Project'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">{editingId ? 'Edit Project Details' : 'New Project Details'}</h2>
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
                <label className="text-xs font-semibold text-gray-500 uppercase">Contractor</label>
                <input type="text" placeholder="e.g. BuildRight Co." className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none" value={newProject.contractor} onChange={e=>setNewProject({...newProject, contractor: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Timeline</label>
                <input type="text" placeholder="e.g. Jan 2024 - Dec 2024" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none" value={newProject.timeline} onChange={e=>setNewProject({...newProject, timeline: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Progress % (0-100)</label>
                <input type="number" min="0" max="100" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none" value={newProject.progress} onChange={e=>setNewProject({...newProject, progress: e.target.value})} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
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
                {editingId ? 'Update Project' : 'Save Project'}
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
              <React.Fragment key={project.id}>
                <tr className="bg-white border-b border-gray-100 hover:bg-gray-50">
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
                      <button
                        onClick={() => toggleUpdates(project.id)}
                        title="Manage updates"
                        className={clsx("p-1 transition-colors", expandedId === project.id ? "text-blue-600" : "text-gray-400 hover:text-blue-600")}
                      >
                        <iconify-icon icon="solar:list-check-linear" width="18"></iconify-icon>
                      </button>
                      <button onClick={() => handleEdit(project)} className="text-gray-400 hover:text-blue-600 p-1"><iconify-icon icon="solar:pen-linear" width="18"></iconify-icon></button>
                      <button onClick={() => { if(window.confirm('Are you sure you want to delete this project?')) deleteProject(project.id); }} className="text-gray-400 hover:text-red-600 p-1"><iconify-icon icon="solar:trash-bin-trash-linear" width="18"></iconify-icon></button>
                    </div>
                  </td>
                </tr>

                {expandedId === project.id && (
                  <tr className="bg-blue-50/40">
                    <td colSpan={5} className="px-6 py-4">
                      <div className="space-y-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Updates</p>

                        {/* Add update form */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="date"
                            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none w-48 shrink-0"
                            value={newUpdate.date}
                            onChange={(e) => setNewUpdate({ ...newUpdate, date: e.target.value })}
                          />
                          <input
                            type="text"
                            placeholder="Update description..."
                            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none flex-1"
                            value={newUpdate.text}
                            onChange={(e) => setNewUpdate({ ...newUpdate, text: e.target.value })}
                          />
                          <button
                            onClick={() => handleAddUpdate(project)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shrink-0"
                          >
                            Add
                          </button>
                        </div>

                        {/* Existing updates */}
                        {(project.updates || []).length === 0 ? (
                          <p className="text-sm text-gray-400 py-1">No updates yet.</p>
                        ) : (
                          <ul className="space-y-1.5">
                            {(project.updates || []).map((u, i) => (
                              <li key={i} className="flex items-start justify-between gap-4 bg-white rounded-lg border border-gray-200 px-3 py-2 text-sm">
                                <span className="text-gray-500 font-medium shrink-0">{formatDate(u.date)}</span>
                                <span className="text-gray-700 flex-1">{u.text}</span>
                                <button
                                  onClick={() => handleDeleteUpdate(project, i)}
                                  className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
                                >
                                  <iconify-icon icon="solar:trash-bin-trash-linear" width="16"></iconify-icon>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
