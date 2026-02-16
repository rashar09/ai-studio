
import React, { useState } from 'react';
// Fix: Changed getMarketInsights to getAdvisorReport as it is the correct exported member from geminiService
import { getAdvisorReport } from '../services/geminiService';
import { MALAYSIAN_AUDIENCE_DATA } from '../constants';

export const StrategyAnalyst: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      // Fix: Updated call to use getAdvisorReport which takes prompt, template, and context
      const result = await getAdvisorReport(query, "General Strategy", MALAYSIAN_AUDIENCE_DATA);
      setReport(result || "No data returned.");
    } catch (error) {
      console.error(error);
      setReport("Error fetching analysis. Please ensure your API key is active.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
          <i className="fas fa-brain text-xl"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold">Senior Strategy Analyst (AI)</h3>
          <p className="text-sm text-gray-500">Deep-dive custom market reports for your specific niche</p>
        </div>
      </div>

      <form onSubmit={handleAsk} className="space-y-4">
        <div className="relative">
          <textarea
            className="w-full border border-gray-200 rounded-xl p-4 pr-24 min-h-[120px] focus:ring-2 focus:ring-green-500 outline-none transition"
            placeholder="E.g., 'How should an organic vegetable farmer in Cameron Highlands target M40 families in KL during Ramadan?'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute bottom-4 right-4 bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50 transition flex items-center gap-2"
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
            Analyze
          </button>
        </div>
      </form>

      {report && (
        <div className="mt-8 prose prose-green max-w-none">
          <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 whitespace-pre-wrap text-sm leading-relaxed text-gray-800">
             {report}
          </div>
          <div className="mt-4 flex justify-end">
             <button 
                onClick={() => window.print()}
                className="text-xs text-gray-500 hover:text-green-600 flex items-center gap-1"
             >
                <i className="fas fa-print"></i> Print Insight Report
             </button>
          </div>
        </div>
      )}
    </div>
  );
};
