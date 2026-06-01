import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { clsx } from 'clsx';

export default function Home() {
  const { projects, feedbacks } = useAppContext();
  
  const completedProjects = projects.filter(p => p.status === 'Completed').length;
  const ongoingProjects = projects.filter(p => p.status === 'Ongoing').length;
  const issuesResolved = feedbacks.filter(f => f.category === 'Complaint').length * 15; // Mock stat

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80" 
            alt="Community gathering" 
            className="w-full h-full object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-6 border border-blue-100">
            Working for the 4th District
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-8 leading-tight max-w-4xl mx-auto">
            Building a stronger, more <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">connected community.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Committed to transparent governance, rapid infrastructure development, and ensuring every constituent's voice is heard and acted upon.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/projects" 
              className="bg-gray-900 text-white px-8 py-3.5 rounded-full font-medium hover:bg-gray-800 hover:-translate-y-0.5 transition-all shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2"
            >
              <iconify-icon icon="solar:buildings-2-linear" width="20"></iconify-icon>
              View Ongoing Projects
            </Link>
            <Link 
              to="/feedback" 
              className="bg-white text-gray-900 border border-gray-200 px-8 py-3.5 rounded-full font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
            >
              <iconify-icon icon="solar:chat-round-dots-linear" width="20"></iconify-icon>
              Share Your Concern
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-gray-100">
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-gray-900 tracking-tight mb-2">{projects.length}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Initiatives</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-blue-600 tracking-tight mb-2">{completedProjects}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Projects Completed</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-gray-900 tracking-tight mb-2">{ongoingProjects}</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Sites</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl font-bold text-gray-900 tracking-tight mb-2">{issuesResolved}+</div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Concerns Addressed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">Recent Progress</h2>
              <p className="text-gray-600 max-w-2xl text-lg">See how we are investing in our community's future through targeted development.</p>
            </div>
            <Link to="/projects" className="hidden sm:flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700 transition-colors">
              View all
              <iconify-icon icon="solar:arrow-right-linear" width="20"></iconify-icon>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={clsx(
                      "px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-md border",
                      project.status === 'Completed' ? "bg-green-500/20 text-green-900 border-green-500/30" : 
                      project.status === 'Ongoing' ? "bg-blue-500/20 text-blue-900 border-blue-500/30" : 
                      "bg-amber-500/20 text-amber-900 border-amber-500/30"
                    )}>
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 font-medium">
                    <iconify-icon icon="solar:tag-horizontal-linear"></iconify-icon>
                    {project.sector}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="font-medium text-gray-700">Progress</span>
                      <span className="text-gray-500">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={clsx(
                          "h-1.5 rounded-full transition-all duration-1000",
                          project.status === 'Completed' ? "bg-green-500" : "bg-blue-600"
                        )}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-10 text-center sm:hidden">
            <Link to="/projects" className="inline-flex items-center gap-2 text-blue-600 font-medium">
              View all projects
              <iconify-icon icon="solar:arrow-right-linear" width="20"></iconify-icon>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <iconify-icon icon="solar:mailbox-linear" width="48" class="mb-6 opacity-80"></iconify-icon>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Your Voice Matters</h2>
          <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
            Development is a collaborative effort. Whether it's a broken streetlight, a safety concern, or an idea for community improvement, I want to hear from you.
          </p>
          <Link 
            to="/feedback" 
            className="inline-block bg-white text-blue-600 px-8 py-3.5 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 transition-all shadow-lg"
          >
            Submit Feedback Directly
          </Link>
        </div>
      </section>
    </div>
  );
}