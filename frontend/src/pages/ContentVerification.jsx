import React, { useState, useEffect } from 'react';
import { FileCheck2, Upload, AlertCircle, CheckCircle, ShieldAlert, FileText, Sparkles } from 'lucide-react';

export default function ContentVerification({ initialContent = '', onContentChange }) {
  const [draftText, setDraftText] = useState(initialContent);

  useEffect(() => {
    if (initialContent) {
      setDraftText(initialContent);
    }
  }, [initialContent]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setDraftText(value);
    if (onContentChange) {
      onContentChange(value);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
          <FileCheck2 className="w-4 h-4" />
          <span>Automated Compliance Engine</span>
        </div>
        <h1 className="text-3xl font-bold text-white mt-1">Content Verification</h1>
        <p className="text-sm text-slate-400 mt-1">
          Verify marketing copy, campaign drafts, and assets against brand books ingested via PyMuPDF.
        </p>
      </div>

      {initialContent && (
        <div className="p-4 rounded-xl bg-brand-950/40 border border-brand-500/30 flex items-center space-x-3 text-xs text-brand-300">
          <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0" />
          <span>
            <strong>Content Transferred:</strong> Marketing asset received from AI Content Studio and populated below for verification.
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <h2 className="text-base font-semibold text-white flex items-center space-x-2">
            <Upload className="w-4 h-4 text-brand-400" />
            <span>Submit Content for Review</span>
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Draft Copy / Text Payload</label>
              <textarea
                rows={8}
                value={draftText}
                onChange={handleTextChange}
                placeholder="Paste marketing copy or narrative to evaluate against brand voice, trademark rules, and prohibited terms..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-500/50 resize-y font-mono leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Attach Brand Guide (PDF)</label>
              <div className="p-6 border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/40 text-center space-y-2">
                <FileText className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-xs text-slate-400">
                  PyMuPDF extraction engine ready for configuration.
                </p>
                <span className="text-[10px] text-slate-500 block">Brand guidelines PDF (up to 25MB)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Report Scaffold */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <h2 className="text-base font-semibold text-white flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <span>Verification Scorecard</span>
          </h2>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Tone & Voice Alignment</span>
                <span className="text-sm font-semibold text-slate-200">Awaiting Ingestion</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-400">Standby</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Trademark & Terminology Rules</span>
                <span className="text-sm font-semibold text-slate-200">Ready to audit</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-400">Standby</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Regulatory & Safety Boundaries</span>
                <span className="text-sm font-semibold text-slate-200">Ready to audit</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-400">Standby</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
