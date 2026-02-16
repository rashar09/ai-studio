
import React, { useState } from 'react';
import { getAdvisorReport } from '../services/geminiService';
import { MALAYSIAN_AUDIENCE_DATA } from '../constants';

const TEMPLATES = [
  { id: 'ramadan', label: 'Ramadan / Festive Blitz', icon: 'fa-moon' },
  { id: 'retention', label: 'Customer Retention Loop', icon: 'fa-sync' },
  { id: 'launch', label: 'New Product Market Fit', icon: 'fa-rocket' },
  { id: 'rural', label: 'East Malaysia Expansion', icon: 'fa-map-marked-alt' }
];

export const AdvisorAI: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0].id);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const templateLabel = TEMPLATES.find(t => t.id === selectedTemplate)?.label || 'General Strategy';
      const result = await getAdvisorReport(query, templateLabel, MALAYSIAN_AUDIENCE_DATA);
      setReport(result || "No data returned.");
    } catch (error) {
      console.error(error);
      setReport("The advisor is currently offline. Please check your API credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-800 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 p-10 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <i className="fas fa-atom text-8xl"></i>
          </div>
          <div className="flex items-center gap-6 mb-8 relative z-10">
            <div className="w-20 h-20 bg-slate-950/40 rounded-[1.5rem] flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-2xl">
              <i className="fas fa-robot text-4xl text-emerald-400"></i>
            </div>
            <div>
              <h3 className="text-3xl font-black tracking-tighter">Advisor AI <span className="text-emerald-400 text-xs align-top ml-2 px-3 py-1 border border-emerald-500/30 rounded-full font-black bg-emerald-500/10">PREMIUM ANALYST</span></h3>
              <p className="text-emerald-100 opacity-60 font-medium">Hyper-Local SME Market Intelligence</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 relative z-10">
            {TEMPLATES.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`flex items-center justify-center gap-3 px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  selectedTemplate === t.id 
                  ? 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-105' 
                  : 'bg-slate-950/40 hover:bg-slate-950/60 border-slate-700 text-slate-400'
                }`}
              >
                <i className={`fas ${t.icon} ${selectedTemplate === t.id ? 'text-white' : 'text-emerald-500'}`}></i> {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-10">
          <form onSubmit={handleAsk} className="space-y-6">
            <div className="relative group">
              <textarea
                className="w-full bg-slate-950 border-2 border-slate-800 rounded-[2rem] p-8 pr-32 min-h-[220px] text-lg text-white focus:border-emerald-500 focus:ring-8 focus:ring-emerald-500/10 outline-none transition-all resize-none shadow-inner placeholder-slate-700 font-medium"
                placeholder="Describe your Malaysian business model or specific challenge... (e.g. 'I sell premium durians to T20 expats in Mont Kiara via WhatsApp')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute bottom-8 right-8 bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-500 disabled:opacity-50 transition shadow-xl shadow-emerald-900/40 flex items-center gap-3 group-active:scale-95 uppercase text-xs tracking-[0.2em]"
              >
                {loading ? <i className="fas fa-cog fa-spin"></i> : <i className="fas fa-microchip"></i>}
                ANALYZE MARKET
              </button>
            </div>
          </form>

          {report && (
            <div className="mt-12 animate-in fade-in slide-in-from-top-6 duration-700">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">AI Generative Insight Brief</h4>
                <button onClick={() => window.print()} className="text-emerald-400 hover:text-emerald-300 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-slate-800 px-4 py-2 rounded-xl bg-slate-950/50">
                  <i className="fas fa-print"></i> PDF Export
                </button>
              </div>
              <div className="p-10 bg-slate-950 rounded-[2.5rem] border border-slate-800 shadow-2xl prose prose-invert prose-emerald max-w-none">
                 <div className="whitespace-pre-wrap text-slate-300 leading-relaxed font-medium">
                    {report}
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-900/10 p-8 rounded-[2rem] border border-emerald-500/20">
           <h5 className="font-bold text-emerald-400 mb-3 flex items-center gap-3 uppercase text-[10px] tracking-widest">
             <i className="fas fa-check-circle"></i> Local Insight Tip
           </h5>
           <p className="text-sm text-slate-400 leading-relaxed font-medium">
             During payday cycles (25th - 30th), increase your WhatsApp Status frequency to 3-4 times daily to capture the maximum T20/M40 liquidity.
           </p>
        </div>
        <div className="bg-blue-900/10 p-8 rounded-[2rem] border border-blue-500/20">
           <h5 className="font-bold text-blue-400 mb-3 flex items-center gap-3 uppercase text-[10px] tracking-widest">
             <i className="fas fa-shield-alt"></i> Compliance Check
           </h5>
           <p className="text-sm text-slate-400 leading-relaxed font-medium">
             Ensure your WhatsApp catalogs are PDPA compliant. Avoid sharing customer numbers in public group chats without consent.
           </p>
        </div>
      </div>
    </div>
  );
};
