import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { defaultAboutContent } from '../../constants/aboutContent';

const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80';

const VISION_CARD_STYLES = [
  { bg: 'bg-blue-50', border: 'border-blue-100', iconBg: 'bg-blue-600' },
  { bg: 'bg-emerald-50', border: 'border-emerald-100', iconBg: 'bg-emerald-600' },
  { bg: 'bg-purple-50', border: 'border-purple-100', iconBg: 'bg-purple-600' },
  { bg: 'bg-amber-50', border: 'border-amber-100', iconBg: 'bg-amber-600' },
];

export default function About() {
  const { mpPhotoURL, aboutContent } = useAppContext();
  const content = { ...defaultAboutContent, ...aboutContent };

  return (
    <div className="bg-white min-h-screen">

      {/* Bio Header */}
      <section className="bg-gray-50 py-16 lg:py-24 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="w-48 h-48 md:w-72 md:h-72 shrink-0 rounded-full border-4 border-white shadow-xl overflow-hidden relative">
              <img
                src={mpPhotoURL || DEFAULT_PHOTO}
                alt={content.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest mb-4">
                <iconify-icon icon="solar:star-linear"></iconify-icon>
                {content.badge}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">{content.name}</h1>
              <p className="text-xl text-gray-500 mb-6 font-medium">{content.tagline}</p>
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
              {content.bio}
            </p>

            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6 mt-12">Political Vision</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {content.visionCards.map((card, i) => {
                const style = VISION_CARD_STYLES[i % VISION_CARD_STYLES.length];
                return (
                  <div key={i} className={`${style.bg} p-6 rounded-2xl border ${style.border}`}>
                    <div className={`w-10 h-10 ${style.iconBg} text-white rounded-lg flex items-center justify-center mb-4`}>
                      <iconify-icon icon="solar:star-bold" width="24"></iconify-icon>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                  </div>
                );
              })}
            </div>

            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">Achievements in Office</h2>
            <ul className="space-y-4 mb-12">
              {content.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <iconify-icon icon="solar:check-circle-bold" class="text-blue-600 mt-1 shrink-0" width="20"></iconify-icon>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </section>

    </div>
  );
}
