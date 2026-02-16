
import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { AudienceSegment, State } from '../types';

interface DashboardProps {
  data: AudienceSegment[];
}

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [selectedState, setSelectedState] = useState<string>('All');
  
  const filteredData = useMemo(() => {
    if (selectedState === 'All') return data;
    return data.filter(d => d.location.includes(selectedState as State));
  }, [data, selectedState]);

  const reachData = useMemo(() => {
    return filteredData.map(seg => ({
      name: seg.name,
      reach: seg.estimatedSize / 1000,
    })).sort((a, b) => b.reach - a.reach);
  }, [filteredData]);

  const classData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredData.forEach(d => {
      counts[d.socialClass] = (counts[d.socialClass] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [filteredData]);

  return (
    <div className="space-y-8">
      {/* Top Header & State Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800">
        <div>
          <h3 className="text-xl font-black text-white">Intelligence Overview</h3>
          <p className="text-sm text-slate-500 font-medium">Real-time demographic analysis for prioritized SME segments</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Focus Region:</span>
          <select 
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm font-bold text-emerald-400 focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-lg"
          >
            <option value="All">MALAYSIA (National)</option>
            {Object.values(State).map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
          </select>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Segments', val: filteredData.length, color: 'text-emerald-400', icon: 'fa-users', bg: 'bg-emerald-500/10' },
          { label: 'Potential Reach', val: `${(filteredData.reduce((acc, curr) => acc + curr.estimatedSize, 0) / 1000000).toFixed(1)}M`, color: 'text-blue-400', icon: 'fa-chart-line', bg: 'bg-blue-500/10' },
          { label: 'Intensity Index', val: '9.4/10', color: 'text-amber-400', icon: 'fa-bolt', bg: 'bg-amber-500/10' },
          { label: 'Conversion Avg.', val: '12.4%', color: 'text-purple-400', icon: 'fa-shopping-cart', bg: 'bg-purple-500/10' }
        ].map((kpi, idx) => (
          <div key={idx} className={`bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 hover:border-slate-600 transition group`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{kpi.label}</p>
              <div className={`${kpi.bg} p-2 rounded-lg`}>
                <i className={`fas ${kpi.icon} ${kpi.color} transition`}></i>
              </div>
            </div>
            <h3 className={`text-2xl font-black ${kpi.color}`}>{kpi.val}</h3>
          </div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <div className="w-2 h-6 bg-emerald-500 rounded-full"></div>
              Reach Depth by Segment
            </h4>
            <div className="text-[10px] font-bold text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 uppercase tracking-widest">
              Unit: 1,000 Users
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reachData}>
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" fontSize={10} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis fontSize={10} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #1e293b', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                  itemStyle={{ color: '#10B981', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="reach" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorReach)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800 flex flex-col">
          <h4 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
            <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
            Spending Power Mix
          </h4>
          <div className="h-64 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={classData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {classData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-auto">
            {classData.map((d, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-bold p-2 hover:bg-slate-800 rounded-lg transition border border-transparent hover:border-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                  <span className="text-slate-400">{d.name}</span>
                </div>
                <span className="text-white">{((d.value / filteredData.length) * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
