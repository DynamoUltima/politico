import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { formatDate } from '../../utils/formatDate';

export default function NewsDetail() {
  const { id } = useParams();
  const { news } = useAppContext();
  const item = news.find((n) => n.id === id);

  if (!item) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Article not found</h2>
        <p className="text-gray-500 mb-6">This article may have been removed or the link is incorrect.</p>
        <Link to="/news" className="bg-gray-900 text-white px-6 py-2 rounded-full font-medium">Back to News</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link to="/news" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium mb-10 transition-colors">
          <iconify-icon icon="solar:arrow-left-linear"></iconify-icon>
          Back to News
        </Link>

        <header className="mb-10 border-b border-gray-100 pb-10">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">{formatDate(item.date)}</p>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4">{item.title}</h1>
          <p className="text-xl text-gray-500 leading-relaxed">{item.excerpt}</p>
        </header>

        {item.body ? (
          <div className="prose prose-lg prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {item.body}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <iconify-icon icon="solar:document-text-linear" width="40" class="mb-3"></iconify-icon>
            <p className="text-gray-500">Full article content has not been published yet.</p>
          </div>
        )}

      </div>
    </div>
  );
}
