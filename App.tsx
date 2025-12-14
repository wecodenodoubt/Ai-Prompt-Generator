import React, { useState, useRef } from 'react';
import { PromptForm } from './components/PromptForm';
import { PromptResult } from './components/PromptResult';
import { SeoFooter } from './components/SeoFooter';
import { UseCase, Tone, Platform, PromptRequest, GeneratedPromptData } from './types';
import { generateAiPrompt } from './services/geminiService';

const App: React.FC = () => {
  const [formData, setFormData] = useState<PromptRequest>({
    useCase: UseCase.BLOG_WRITING,
    tone: Tone.PROFESSIONAL,
    platform: Platform.CHATGPT,
    topic: '',
    customTone: '',
  });

  const [result, setResult] = useState<GeneratedPromptData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setResult(null); // Clear previous result while loading
    
    try {
      const data = await generateAiPrompt(formData);
      setResult(data);
      
      // Smooth scroll to result on mobile after a short delay for rendering
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      console.error("Failed to generate prompt", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          ChatGPT Prompt Generator <span className="text-blue-600 block md:inline">for Beginners</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-xl mx-auto">
          Struggling to get good answers from AI? Create custom, high-quality prompts instantly. No login required.
        </p>
      </header>

      {/* Main Interface */}
      <main>
        <PromptForm 
          formData={formData} 
          setFormData={setFormData} 
          onGenerate={handleGenerate} 
          isLoading={isLoading} 
        />
        
        <PromptResult 
          data={result} 
          elementRef={resultRef} 
        />
      </main>

      {/* SEO Footer Content */}
      <SeoFooter />
    </div>
  );
};

export default App;