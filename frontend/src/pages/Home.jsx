import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  FileCheck2, 
  BarChart3, 
  History, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Server, 
  Cpu, 
  FileText,
  Lock
} from 'lucide-react';

export default function Home({ setActiveTab, healthStatus, onRefreshHealth, isLoadingHealth }) {
  const isHealthy = healthStatus?.success && healthStatus?.data?.status === 'healthy';

  const modules = [
    {
      id: 'dashboard',
      title: 'Governance Dashboard',
      description: 'Real-time visibility into organization-wide brand health, compliance velocity, and risk flags.',
      icon: BarChart3,
      badge: 'Analytics',
      color: 'from-blue-500/10 to-indigo-500/10 border-blue-500/30 text-blue-400',
    },
    {
      id: 'studio',
      title: 'AI Content Studio',
      description: 'Generate brand-compliant marketing copy, social campaigns, and announcements guided by your brand book.',
      icon: Sparkles,
      badge: 'Generation',
      color: 'from-purple-500/10 to-pink-500/10 border-purple-500/30 text-purple-400',
    },
    {
      id: 'verification',
      title: 'Content Verification',
      description: 'Automated policy checker that scores draft assets against brand guidelines, tone rules, and safety bounds.',
      icon: FileCheck2,
      badge: 'Audit & Guardrails',
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      id: 'reports',
      title: 'Compliance Reports',
      description: 'Export audit-ready governance summaries, policy adherence graphs, and executive retrospectives.',
      icon: FileText,
      badge: 'Intelligence',
      color: 'from-amber-500/10 to-orange-500/10 border-amber-500/30 text-amber-400',
    },
    {
      id: 'history',
      title: 'Review History',
      description: 'Searchable audit trail of verified content, decisions, model rationales, and human-in-the-loop overrides.',
      icon: History,
      badge: 'Traceability',
      color: 'from-indigo-500/10 to-cyan-500/10 border-indigo-500/30 text-cyan-400',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20 text-center">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-brand-600/20 via-indigo-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-medium text-brand-300">
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            <span>Autonomous Brand Governance & Compliance</span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-slate-400 font-semibold">Team WINFUTURE_27</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Protect and Scale Your Brand with <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-indigo-100 bg-clip-text text-transparent">TruVanta AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The intelligent governance layer that unites brand guideline ingestion, generative content studio, automated verification, and audit-ready reporting.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTab('studio')}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition shadow-lg shadow-brand-600/25 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch AI Content Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('verification')}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Run Content Verification</span>
            </button>
          </div>
        </div>
      </section>

      {/* Backend Health Check Card (Verification requirement) */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-xl ${isHealthy ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Full-Stack Connectivity Status</h3>
                <p className="text-xs text-slate-400">Verifying live frontend-to-backend communication with FastAPI</p>
              </div>
            </div>

            <button
              onClick={onRefreshHealth}
              disabled={isLoadingHealth}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center space-x-2 cursor-pointer"
            >
              <span>{isLoadingHealth ? 'Testing connection...' : 'Test GET /health API'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">Status</span>
              <div className="flex items-center space-x-2">
                {isHealthy ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-400">HEALTHY (200 OK)</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span className="text-sm font-semibold text-rose-400">OFFLINE / ERROR</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">Backend Service</span>
              <span className="text-sm font-semibold text-slate-200">
                {healthStatus?.data?.service || 'FastAPI Server'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">Response Latency</span>
              <span className="text-sm font-semibold text-slate-200">
                {healthStatus?.latency ? `${healthStatus.latency} ms` : '—'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block mb-1">Endpoint Tested</span>
              <code className="text-xs text-brand-300 font-mono">GET /health</code>
            </div>
          </div>

          {healthStatus?.data?.timestamp && (
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
              <span>Server UTC Timestamp: <span className="font-mono text-slate-400">{healthStatus.data.timestamp}</span></span>
              <span>Team: <span className="text-slate-300 font-semibold">{healthStatus.data.team || 'WINFUTURE_27'}</span></span>
            </div>
          )}

          {!isHealthy && healthStatus?.error && (
            <div className="mt-3 p-3 rounded-lg bg-rose-950/40 border border-rose-900/60 text-xs text-rose-300">
              <strong>Connection Error:</strong> {healthStatus.error}
            </div>
          )}
        </div>
      </section>

      {/* Platform Pillars / Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Enterprise Governance Architecture</h2>
          <p className="text-sm text-slate-400">Everything needed to ensure generative speed never compromises brand reputation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => setActiveTab(mod.id)}
                className="group relative p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${mod.color} border`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {mod.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-brand-300 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-brand-300">
                  <span>Open Module</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
