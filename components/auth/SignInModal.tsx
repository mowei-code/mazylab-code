import React, { useState } from 'react';
import { CloseIcon, GoogleIcon, AppleIconPlain } from '../icons/Icons';

interface SignInModalProps {
  onClose: () => void;
  onLogin: (email: string) => void;
  onSwitchToSignUp: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ onClose, onLogin, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
       onLogin(email);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-full max-w-md p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <CloseIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-center text-white mb-6">Sign In</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            <input type="email" placeholder="Email (use 'admin@example.com' for admin)" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400" required />
            <input type="password" placeholder="Password (use 'admin' for admin)" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400" required />
          </div>
          <div className="text-right mt-3">
              <a href="#" className="text-sm text-blue-400 hover:underline">Forgot Password?</a>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold rounded-lg py-3 mt-4 hover:bg-blue-500">
            Sign In
          </button>
        </form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-600"></span></div>
          <div className="relative flex justify-center text-sm"><span className="bg-slate-800 px-2 text-slate-400">Or sign in with</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center w-full bg-slate-700 text-white font-semibold rounded-lg py-3 hover:bg-slate-600"><GoogleIcon className="h-5 w-5 mr-2" /> Google</button>
          <button className="flex items-center justify-center w-full bg-slate-700 text-white font-semibold rounded-lg py-3 hover:bg-slate-600"><AppleIconPlain className="h-5 w-5 mr-2" /> Apple</button>
        </div>
        <p className="text-sm text-center text-slate-400 mt-6">
            Don't have an account?{' '}
            <button onClick={onSwitchToSignUp} className="font-medium text-blue-400 hover:underline">
                Sign Up
            </button>
        </p>
      </div>
    </div>
  );
};
