
import React, { useState } from 'react';
import { AD_PLATFORMS } from '../constants';
import { getAdStrategyInsights } from '../services/geminiService';

export const AdMatrix: React.FC = () => {
  const [niche, setNiche] = useState('Modest Fashion');
  const [selectedClass, setSelectedClass] = useState('M40');
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAiAnalysis = async () => {
    setLoading(true);
    try {
      const result = await getAdStrategyInsights(niche, selectedClass);
      setAiAnalysis(result ?? null);
    } catch (error) {
      console.error(error);
      setAiAnalysis("Analysis failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-800 overflow-hidden">
        <div className="p-8 border-b border-slate-800 bg-gradient-to-r from-emerald-950/30 to-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">Ad Platform Comparison Matrix</h3>
            <p className="text-sm text-slate-500 font-medium">Benchmark WhatsApp against other Malaysian digital channels</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
             <input 
                type="text" 
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="bg-transparent px-3 py-1.5 text-xs font-medium text-white outline-none placeholder-slate-600"
                placeholder="Business Niche..."
             />
             <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-transparent px-3 py-1.5 text-xs font-bold text-emerald-400 outline-none cursor-pointer"
             >
                <option value="T20">T20</option>
                <option value="M40">M40</option>
                <option value="B40">B40</option>
             </select>
             <button 
                onClick={handleAiAnalysis}
                disabled={loading}
                className="bg-emerald-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-500 disabled:opacity-50 shadow-lg shadow-emerald-900/40 transition-all active:scale-95"
             >
                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Run AI Match'}
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Platform</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Setup</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Est. CPL (MYR)</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Trust Factor</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">Best For</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">MY Nuance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {AD_PLATFORMS.map((platform) => (
                <tr key={platform.name} className={`hover:bg-slate-800/40 transition-all ${platform.name === 'WhatsApp Business' ? 'bg-emerald-500/5' : ''}`}>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${platform.name === 'WhatsApp Business' ? 'bg-emerald-400 shadow-emerald-400/50' : 'bg-slate-700 shadow-transparent'}`}></div>
                        <span className="font-bold text-slate-100">{platform.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase tracking-tighter ${
                      platform.setupComplexity === 'Low' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
                      platform.setupComplexity === 'Medium' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 
                      'bg-orange-500/10 border-orange-500/20 text-orange-400'
                    }`}>
                      {platform.setupComplexity}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-400 font-mono">
                    {platform.avgCPL}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex text-amber-500 text-[10px] gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`${i < platform.trustFactor ? 'fas' : 'far text-slate-700'} fa-star`}></i>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-300 font-medium italic">
                    {platform.bestFor}
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-500 italic max-w-xs leading-relaxed">
                    {platform.malaysianContext}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {aiAnalysis && (
        <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl border-2 border-emerald-500/20 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                <i className="fas fa-robot text-9xl text-emerald-400"></i>
            </div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                    <span className="bg-emerald-600 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-900/50">AI Strategic Match</span>
                    <h4 className="text-xl font-black text-white">Custom Channel Strategy for {niche} ({selectedClass})</h4>
                </div>
                <div className="prose prose-sm max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap italic bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-inner">
                    {aiAnalysis}
                </div>
                <div className="mt-6 flex gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-bold uppercase tracking-widest">
                        <i className="fas fa-info-circle text-emerald-500"></i> Local Market Volatility Adaptive
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Actionable SME Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl hover:border-slate-700 transition">
            <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                <i className="fas fa-bolt text-amber-400"></i> Speed Tip
            </h5>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Combine FB Ads (Lead Gen) with WhatsApp (Instant Closing) to reduce your sales cycle from 7 days to 24 hours in Malaysia.
            </p>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl hover:border-slate-700 transition">
            <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                <i className="fas fa-shield-alt text-emerald-400"></i> Trust Tip
            </h5>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                For Malaysian customers, a "WhatsApp Verified" badge increases link-click trust by 32% compared to standard landing pages.
            </p>
        </div>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl hover:border-slate-700 transition">
            <h5 className="font-bold text-white mb-3 flex items-center gap-2">
                <i className="fas fa-gift text-purple-400"></i> Promo Tip
            </h5>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Use WhatsApp Status for "Shocking Sales" – this taps into the FOMO culture common among M40 Shopee users.
            </p>
        </div>
      </div>
    </div>
  );
};
