import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { clsx } from 'clsx';

const ACTION_META = {
  login: { label: 'Sign In', icon: 'solar:login-3-bold', classes: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  logout: { label: 'Sign Out', icon: 'solar:logout-2-bold', classes: 'bg-gray-100 text-gray-600 border-gray-200' },
  project: { label: 'Project', icon: 'solar:buildings-2-bold', classes: 'bg-blue-50 text-blue-700 border-blue-200' },
  news: { label: 'News', icon: 'solar:document-text-bold', classes: 'bg-purple-50 text-purple-700 border-purple-200' },
  settings: { label: 'Settings', icon: 'solar:settings-bold', classes: 'bg-amber-50 text-amber-700 border-amber-200' },
};

function formatLogTime(timestamp) {
  if (!timestamp?.toDate) return 'Just now';
  return timestamp.toDate().toLocaleString('en-US', {
    month: 'short', day: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit',
  });
}

export default function ActivityLog() {
  const { activityLogs } = useAppContext();
  const [filter, setFilter] = useState('all');

  const filters = useMemo(() => ['all', ...Object.keys(ACTION_META)], []);

  const filteredLogs = filter === 'all'
    ? activityLogs
    : activityLogs.filter(log => log.action === filter);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Activity Log</h1>
        <p className="text-sm text-gray-500 mt-1">A record of admin sign-ins and content changes across the portal.</p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {filters.map(key => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={clsx(
              'px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors',
              filter === key
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            )}
          >
            {key === 'all' ? 'All' : ACTION_META[key].label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold tracking-wider">Time</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Admin</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Action</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => {
                const meta = ACTION_META[log.action] || { label: log.action, icon: 'solar:info-circle-bold', classes: 'bg-gray-100 text-gray-600 border-gray-200' };
                return (
                  <tr key={log.id} className="bg-white border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{formatLogTime(log.timestamp)}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{log.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx('inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border', meta.classes)}>
                        <iconify-icon icon={meta.icon} width="12"></iconify-icon>
                        {meta.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{log.message}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-16 text-gray-400 text-sm">
            <iconify-icon icon="solar:clipboard-list-linear" width="40" class="mb-3 opacity-50"></iconify-icon>
            <p>No activity recorded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
