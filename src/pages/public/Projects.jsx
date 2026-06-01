import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { clsx } from 'clsx';

export default function Projects() {
  const { projects } = useAppContext();
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSector, setFilterSector] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const statuses = ['All', 'Ongoing', 'Completed', 'Upcoming'];
  const sectors = ['All', ...new Set(projects.map(p => p.sector))];

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchStatus = filterStatus === 'All' || p.status === filterStatus;
      const matchSector = filterSector === 'All' || p.sector === filterSector;
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSector && matchSearch;
    });
  }, [projects, filterStatus, filterSector, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Projects & Initiatives</h1>
          <p className="text-lg text-gray-600">
            Track the progress of infrastructure, education, and health initiatives across the district. We believe in complete transparency of public works.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 md:p-6 rounded-2xl border border-gray-200 shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</label>
              <select 
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sector</label>
              <select 
                className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                value={filterSector}
                onChange={(e) => setFilterSector(e.target.value)}
              >
                {sectors.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          
          <div className="w-full md:w-72 relative">
            <iconify-icon icon="solar:magnifer-linear" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="20"></iconify-icon>
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100 shrink-0">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <span className={clsx(
                      "px-3 py-1 text-xs font-bold rounded-full border shadow-sm backdrop-blur-md",
                      project.status === 'Completed' ? "bg-green-500/90 text-white border-green-600" : 
                      project.status === 'Ongoing' ? "bg-blue-600/90 text-white border-blue-700" : 
                      "bg-amber-500/90 text-white border-amber-600"
                    )}>
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center gap-1.5">
                      <iconify-icon icon="solar:map-point-linear"></iconify-icon>
                      {project.location}
                    </span>
                    <span className="text-sm font-semibold flex items-center gap-1">
                      View details <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-md">
                      <iconify-icon icon="solar:tag-horizontal-linear"></iconify-icon>
                      {project.sector}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight tracking-tight">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto pt-5 border-t border-gray-100 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Timeline</div>
                      <div className="text-sm text-gray-900 font-medium truncate">{project.timeline}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">Budget</div>
                      <div className="text-sm text-gray-900 font-medium">{project.budget || 'TBD'}</div>
                    </div>
                  </div>
                </div>
                
                {/* Progress bar at bottom edge */}
                <div className="w-full bg-gray-100 h-1.5">
                  <div 
                    className={clsx(
                      "h-full transition-all duration-1000",
                      project.status === 'Completed' ? "bg-green-500" : "bg-blue-600"
                    )}
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-200">
            <iconify-icon icon="solar:folder-error-linear" width="48" class="text-gray-300 mb-4"></iconify-icon>
            <h3 className="text-lg font-medium text-gray-900">No projects found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => {setFilterStatus('All'); setFilterSector('All'); setSearchQuery('');}}
              className="mt-6 text-blue-600 font-medium hover:text-blue-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}