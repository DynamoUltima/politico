import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { formatDate } from '../../utils/formatDate';

export default function News() {
  const { news } = useAppContext();

  return (
    <div className="bg-white min-h-screen py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12 border-b border-gray-100 pb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">News & Updates</h1>
          <p className="text-lg text-gray-600">
            Stay informed with the latest announcements, press releases, and events from the MP's office.
          </p>
        </div>

        <div className="space-y-10">
          {news.map((item) => (
            <Link key={item.id} to={`/news/${item.id}`} className="group block">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                <div className="shrink-0 w-full md:w-32 pt-1 text-sm text-gray-500 font-medium uppercase tracking-wider">
                  {formatDate(item.date)}
                </div>
                <div className="grow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors tracking-tight leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                  <div className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    Read Full Story
                    <iconify-icon icon="solar:arrow-right-linear"></iconify-icon>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}