import React, { useMemo } from 'react';
import { useAppContext } from '../../context/AppContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { clsx } from 'clsx';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
  const { projects, feedbacks, news } = useAppContext();

  // Prepare data for charts
  const sectorData = useMemo(() => {
    const counts = {};
    projects.forEach(p => {
      counts[p.sector] = (counts[p.sector] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, count: counts[key] }));
  }, [projects]);

  const feedbackData = useMemo(() => {
    const counts = {};
    feedbacks.forEach(f => {
      counts[f.category] = (counts[f.category] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [feedbacks]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <iconify-icon icon="solar:buildings-2-bold" width="24"></iconify-icon>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Projects</div>
            <div className="text-3xl font-bold text-gray-900">{projects.length}</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <iconify-icon icon="solar:chat-round-dots-bold" width="24"></iconify-icon>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Feedback Submissions</div>
            <div className="text-3xl font-bold text-gray-900">{feedbacks.length}</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
            <iconify-icon icon="solar:document-text-bold" width="24"></iconify-icon>
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">News Published</div>
            <div className="text-3xl font-bold text-gray-900">{news.length}</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Projects by Sector</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <RechartsTooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Feedback Distribution</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feedbackData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {feedbackData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '12px', color: '#4b5563'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Feedback Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">Recent Feedback</h3>
          <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold tracking-wider">Date</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Citizen</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Category</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Message</th>
                <th className="px-6 py-3 font-semibold tracking-wider text-right">Upvotes</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.slice(0, 5).map((item) => (
                <tr key={item.id} className="bg-white border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      "px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded border",
                      item.category === 'Complaint' ? "bg-red-50 text-red-700 border-red-200" :
                      item.category === 'Suggestion' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      "bg-blue-50 text-blue-700 border-blue-200"
                    )}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{item.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900 text-right">{item.upvotes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}