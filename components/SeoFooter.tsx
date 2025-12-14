import React from 'react';

export const SeoFooter: React.FC = () => {
  return (
    <div className="mt-16 border-t border-slate-200 pt-10 text-slate-600">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">Why use this Free AI Prompt Generator?</h2>
      <div className="prose prose-slate max-w-none text-sm">
        <p className="mb-4">
          Welcome to the <strong>ChatGPT Prompt Generator for Beginners</strong>. Writing the perfect prompt for Artificial Intelligence can be tricky. 
          If you don't know where to start, our free tool helps you craft structured, high-quality prompts instantly.
        </p>
        
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Features of our Prompt Tool:</h3>
        <ul className="list-disc pl-5 mb-4 space-y-1">
          <li><strong>No Login Required:</strong> Generate prompts instantly without signing up.</li>
          <li><strong>Optimized for Multiple Platforms:</strong> Works for ChatGPT, Google Gemini, and Anthropic Claude.</li>
          <li><strong>Beginner Friendly:</strong> No complex jargon, just simple dropdowns to get what you need.</li>
          <li><strong>Instant Explanation:</strong> Unlike other tools, we explain <em>why</em> the prompt works and <em>how</em> to use it.</li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-800 mb-2">How to create the best AI Prompts:</h3>
        <p>
          To get the best results from AI, be specific. Select your <strong>Use Case</strong> (like Blog Writing or Study Help), 
          choose a <strong>Tone</strong> (Professional or Friendly), and pick your <strong>Platform</strong>. 
          Click "Generate My Prompt" and copy the result directly into your AI chat interface.
        </p>
      </div>
      
      <div className="mt-8 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} AI Prompt Generator. Designed for speed and simplicity.
      </div>
    </div>
  );
};