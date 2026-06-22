import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { clsx } from 'clsx';
import { formatDate } from '../../utils/formatDate';

const CATEGORIES = ['All', 'Complaint', 'Suggestion', 'Question'];

export default function ManageFeedback() {
  const { feedbacks } = useAppContext();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return feedbacks.filter((f) => {
      const matchCat = filter === 'All' || f.category === filter;
      const matchSearch =
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.message.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [feedbacks, filter, search]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Feedback Board</h1>
        <span className="text-sm text-gray-500 font-medium">{feedbacks.length} total submissions</span>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors',
                filter === cat
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <iconify-icon icon="solar:magnifer-linear" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="18"></iconify-icon>
          <input
            type="text"
            placeholder="Search by name or message..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm focus:border-blue-500 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 py-16 text-center text-gray-400">
            <iconify-icon icon="solar:chat-round-dots-linear" width="40" class="mb-3"></iconify-icon>
            <p className="font-medium text-gray-500">No submissions match your filters.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="grow">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={clsx(
                      'px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border',
                      item.category === 'Complaint' ? 'bg-red-50 text-red-700 border-red-200' :
                      item.category === 'Suggestion' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    )}>
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400">{formatDate(item.date)}</span>
                  </div>
                  <p className="text-gray-900 font-medium mb-2 leading-snug">{item.message}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <iconify-icon icon="solar:user-rounded-linear" width="14"></iconify-icon>
                    <span>{item.name}</span>
                    <span className="text-gray-300">·</span>
                    <iconify-icon icon="solar:alt-arrow-up-linear" width="14"></iconify-icon>
                    <span>{item.upvotes} upvotes</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
