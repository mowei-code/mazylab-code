import React from 'react';
import { UserCircleIcon, LogoutIcon, DocumentIcon, SettingsIcon, MazyLabLogoIcon } from './icons/Icons';
import { Tooltip } from './Tooltip';

interface HeaderProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
  onNewProject: () => void;
  onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, isAdmin, onLoginClick, onLogout, onNewProject, onSettingsClick }) => {
  return (
    <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center space-x-3">
        <MazyLabLogoIcon className="h-8 w-8" />
        <h1 className="text-xl font-bold text-white">MAZYLAB</h1>
        {isLoggedIn && isAdmin && (
          <span className="bg-yellow-500/20 text-yellow-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">Admin</span>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <Tooltip text="New Project">
               <button onClick={onNewProject} className="text-slate-400 hover:text-white">
                 <DocumentIcon className="h-6 w-6" />
               </button>
            </Tooltip>
            <Tooltip text="Settings">
               <button onClick={onSettingsClick} className="text-slate-400 hover:text-white">
                 <SettingsIcon className="h-6 w-6" />
               </button>
            </Tooltip>
            <Tooltip text="Account">
               <button className="text-slate-400 hover:text-white">
                 <UserCircleIcon className="h-7 w-7" />
               </button>
            </Tooltip>
            <Tooltip text="Logout">
              <button onClick={onLogout} className="text-slate-400 hover:text-white">
                <LogoutIcon className="h-6 w-6" />
              </button>
            </Tooltip>
          </>
        ) : (
          <button 
            onClick={onLoginClick}
            className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-500 transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;