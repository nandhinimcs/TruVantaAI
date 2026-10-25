import React from 'react';
import { History, Search, Filter, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ReviewHistory() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          <History className="w-4 h-4" />
          <span>Audit Log & Traceability</span>
        </div>
        <h1 className="text-3xl font-bold text-white mt-1">Review History</h1>
        <p className="text-sm text-slate-400 mt-1">
          Complete ledger of verified campaigns, model rationales, and compliance outcomes.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            readOnly
            placeholder="Search review records by asset title, channel, or reviewer..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 placeholder-slate-600 focus:outline-none"
          />
        </div>
        <button
          disabled
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 text-xs font-medium flex items-center space-x-2 cursor-not-allowed"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filter Records</span>
        </button>
      </div>

      {/* History Ledger Placeholder */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Recent Audit Ledger (Sample Schemas)
        </div>

        <div className="divide-y divide-slate-800 text-xs">
          <div className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="font-semibold text-slate-200 block">Q4 Brand Refresh Press Release</span>
                <span className="text-[11px] text-slate-500">Corporate Communications &bull; Automated Review</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium text-[11px]">
              Compliant (Score: 98/100)
            </span>
          </div>

          <div className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <div>
                <span className="font-semibold text-slate-200 block">Global Product Launch Ad Copy</span>
                <span className="text-[11px] text-slate-500">Growth Marketing &bull; Approved with Advisory</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium text-[11px]">
              Approved (Score: 92/100)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
