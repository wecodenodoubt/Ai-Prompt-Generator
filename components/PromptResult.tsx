import React, { useState, useEffect } from 'react';
import { GeneratedPromptData } from '../types';

interface PromptResultProps {
  data: GeneratedPromptData | null;
  elementRef?: React.RefObject<HTMLDivElement>;
}

export const PromptResult: React.FC<PromptResultProps> = ({ data, elementRef }) => {
  const [copied, setCopied] = useState(false);

  // Reset copy state when data changes
  useEffect(() => {
    setCopied(false);
  }, [data]);

  const handleCopy = () => {
    if (data?.promptText) {
      navigator.clipboard.writeText(data.promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareTwitter = () => {
    if (!data) return;
    // Truncate prompt to leave room for URL and hashtags (Twitter limit 280)
    const promptSnippet = data.promptText.length > 180 
      ? data.promptText.substring(0, 180) + '...' 
      : data.promptText;
      
    const text = encodeURIComponent(`⚡ I just generated a custom AI prompt for free!\n\n"${promptSnippet}"\n\nTry it out here:`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=AIPrompt,ChatGPT`, '_blank');
  };

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  if (!data) return null;

  return (
    <div ref={elementRef} className="animate-fade-in space-y-6">
      
      {/* Main Output Area */}
      <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 overflow-hidden">
        <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex justify-between items-center">
          <h2 className="text-blue-900 font-bold text-lg">Your Custom Prompt</h2>
          <button
            onClick={handleCopy}
            className={`text-sm font-semibold py-1.5 px-4 rounded-full transition-colors ${
              copied 
              ? 'bg-green-100 text-green-700 border border-green-200' 
              : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
            }`}
          >
            {copied ? '✓ Copied!' : 'Copy Prompt'}
          </button>
        </div>
        <div className="p-6">
          <textarea
            readOnly
            value={data.promptText}
            className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono text-sm leading-relaxed focus:outline-none resize-none"
          />

          {/* Social Share Buttons */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
             <span className="text-sm text-slate-500 font-medium">Share this tool:</span>
             <div className="flex gap-3 w-full sm:w-auto">
                <button 
                  onClick={handleShareTwitter}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Post</span>
                </button>
                <button 
                  onClick={handleShareFacebook}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#1877F2] text-white text-sm font-medium rounded-lg hover:bg-[#166fe5] transition-colors"
                  aria-label="Share on Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                     <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.648 0-2.928 1.67-2.928 3.403v1.518h3.949l-1.006 3.676h-2.943v7.98c-4.9-.765-4.9-.765-4.887 0z"/>
                  </svg>
                  <span>Share</span>
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Explanation Cards - Fixing the "OpenPrompt" weakness by explaining the prompt */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-2">What it does</h3>
          <p className="text-slate-800 text-sm leading-snug">{data.explanation}</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-2">How to use it</h3>
          <p className="text-slate-800 text-sm leading-snug">{data.howToUse}</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
          <h3 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-2">Expected Result</h3>
          <p className="text-slate-800 text-sm leading-snug">{data.expectedResult}</p>
        </div>
      </div>
    </div>
  );
};