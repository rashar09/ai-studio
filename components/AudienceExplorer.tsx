
import React, { useState } from 'react';
import { AudienceSegment, State, AgeGroup, SocialClass, ItemCategory } from '../types';

interface AudienceExplorerProps {
  data: AudienceSegment[];
}

export const AudienceExplorer: React.FC<AudienceExplorerProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState<string>('All');
  const [filterAge, setFilterAge] = useState<string>('All');
  const [filterClass, setFilterClass] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specialRequirements.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.culturalTriggers.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesState = filterState === 'All' || item.location.some(l => l === filterState);
    const matchesAge = filterAge === 'All' || item.ageGroup === filterAge;
    const matchesClass = filterClass === 'All' || item.socialClass === filterClass;
    const matchesCategory = filterCategory === 'All' || item.topItemAffinities.includes(filterCategory as ItemCategory);
    
    return matchesSearch && matchesState && matchesAge && matchesClass && matchesCategory;
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Reach', 'Class', 'Age', 'Peak Time', 'Top Affinities'];
    const rows = filteredData.map(d => [
      d.name,
      d.estimatedSize,
      d.socialClass,
      d.ageGroup,
      d.peakActivityTime,
      d.topItemAffinities.join(' | ')
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.map(val => `"${val}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "malaysian_sme_market_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-800 overflow-hidden">
      <div className="p-10 border-b border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-gradient-to-br from-slate-900 to-slate-950">
        <div>
          <h3 className="text-2xl font-black text-white">Demographic Data Hub</h3>
          <p className="text-sm text-slate-500 font-medium">Granular audience mapping for item-level targeting</p>
        </div>
        <div className="flex gap-3">
           <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl hover:bg-emerald-500 shadow-lg shadow-emerald-500/20 transition font-black text-xs uppercase tracking-widest"
          >
            <i className="fas fa-file-csv"></i> Export Dataset
          </button>
        </div>
      </div>

      <div className="p-10 bg-slate-950/50 border-b border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contextual Search</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Keywords..." 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-xs"></i>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">State Focus</label>
          <select 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value="All">National Range</option>
            {Object.values(State).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Social Class</label>
          <select 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
          >
            <option value="All">All Classes</option>
            {Object.values(SocialClass).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Item Category</label>
          <select 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {Object.values(ItemCategory).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Age Bracket</label>
          <select 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            value={filterAge}
            onChange={(e) => setFilterAge(e.target.value)}
          >
            <option value="All">All Ages</option>
            {Object.values(AgeGroup).map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-950 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-800">
            <tr>
              <th className="px-10 py-6">Segment Nuance</th>
              <th className="px-6 py-6">Class & Power</th>
              <th className="px-6 py-6">Smart Affinities (Items)</th>
              <th className="px-6 py-6">Peak Engagement</th>
              <th className="px-10 py-6 text-right">Reach</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-medium">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/40 transition align-top group">
                <td className="px-10 py-8">
                  <div className="font-black text-white group-hover:text-emerald-400 transition-colors">{item.name}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.location.slice(0, 2).map(loc => (
                      <span key={loc} className="text-[8px] font-black bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 uppercase border border-slate-700">{loc}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-8">
                  <div className="text-xs font-black text-blue-400 uppercase">{item.socialClass.split(' ')[0]}</div>
                  <div className="text-[10px] text-slate-500 mt-1 italic">Age {item.ageGroup}</div>
                </td>
                <td className="px-6 py-8">
                  <div className="flex flex-wrap gap-2 max-w-[200px]">
                    {item.topItemAffinities.map(cat => (
                      <span key={cat} className="bg-emerald-500/10 text-emerald-400 text-[9px] font-black px-2.5 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1">
                        <i className="fas fa-tag opacity-50"></i> {cat}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-8">
                  <div className="text-xs font-black text-slate-300">{item.peakActivityTime}</div>
                  <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-1 uppercase">
                    <i className="fas fa-language"></i> {item.primaryLanguage}
                  </div>
                </td>
                <td className="px-10 py-8 text-right">
                  <div className="text-lg font-black text-white">{(item.estimatedSize / 1000).toLocaleString()}k</div>
                  <div className={`text-[9px] font-black uppercase mt-1 ${
                    item.waUsageIntensity === 'Extreme' ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {item.waUsageIntensity} INTENSITY
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
