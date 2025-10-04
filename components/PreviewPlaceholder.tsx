import React from 'react';

export const PreviewPlaceholder: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center p-8 bg-slate-800/50">
      <div className="bg-slate-900/50 p-6 rounded-full border-2 border-dashed border-slate-700 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c.251.023.501.05.75.082a9.75 9.75 0 018.25 8.25c.032.249.059.5.082.75m0 0H21m-2.25 0c.023.25.05.501.082.75a9.75 9.75 0 01-8.25 8.25c-.249.032-.5.059-.75.082m0 0v-5.714a2.25 2.25 0 00-.659-1.591L14.5 9.75M3.104 9.75h5.714c.921 0 1.763.444 2.25 1.154l.271.401M3.104 9.75c-.023-.25-.05-.501-.082-.75a9.75 9.75 0 018.25-8.25c.249-.032.5-.059.75-.082m0 0V3m-2.25 0c-.023-.25-.05-.501-.082-.75a9.75 9.75 0 00-8.25-8.25c-.249-.032-.5-.059-.75-.082m0 0H3m2.25 0c-.023.25-.05.501-.082.75a9.75 9.75 0 008.25 8.25c.249.032.5.059.75.082" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white mt-2">Your Website Preview Will Appear Here</h3>
      <p className="text-slate-400 mt-2 max-w-sm">
        Just describe the website you want to build in the text box above, and our AI will generate a live preview for you instantly.
      </p>
    </div>
  );
};

export default PreviewPlaceholder;