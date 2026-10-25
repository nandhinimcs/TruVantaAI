import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Wand2, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  AlertCircle, 
  FileCheck2, 
  Sliders, 
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { generateContent, getBrandInfo } from '../services/api';

const CONTENT_TYPES = [
  'Instagram Ad',
  'Social Media Caption',
  'Product Description',
  'Promotional Email',
];

const TONES = [
  'Professional, friendly, and trustworthy (Brand Default)',
  'Warm, approachable, and conversational',
  'Educational, calming, and skin-first',
  'Modern, crisp, and minimalist',
];

export default function ContentStudio({ onVerifyContent }) {
  const [selectedBrand, setSelectedBrand] = useState('Lumina Skincare');
  const [selectedProduct, setSelectedProduct] = useState('Lumina Gentle Face Cleanser');
  const [contentType, setContentType] = useState('Instagram Ad');
  const [audience, setAudience] = useState('Skincare enthusiasts looking for gentle daily balance');
  const [tone, setTone] = useState(TONES[0]);

  // Generation state
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationMeta, setGenerationMeta] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Brand data loaded from backend
  const [brandData, setBrandData] = useState(null);

  useEffect(() => {
    async function loadBrand() {
      const res = await getBrandInfo();
      if (res.success && res.data) {
        setBrandData(res.data);
      }
    }
    loadBrand();
  }, []);

  const handleGenerate = async () => {
    if (!audience.trim()) {
      setErrorMessage('Please specify a target audience.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage('');

    try {
      const res = await generateContent({
        brand: selectedBrand,
        product: selectedProduct,
        contentType,
        audience: audience.trim(),
        tone,
      });

      if (res.success && res.data?.generated_content) {
        setGeneratedText(res.data.generated_content);
        setGenerationMeta(res.data);
      } else {
        setErrorMessage(res.error || 'Failed to generate content. Please check server configuration.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'An unexpected error occurred during generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedText) return;
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const handleVerify = () => {
    if (!generatedText.trim()) return;
    if (onVerifyContent) {
      onVerifyContent(generatedText);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Generative AI Workspace</span>
        </div>
        <h1 className="text-3xl font-bold text-white mt-1">AI Content Studio</h1>
        <p className="text-sm text-slate-400 mt-1">
          Synthesize high-converting marketing campaigns adhering strictly to pre-approved brand facts and restricted claim guardrails.
        </p>
      </div>

      {/* Brand Governance Notice / Demo Brand Banner */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start md:items-center space-x-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex-shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-slate-200">Demo Brand: {selectedBrand}</span>
            <span className="text-slate-400 block md:inline md:ml-2">
              (Fictional demo data configured in <code className="text-brand-300 font-mono">backend/data/demo_brand.json</code>)
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Guardrails Active: Unapproved claims blocked</span>
        </div>
      </div>

      {/* Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Controls (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-sm font-semibold text-white flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-brand-400" />
                <span>Campaign Parameters</span>
              </span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                Gemini Powered
              </span>
            </div>

            {/* Brand Selection */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Brand Selection
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              >
                <option value="Lumina Skincare">Lumina Skincare (Demo)</option>
              </select>
            </div>

            {/* Product Selection */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Product Selection
              </label>
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              >
                <option value="Lumina Gentle Face Cleanser">Lumina Gentle Face Cleanser (Cleanser)</option>
              </select>
            </div>

            {/* Content Type */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Content Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {CONTENT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setContentType(type)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition border ${
                      contentType === type
                        ? 'bg-brand-600/20 text-brand-300 border-brand-500/40'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Target Audience <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. Young adults with sensitive skin seeking daily balance"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500 placeholder-slate-600"
              />
            </div>

            {/* Tone Selection */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Brand Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
              >
                {TONES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Approved Fact Capsule */}
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-[11px]">
              <span className="font-semibold text-slate-300 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Approved Benefit:</span>
              </span>
              <p className="text-slate-400 italic pl-5">
                "Removes everyday dirt and excess oil"
              </p>
              
              <span className="font-semibold text-slate-300 flex items-center space-x-1.5 pt-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Restricted Claims (Enforced Block):</span>
              </span>
              <p className="text-slate-500 text-[10px] pl-5">
                Cures acne, guaranteed results, instant whitening, clinically proven without evidence.
              </p>
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !audience.trim()}
              className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition shadow-lg shadow-brand-600/20 flex items-center justify-center space-x-2 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Synthesizing with Gemini...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-white" />
                  <span>Generate Content</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Generated Output & Actions (7 columns) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex-1 flex flex-col justify-between space-y-4">
            
            {/* Output Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-white">Generated Marketing Asset</span>
                {generationMeta?.model_used && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    {generationMeta.model_used}
                  </span>
                )}
              </div>

              {generatedText && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopy}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition flex items-center space-x-1.5 cursor-pointer"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Content'}</span>
                  </button>

                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 text-xs font-medium transition flex items-center space-x-1.5 cursor-pointer"
                    title="Regenerate content"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>Regenerate</span>
                  </button>
                </div>
              )}
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 text-xs text-rose-300 space-y-2">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-rose-200">Generation Notice:</strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>
                {errorMessage.includes('GEMINI_API_KEY') && (
                  <div className="pl-6 text-[11px] text-rose-400">
                    To enable live Gemini generation, open <code className="text-rose-200 bg-rose-950 px-1 py-0.5 rounded">backend/.env</code> and add:
                    <pre className="mt-1 p-2 bg-slate-950 text-slate-300 rounded font-mono text-[10px]">GEMINI_API_KEY=your_actual_key_here</pre>
                    Then restart the backend service.
                  </div>
                )}
              </div>
            )}

            {/* Content Area */}
            <div className="flex-1 min-h-[340px] flex flex-col">
              {isGenerating ? (
                <div className="flex-1 flex flex-col items-center justify-center p-12 rounded-xl bg-slate-950/60 border border-slate-800 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 animate-spin text-brand-400" />
                  <p className="text-sm font-medium text-slate-200">Querying Google Gemini API...</p>
                  <p className="text-xs text-slate-500 max-w-sm">
                    Enforcing brand voice and grounding claims to pre-approved benefits only.
                  </p>
                </div>
              ) : generatedText ? (
                <div className="flex-1 flex flex-col space-y-2">
                  <label className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                    <span>Editable Copy (Feel free to tweak before verification):</span>
                    <span className="text-[10px] text-slate-500">{generatedText.length} characters</span>
                  </label>
                  <textarea
                    value={generatedText}
                    onChange={(e) => setGeneratedText(e.target.value)}
                    rows={14}
                    className="w-full flex-1 p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-brand-500/60 leading-relaxed font-sans resize-y"
                  />
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-12 rounded-xl bg-slate-950/40 border border-dashed border-slate-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-300">Ready to Generate</h3>
                  <p className="text-xs text-slate-500 max-w-sm">
                    Configure your parameters on the left and click <strong>Generate Content</strong> to produce brand-compliant marketing copy with Gemini.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions: Verify Content Transfer Button */}
            <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                {generatedText ? 'Ready for compliance verification' : 'Generated text can be audited directly in Content Verification'}
              </span>

              <button
                onClick={handleVerify}
                disabled={!generatedText.trim()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold transition flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-emerald-950"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Verify Content</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
