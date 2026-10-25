import React from 'react';
import { ShieldCheck, Heart, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-brand-400" />
          <span className="font-semibold text-slate-400">TruVanta AI</span>
          <span>&copy; {new Date().getFullYear()}</span>
          <span>&bull;</span>
          <span>Team <strong className="text-slate-300">WINFUTURE_27</strong></span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">FastAPI</span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">React + Vite</span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">Tailwind CSS</span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">Gemini Ready</span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">Supabase Ready</span>
        </div>

        <div className="flex items-center space-x-1 text-slate-500">
          <Terminal className="w-3.5 h-3.5 mr-1" />
          <span>Stage: Step 1 Project Setup</span>
        </div>
      </div>
    </footer>
  );
}
