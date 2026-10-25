import React from 'react';
import { BarChart3, Download, Calendar, Filter, FileSpreadsheet } from 'lucide-react';

export default function Reports() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <BarChart3 className="w-4 h-4" />
            <span>Governance Intelligence</span>
          </div>
          <h1 className="text-3xl font-bold text-white mt-1">Compliance Reports</h1>
          <p className="text-sm text-slate-400 mt-1">
            Audit-ready reporting, policy adherence trends, and governance summaries.
          </p>
        </div>

        <button
          disabled
          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-500 text-xs font-medium cursor-not-allowed flex items-center space-x-2 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit PDF</span>
        </button>
      </div>

      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
          <FileSpreadsheet className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-white">Reports Module Initialized</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Report templates and export pipelines are configured. In future steps, this will aggregate Supabase audit logs into downloadable compliance certificates.
        </p>
      </div>
    </div>
  );
}
