import React from 'react';
import CodePreview from './CodePreview';
import PreviewPlaceholder from './PreviewPlaceholder';
import { Tooltip } from './Tooltip';
import { DocumentIcon, PaperAirplaneIcon } from './icons/Icons';
import { HistoryItem } from '../types';

interface UserWorkspaceProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  handleGenerate: () => void;
  isLoading: boolean;
  error: string;
  generatedCode: string;
  codeLanguage: string;
  history: HistoryItem[];
  activeHistoryId: number | null;
  setActiveHistoryId: (id: number | null) => void;
  handleHistoryItemClick: (item: HistoryItem) => void;
}

export const UserWorkspace: React.FC<UserWorkspaceProps> = ({
  prompt,
  setPrompt,
  handleGenerate,
  isLoading,
  error,
  generatedCode,
  codeLanguage,
  history,
  activeHistoryId,
  setActiveHistoryId,
  handleHistoryItemClick,
}) => {
  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="w-full relative">
        <textarea
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            if (activeHistoryId !== null) {
              setActiveHistoryId(null);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleGenerate();
            }
          }}
          placeholder="Describe your website, iOS, or Android component idea..."
          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 pr-16 text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition-colors"
          rows={2}
          disabled={isLoading}
        />
        <Tooltip text="Generate Code">
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </Tooltip>
      </div>
      <button 
        onClick={handleGenerate}
        disabled={isLoading}
        className="mt-4 w-full bg-blue-600 text-white font-semibold rounded-lg px-5 py-3 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Generating...' : 'Generate Code'}
      </button>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-white mb-4">Preview</h2>
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
          {isLoading && (
            <div className="h-full flex flex-col justify-center items-center text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
              <h3 className="text-lg font-bold text-white">Generating your code...</h3>
              <p className="text-slate-400 mt-1">This may take a few moments. Please wait.</p>
            </div>
          )}
          {!isLoading && error && (
            <div className="h-full flex flex-col justify-center items-center text-center p-4">
               <h3 className="text-lg font-bold text-red-400">An Error Occurred</h3>
               <p className="text-slate-400 mt-1 bg-slate-900 p-3 rounded-md">{error}</p>
            </div>
          )}
          {!isLoading && !error && !generatedCode && <PreviewPlaceholder />}
          {!isLoading && !error && generatedCode && <CodePreview code={generatedCode} language={codeLanguage} />}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-white mb-4">History</h2>
          <ul className="space-y-3">
            {history.map((item) => (
               <li 
                key={item.id} 
                onClick={() => handleHistoryItemClick(item)}
                className={`border rounded-lg p-4 flex items-center justify-between transition-all duration-200 cursor-pointer ${
                    item.id === activeHistoryId 
                    ? 'bg-slate-700/60 border-blue-500 ring-2 ring-blue-500/30' 
                    : 'bg-slate-800 border-slate-700 hover:bg-slate-700/50'
                }`}
               >
                 <div className="flex items-center">
                    <DocumentIcon className="h-8 w-8 text-slate-500 mr-4" />
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-slate-400">Generated on {item.date}</p>
                    </div>
                 </div>
               </li>
            ))}
          </ul>
      </section>
    </main>
  );
};
