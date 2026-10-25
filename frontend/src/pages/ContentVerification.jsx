import React, { useState, useEffect } from 'react';
import { 
  FileCheck2, 
  Upload, 
  AlertCircle, 
  CheckCircle, 
  ShieldAlert, 
  FileText, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { verifyContent } from '../services/api';

export default function ContentVerification({ initialContent = '', onContentChange }) {
  const [draftText, setDraftText] = useState(initialContent);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleRunVerification = async () => {
    if (!draftText.trim()) {
      setErrorMessage('Please enter or paste content to verify.');
      return;
    }

    setIsVerifying(true);
    setErrorMessage('');

    try {
      const res = await verifyContent({
        content: draftText.trim(),
        product: 'Lumina Gentle Face Cleanser',
        brand: 'Lumina Skincare',
      });

      if (res.success && res.data) {
        setVerificationResult(res.data);
      } else {
        setErrorMessage(res.error || 'Failed to complete verification. Please check backend connection.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred while running verification.');
    } finally {
      setIsVerifying(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Compliant':
      case 'APPROVED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Compliant</span>
          </span>
        );
      case 'Review Needed':
      case 'Action Required':
      case 'REQUIRES_REVIEW':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{status === 'Action Required' ? 'Action Required' : 'Review Needed'}</span>
          </span>
        );
      case 'Violation Detected':
      case 'Non-Compliant':
      case 'NON_COMPLIANT':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
            <XCircle className="w-3.5 h-3.5" />
            <span>Violation Detected</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-xs">
            Standby
          </span>
        );
    }
  };

  const metrics = verificationResult?.metrics;

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

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 text-xs text-rose-300 flex items-center space-x-3">
          <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white flex items-center space-x-2">
              <Upload className="w-4 h-4 text-brand-400" />
              <span>Submit Content for Review</span>
            </h2>
            <span className="text-[11px] text-slate-500 font-mono">
              {draftText.length} characters
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Draft Copy / Text Payload</label>
              <textarea
                rows={9}
                value={draftText}
                onChange={handleTextChange}
                placeholder="Paste marketing copy or narrative to evaluate against brand voice, trademark rules, and prohibited terms..."
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-brand-500/50 resize-y font-sans leading-relaxed text-xs"
              />
            </div>

            {/* Run Verification Button */}
            <button
              onClick={handleRunVerification}
              disabled={isVerifying || !draftText.trim()}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition shadow-lg shadow-emerald-950 flex items-center justify-center space-x-2 cursor-pointer"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Auditing Content against Guidelines...</span>
                </>
              ) : (
                <>
                  <FileCheck2 className="w-4 h-4 text-white" />
                  <span>Run Verification</span>
                </>
              )}
            </button>

            {/* Brand Guide Attachment (Preserved) */}
            <div className="pt-2">
              <label className="block text-slate-300 font-medium mb-1.5">Attach Brand Guide (PDF)</label>
              <div className="p-5 border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/40 text-center space-y-1.5">
                <FileText className="w-7 h-7 text-slate-500 mx-auto" />
                <p className="text-xs text-slate-400">
                  PyMuPDF extraction engine ready for configuration.
                </p>
                <span className="text-[10px] text-slate-500 block">Brand guidelines PDF (up to 25MB)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Report Scaffold & Real Scorecard */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-base font-semibold text-white flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <span>Verification Scorecard</span>
              </h2>
              {verificationResult && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">Overall:</span>
                  <span className="text-base font-bold text-white">
                    {verificationResult.overall_score}/100
                  </span>
                  {getStatusBadge(verificationResult.overall_status)}
                </div>
              )}
            </div>

            {/* Scorecard Metrics Rows */}
            <div className="space-y-3">
              {/* 1. Tone & Voice Alignment */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-300 font-medium">Tone & Voice Alignment</span>
                    {metrics && (
                      <span className="text-[11px] font-mono font-semibold text-slate-400">
                        ({metrics.tone_and_voice.score}/100)
                      </span>
                    )}
                  </div>
                  {metrics ? getStatusBadge(metrics.tone_and_voice.status) : (
                    <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-400">Standby</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  {metrics ? metrics.tone_and_voice.feedback : 'Awaiting Ingestion & Audit'}
                </p>
              </div>

              {/* 2. Trademark & Terminology Rules */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-300 font-medium">Trademark & Terminology Rules</span>
                    {metrics && (
                      <span className="text-[11px] font-mono font-semibold text-slate-400">
                        ({metrics.trademark_and_terminology.score}/100)
                      </span>
                    )}
                  </div>
                  {metrics ? getStatusBadge(metrics.trademark_and_terminology.status) : (
                    <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-400">Standby</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  {metrics ? metrics.trademark_and_terminology.feedback : 'Ready to audit against prohibited brand terms'}
                </p>
              </div>

              {/* 3. Regulatory & Safety Boundaries */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-300 font-medium">Regulatory & Safety Boundaries</span>
                    {metrics && (
                      <span className="text-[11px] font-mono font-semibold text-slate-400">
                        ({metrics.regulatory_and_safety.score}/100)
                      </span>
                    )}
                  </div>
                  {metrics ? getStatusBadge(metrics.regulatory_and_safety.status) : (
                    <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-400">Standby</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  {metrics ? metrics.regulatory_and_safety.feedback : 'Ready to audit against medical and unbacked claims'}
                </p>
              </div>
            </div>

            {/* Findings Ledger if results exist */}
            {verificationResult?.findings && verificationResult.findings.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
                  Actionable Audit Findings ({verificationResult.findings.length})
                </span>
                <div className="space-y-2">
                  {verificationResult.findings.map((f, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs">
                      {f.severity === 'HIGH' ? (
                        <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      ) : f.severity === 'MEDIUM' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <strong className="text-slate-200">{f.rule}:</strong>
                        <span className="text-slate-400 ml-1.5">{f.recommendation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>Evaluated against: <strong className="text-slate-400">Lumina Skincare Brand Book</strong></span>
            <span>Policy Version: 1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
