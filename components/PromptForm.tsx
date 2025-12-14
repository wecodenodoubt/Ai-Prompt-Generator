import React from 'react';
import { UseCase, Tone, Platform, PromptRequest } from '../types';

interface PromptFormProps {
  formData: PromptRequest;
  setFormData: React.Dispatch<React.SetStateAction<PromptRequest>>;
  onGenerate: () => void;
  isLoading: boolean;
}

export const PromptForm: React.FC<PromptFormProps> = ({ formData, setFormData, onGenerate, isLoading }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border transition-all duration-500 mb-8 ${isLoading ? 'border-blue-200 ring-4 ring-blue-50' : 'border-slate-200'}`}>
      
      {/* Input Group - Fades out slightly during loading */}
      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Use Case Dropdown */}
          <div className="flex flex-col gap-2">
            <label htmlFor="useCase" className="text-sm font-semibold text-slate-700">
              1. I need help with...
            </label>
            <div className="relative">
              <select
                id="useCase"
                name="useCase"
                value={formData.useCase}
                onChange={handleChange}
                className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 pr-8"
              >
                {Object.values(UseCase).map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          {/* Tone Dropdown */}
          <div className="flex flex-col gap-2">
            <label htmlFor="tone" className="text-sm font-semibold text-slate-700">
              2. I want the tone to be...
            </label>
            <div className="relative">
              <select
                id="tone"
                name="tone"
                value={formData.tone}
                onChange={handleChange}
                className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 pr-8"
              >
                {Object.values(Tone).map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
              {/* Custom Tone Input - Shown only when Tone is set to Custom */}
              {formData.tone === Tone.CUSTOM && (
                <input
                  type="text"
                  name="customTone"
                  value={formData.customTone || ''}
                  onChange={handleChange}
                  placeholder="e.g. Sarcastic, Witty, Empathetic"
                  className="mt-2 w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                  autoFocus
                />
              )}
            </div>
          </div>

          {/* Platform Dropdown */}
          <div className="flex flex-col gap-2">
            <label htmlFor="platform" className="text-sm font-semibold text-slate-700">
               3. I am using...
            </label>
            <div className="relative">
              <select
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 pr-8"
              >
                {Object.values(Platform).map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Optional Topic Input */}
        <div className="flex flex-col gap-2 mb-6">
          <label htmlFor="topic" className="text-sm font-semibold text-slate-700">
            4. Specific Topic (Optional)
          </label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic || ''}
            onChange={handleChange}
            placeholder="e.g. How to train a puppy, Python interview questions..."
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className={`w-full relative flex items-center justify-center gap-2 text-white font-bold rounded-lg text-lg px-5 py-3.5 focus:outline-none transition-all duration-300 shadow-md
            ${isLoading 
              ? 'bg-blue-500 cursor-wait shadow-inner opacity-90' 
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Creating your prompt...</span>
            </>
          ) : (
            'Generate My Prompt'
          )}
        </button>
      </div>
    </div>
  );
};