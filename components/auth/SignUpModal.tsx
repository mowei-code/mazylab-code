import React, { useState } from 'react';
import { CloseIcon, GoogleIcon, AppleIconPlain } from '../icons/Icons';

interface SignUpModalProps {
  onClose: () => void;
  onSignUp: (email: string) => void;
  onSwitchToSignIn: () => void;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({ onClose, onSignUp, onSwitchToSignIn }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && password === confirmPassword) {
       onSignUp(email); // In a real app, you'd use all fields
    }
    // Add password mismatch handling later
  };
  
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-full max-w-md p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <CloseIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-center text-white mb-6">Create an Account</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400" required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400" required />
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold rounded-lg py-3 mt-6 hover:bg-blue-500">
            Sign Up
          </button>
        </form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-600"></span></div>
          <div className="relative flex justify-center text-sm"><span className="bg-slate-800 px-2 text-slate-400">Or sign up with</span></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center w-full bg-slate-700 text-white font-semibold rounded-lg py-3 hover:bg-slate-600"><GoogleIcon className="h-5 w-5 mr-2" /> Google</button>
          <button className="flex items-center justify-center w-full bg-slate-700 text-white font-semibold rounded-lg py-3 hover:bg-slate-600"><AppleIconPlain className="h-5 w-5 mr-2" /> Apple</button>
        </div>
         <p className="text-sm text-center text-slate-400 mt-6">
            Already have an account?{' '}
            <button onClick={onSwitchToSignIn} className="font-medium text-blue-400 hover:underline">
                Sign In
            </button>
        </p>
      </div>
    </div>
  );
};
