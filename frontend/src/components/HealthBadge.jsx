import React from 'react';
import { Activity, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function HealthBadge({ healthStatus, onRefresh, isLoading }) {
  if (isLoading && !healthStatus) {
    return (
      <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400">
        <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-400" />
        <span>Connecting to Backend...</span>
      </div>
    );
  }

  const isHealthy = healthStatus?.success && healthStatus?.data?.status === 'healthy';

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
          isHealthy
            ? 'bg-emerald-950/60 border-emerald-700/50 text-emerald-300 shadow-sm shadow-emerald-950'
            : 'bg-rose-950/60 border-rose-700/50 text-rose-300 shadow-sm shadow-rose-950'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isHealthy ? 'bg-emerald-400' : 'bg-rose-400'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isHealthy ? 'bg-emerald-500' : 'bg-rose-500'
            }`}
          />
        </span>
        <span className="font-semibold tracking-wide">
          {isHealthy ? 'Backend Live' : 'Backend Offline'}
        </span>
        {isHealthy && (
          <span className="text-[10px] opacity-75 hidden sm:inline">
            ({healthStatus.latency}ms)
          </span>
        )}
      </div>

      <button
        onClick={onRefresh}
        disabled={isLoading}
        title="Check Backend Health"
        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition disabled:opacity-50"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-brand-400' : ''}`} />
      </button>
    </div>
  );
}
