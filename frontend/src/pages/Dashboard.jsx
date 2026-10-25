import React from 'react';
import { LayoutDashboard, TrendingUp, ShieldCheck, AlertTriangle, Layers, Clock } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-brand-400 uppercase tracking-wider">
          <LayoutDashboard className="w-4 h-4" />
          <span>Executive Overview</span>
        </div>
        <h1 className="text-3xl font-bold text-white mt-1">Brand Governance Dashboard</h1>
        <p className="text-sm text-slate-400 mt-1">
          High-level operational metrics, policy compliance health, and asset governance flow.
        </p>
      </div>

      {/* Metrics Row Placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Compliance Index</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white">98.4%</span>
            <span className="text-xs text-emerald-400 font-medium">+1.2%</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Calculated across verified assets</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Active Brand Rules</span>
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white">42</span>
            <span className="text-xs text-indigo-400 font-medium">In Guidelines</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Ingested via PDF & policy docs</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Verified Assets</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white">128</span>
            <span className="text-xs text-blue-400 font-medium">This Week</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Marketing, legal & product</p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Flagged Anomalies</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-white">3</span>
            <span className="text-xs text-amber-400 font-medium">Pending Review</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Requires human sign-off</p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mx-auto">
          <Clock className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-semibold text-white">Governance Pipeline Ready</h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Backend foundation is initialized and responsive. In subsequent steps, live analytics from Supabase and policy rule models will populate this dashboard.
        </p>
      </div>
    </div>
  );
}
