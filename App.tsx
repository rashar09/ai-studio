
import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { AudienceExplorer } from './components/AudienceExplorer';
import { AdvisorAI } from './components/AdvisorAI';
import { AdMatrix } from './components/AdMatrix';
import { MALAYSIAN_AUDIENCE_DATA, CASE_STUDIES } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'explorer' | 'analyst' | 'matrix'>('dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-100">
      {/* Global Notification Banner */}
      <div className="bg-emerald-600 text-white py-2 text-center text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
        Ramadan 2024 Readiness Active • Consumer Spending Up 18% In Urban Corridors
      </div>

      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <i className="fab fa-whatsapp text-xl"></i>
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tighter text-white leading-none">
                MY-BIZ <span className="text-emerald-500">INSIGHTS</span>
              </h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">SME Strategy Suite</p>
            </div>
          </div>
          <div className="flex gap-2 p-1 bg-slate-950 rounded-2xl hidden md:flex border border-slate-800">
            {[
              { id: 'dashboard', label: 'OVERVIEW', icon: 'fa-chart-pie' },
              { id: 'explorer', label: 'DATA HUB', icon: 'fa-database' },
              { id: 'matrix', label: 'AD MATRIX', icon: 'fa-layer-group' },
              { id: 'analyst', label: 'ADVISOR AI', icon: 'fa-magic' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-2.5 text-[11px] font-black rounded-xl transition-all ${
                  activeTab === tab.id 
                  ? 'bg-emerald-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <i className={`fas ${tab.icon}`}></i> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-10 space-y-10">
        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <Dashboard data={MALAYSIAN_AUDIENCE_DATA} />
            
            <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-slate-800">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                  <div className="p-3 bg-amber-500/20 text-amber-500 rounded-2xl"><i className="fas fa-lightbulb"></i></div>
                  Strategic Outlook
                </h3>
                <div className="space-y-6">
                  {[
                    { title: 'Trust-First Economy', desc: 'WhatsApp remains the #1 digital trust builder for closing sales across all social classes in Malaysia.' },
                    { title: 'Hyper-Local Nuance', desc: 'Regional dialects (Loghat) significantly outperform standard English in conversions for rural B40 segments.' },
                    { title: 'Linguistic Blending', desc: 'Manglish content formats see 24% higher engagement among Young Urban Professionals.' }
                  ].map((tip, i) => (
                    <div key={i} className="flex gap-4 group">
                      <span className="text-2xl font-black text-slate-800 group-hover:text-emerald-500 transition-colors">0{i+1}</span>
                      <div>
                        <h4 className="font-bold text-slate-100 group-hover:text-emerald-500 transition-colors">{tip.title}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-slate-800">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3 text-white">
                  <div className="p-3 bg-blue-500/20 text-blue-500 rounded-2xl"><i className="fas fa-briefcase"></i></div>
                  Verified Case Studies
                </h3>
                <div className="space-y-4">
                  {CASE_STUDIES.map(cs => (
                    <div key={cs.id} className="p-6 bg-slate-800/50 rounded-3xl border border-slate-700 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all group">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-black text-slate-100 group-hover:text-emerald-400">{cs.title}</p>
                        <span className="text-[9px] font-black bg-slate-950 px-2 py-1 rounded-full text-emerald-400 border border-slate-700 uppercase">{cs.industry}</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">{cs.strategy}</p>
                      <div className="flex items-center gap-2 text-[10px] font-black text-emerald-400 uppercase">
                        <i className="fas fa-arrow-up"></i> {cs.results}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'explorer' && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <AudienceExplorer data={MALAYSIAN_AUDIENCE_DATA} />
          </div>
        )}

        {activeTab === 'matrix' && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <AdMatrix />
          </div>
        )}

        {activeTab === 'analyst' && (
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <AdvisorAI />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-20 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-md space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                <i className="fab fa-whatsapp"></i>
              </div>
              <h4 className="font-black text-lg text-white">MY-BIZ <span className="text-emerald-500">INSIGHTS</span></h4>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Malaysian-first business intelligence for the digital era. Built on high-fidelity demographic datasets to empower local vendors and e-commerce players.
            </p>
            <div className="flex gap-4">
              {['facebook', 'linkedin', 'instagram'].map(s => (
                <a key={s} href="#" className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-slate-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm border border-slate-800">
                  <i className={`fab fa-${s}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 text-slate-500 w-full md:w-auto">
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Market Core</p>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#" className="hover:text-emerald-400 transition">State Reports</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">SME Trendline</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Linguistic Mix</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">Platform</p>
              <ul className="space-y-3 text-sm font-medium">
                <li><a href="#" className="hover:text-emerald-400 transition">Advisor AI</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">API Documentation</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Data Licensing</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">© 2024 MALAYSIA BUSINESS INTELLIGENCE SUITE • KUALA LUMPUR</p>
          <div className="flex gap-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">
            <a href="#" className="hover:text-emerald-400 transition">Terms</a>
            <a href="#" className="hover:text-emerald-400 transition">Privacy</a>
            <a href="#" className="hover:text-emerald-400 transition">PDPA Compliance</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
