import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { formatDate } from '../../utils/formatDate';

const initialState = { title: '', date: '', excerpt: '', body: '' };

export default function ManageNews() {
  const { news, addNewsItem, updateNewsItem, deleteNewsItem } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateNewsItem(editingId, form);
    } else {
      addNewsItem(form);
    }
    setShowForm(false);
    setEditingId(null);
    setForm(initialState);
  };

  const handleEdit = (item) => {
    setForm({ title: item.title, date: item.date, excerpt: item.excerpt, body: item.body || '' });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(initialState);
  };

  const field = (key, label, opts = {}) => (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <input
        {...opts}
        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none"
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manage News</h1>
        <button
          onClick={showForm ? handleCancel : () => setShowForm(true)}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
        >
          <iconify-icon icon={showForm ? 'solar:close-circle-linear' : 'solar:add-circle-linear'} width="18"></iconify-icon>
          {showForm ? 'Cancel' : 'New Article'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">
            {editingId ? 'Edit Article' : 'New Article'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {field('title', 'Title *', { required: true, type: 'text', placeholder: 'Article headline' })}
              {field('date', 'Date *', { required: true, type: 'date' })}
            </div>
            {field('excerpt', 'Excerpt *', { required: true, type: 'text', placeholder: 'Short summary shown on the news list' })}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Body</label>
              <textarea
                rows="6"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none resize-none"
                placeholder="Full article content..."
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
              />
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                {editingId ? 'Update Article' : 'Publish Article'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {news.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <iconify-icon icon="solar:document-text-linear" width="40" class="mb-3"></iconify-icon>
            <p className="font-medium text-gray-500">No articles yet</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold tracking-wider">Title</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Date</th>
                <th className="px-6 py-3 font-semibold tracking-wider hidden md:table-cell">Excerpt</th>
                <th className="px-6 py-3 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id} className="bg-white border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-[200px]">
                    <div className="line-clamp-1">{item.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{formatDate(item.date)}</td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs hidden md:table-cell">
                    <div className="line-clamp-1">{item.excerpt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(item)} className="text-gray-400 hover:text-blue-600 p-1">
                        <iconify-icon icon="solar:pen-linear" width="18"></iconify-icon>
                      </button>
                      <button
                        onClick={() => { if (window.confirm('Delete this article?')) deleteNewsItem(item.id); }}
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <iconify-icon icon="solar:trash-bin-trash-linear" width="18"></iconify-icon>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
