import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { clsx } from 'clsx';

export default function ProjectDetail() {
  const { id } = useParams();
  const { projects } = useAppContext();
  const [comment, setComment] = useState('');
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project not found</h2>
        <p className="text-gray-500 mb-6">The project you are looking for does not exist or has been removed.</p>
        <Link to="/projects" className="bg-gray-900 text-white px-6 py-2 rounded-full font-medium">Return to Projects</Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <div className="relative h-[40vh] md:h-[50vh] min-h-[400px] w-full">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-16">
            <Link to="/projects" className="inline-flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium mb-6 transition-colors">
              <iconify-icon icon="solar:arrow-left-linear"></iconify-icon>
              Back to all projects
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={clsx(
                "px-3 py-1 text-xs font-bold rounded-full border",
                project.status === 'Completed' ? "bg-green-500/20 text-green-300 border-green-500/30" : 
                project.status === 'Ongoing' ? "bg-blue-500/20 text-blue-300 border-blue-500/30" : 
                "bg-amber-500/20 text-amber-300 border-amber-500/30"
              )}>
                {project.status}
              </span>
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/10 text-white border border-white/20">
                {project.sector}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4 max-w-3xl">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <iconify-icon icon="solar:map-point-linear" width="18"></iconify-icon>
                {project.location}
              </div>
              <div className="flex items-center gap-2">
                <iconify-icon icon="solar:calendar-linear" width="18"></iconify-icon>
                {project.timeline}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">Project Overview</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </section>

            {/* Progress */}
            <section className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-6">Current Status</h3>
              
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Completion</span>
                <span className="text-2xl font-bold text-blue-600">{project.progress}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-8 overflow-hidden">
                <div 
                  className={clsx(
                    "h-full rounded-full transition-all duration-1000",
                    project.status === 'Completed' ? "bg-green-500" : "bg-blue-600"
                  )}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-6">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Total Budget</div>
                  <div className="text-lg font-bold text-gray-900">{project.budget || 'Undisclosed'}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Contractor</div>
                  <div className="text-lg font-bold text-gray-900">CityWorks Inc.</div>
                </div>
              </div>
            </section>

            {/* Visuals (Mock Before/After) */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-6">Visuals</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-48 bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
                    <img src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=600&q=80" alt="Before" className="w-full h-full object-cover grayscale opacity-70" />
                  </div>
                  <div className="text-sm font-medium text-gray-500 text-center">Before (Archived)</div>
                </div>
                <div className="space-y-2">
                  <div className="h-48 bg-gray-200 rounded-xl overflow-hidden border border-gray-200">
                    <img src={project.image} alt="Current" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-sm font-medium text-gray-900 text-center">Current State</div>
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Updates Timeline */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-6 flex items-center gap-2">
                <iconify-icon icon="solar:history-linear" class="text-blue-600"></iconify-icon>
                Project Updates
              </h3>
              
              {project.updates && project.updates.length > 0 ? (
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                  {project.updates.map((update, idx) => (
                     <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                       <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                         <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                       </div>
                       <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] pl-3 md:pl-0">
                         <div className="flex flex-col">
                           <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">{update.date}</span>
                           <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">{update.text}</p>
                         </div>
                       </div>
                     </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic text-center py-4">No major updates recorded yet.</p>
              )}
            </div>

            {/* Public Discussion */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-4 flex items-center gap-2">
                <iconify-icon icon="solar:chat-square-like-linear" class="text-blue-600"></iconify-icon>
                Community Discussion
              </h3>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                 <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                   <div className="flex items-center gap-2 mb-1">
                     <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">JD</div>
                     <span className="text-sm font-semibold text-gray-900">John D.</span>
                   </div>
                   <p className="text-sm text-gray-600">Really glad to see this moving forward. The area desperately needs it.</p>
                 </div>
                 <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                   <div className="flex items-center gap-2 mb-1">
                     <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">MR</div>
                     <span className="text-sm font-semibold text-gray-900">Mary R.</span>
                   </div>
                   <p className="text-sm text-gray-600">Will this affect local traffic during construction phase?</p>
                 </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setComment(''); alert("Comment submitted for moderation."); }} className="mt-4 pt-4 border-t border-gray-100">
                <textarea 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Share your thoughts on this project..."
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
                <button 
                  type="submit"
                  className="mt-3 w-full bg-gray-900 text-white font-medium text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Post Comment
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}