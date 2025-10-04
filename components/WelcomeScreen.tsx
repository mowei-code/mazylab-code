import React from 'react';

interface WelcomeScreenProps {
  onSignUpClick: () => void;
  onLoginClick: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSignUpClick, onLoginClick }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-4 -mt-16">
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-6 sm:p-10 max-w-2xl w-full">
        <div className="relative w-48 h-32 mx-auto mb-6">
          <div className="absolute inset-0 bg-orange-200 rounded-lg transform -rotate-6"></div>
          <div className="absolute inset-0 bg-rose-200 rounded-lg transform rotate-6"></div>
          <div className="relative bg-white rounded-lg h-full w-full flex items-center justify-center shadow-md">
            <div className="w-20 h-24 bg-orange-400 rounded-lg flex items-end overflow-hidden">
                <div className="w-full h-1/3 bg-rose-500 rounded-t-lg"></div>
            </div>
            <div className="absolute top-4 right-4 w-4 h-12 bg-gray-300 rounded-r-full"></div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Start building your website with AI</h1>
        <p className="text-slate-400 max-w-xl mx-auto mb-8">
          Describe your website in natural language and let AI generate it for you. Sign up or log in to get started.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onSignUpClick}
            className="w-full sm:w-auto bg-blue-600 text-white font-semibold rounded-lg px-8 py-3 hover:bg-blue-500 transition-colors text-lg"
          >
            Sign Up
          </button>
          <button
            onClick={onLoginClick}
            className="w-full sm:w-auto bg-slate-700 text-white font-semibold rounded-lg px-8 py-3 hover:bg-slate-600 transition-colors text-lg"
          >
            Log In
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};
