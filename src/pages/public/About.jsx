import React from 'react';

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* Bio Header */}
      <section className="bg-gray-50 py-16 lg:py-24 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="w-48 h-48 md:w-72 md:h-72 shrink-0 rounded-full border-4 border-white shadow-xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80" 
                alt="Hon. Marcus Thorne" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest mb-4">
                <iconify-icon icon="solar:star-linear"></iconify-icon>
                Member of Parliament
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">Hon. Marcus Thorne</h1>
              <p className="text-xl text-gray-500 mb-6 font-medium">Serving the 4th District since 2018</p>
              <div className="flex gap-4">
                <button className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                  <iconify-icon icon="solar:letter-linear" width="18"></iconify-icon> Contact Office
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <iconify-icon icon="solar:document-text-linear" width="18"></iconify-icon> Press Kit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="prose prose-lg prose-blue max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">A Life of Service</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Born and raised in the heart of the 4th District, Marcus Thorne has dedicated his career to public service and community advocacy. Before entering politics, he served as the director of the Regional Community Foundation, where he spearheaded initiatives that built affordable housing and expanded after-school programs.
            </p>
            
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6 mt-12">Political Vision</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4">
                  <iconify-icon icon="solar:buildings-2-linear" width="24"></iconify-icon>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Infrastructure</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Upgrading our roads, digital connectivity, and public spaces to meet the demands of the 21st century while ensuring sustainability.</p>
              </div>
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center mb-4">
                  <iconify-icon icon="solar:diploma-linear" width="24"></iconify-icon>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Accessible Education</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Securing funding for local schools to ensure every child has access to top-tier educational resources and modern facilities.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">Achievements in Office</h2>
            <ul className="space-y-4 mb-12">
              <li className="flex items-start gap-3 text-gray-600">
                <iconify-icon icon="solar:check-circle-bold" class="text-blue-600 mt-1 shrink-0" width="20"></iconify-icon>
                <span>Secured $4.5M in federal grants for the revitalization of the Downtown Commerce Sector.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <iconify-icon icon="solar:check-circle-bold" class="text-blue-600 mt-1 shrink-0" width="20"></iconify-icon>
                <span>Authored the "Green Pathways" bill, resulting in 50 miles of new bike lanes and pedestrian walkways.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <iconify-icon icon="solar:check-circle-bold" class="text-blue-600 mt-1 shrink-0" width="20"></iconify-icon>
                <span>Established the first constituent-led budgetary committee, allowing direct voting on community micro-projects.</span>
              </li>
            </ul>

          </div>
        </div>
      </section>

    </div>
  );
}