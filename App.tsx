import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { generateWebsiteCode } from './services/geminiService';
import { CloseIcon } from './components/icons/Icons';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SignInModal } from './components/auth/SignInModal';
import { SignUpModal } from './components/auth/SignUpModal';
import { UserWorkspace } from './components/UserWorkspace';
import { HistoryItem } from './types';

type AuthView = 'signIn' | 'signUp' | null;

const initialHistory: HistoryItem[] = [
  {
    id: 1,
    title: 'My Portfolio Website',
    date: '2024-01-15',
    prompt: 'A simple, clean portfolio website for a photographer named Jane Doe. It should have a header with her name, a gallery section with placeholder images, and a contact section.',
    generatedCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jane Doe - Photography</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; background-color: #1a1a1a; color: #f0f0f0; }
        header { background-color: #2c2c2c; color: white; padding: 2rem; text-align: center; }
        header h1 { margin: 0; font-size: 2.5rem; }
        .container { max-width: 1200px; margin: 2rem auto; padding: 0 1rem; }
        .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; }
        .gallery img { width: 100%; height: 250px; object-fit: cover; border-radius: 8px; transition: transform 0.3s ease; }
        .gallery img:hover { transform: scale(1.05); }
        h2 { border-bottom: 2px solid #3B82F6; padding-bottom: 0.5rem; margin-bottom: 1.5rem; }
        .contact { background-color: #2c2c2c; padding: 2rem; margin-top: 2rem; border-radius: 8px; text-align: center; }
    </style>
</head>
<body>
    <header>
        <h1>Jane Doe</h1>
        <p>Photographer</p>
    </header>
    <div class="container">
        <section id="gallery">
            <h2>Gallery</h2>
            <div class="gallery">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070" alt="Landscape Photo 1">
                <img src="https://images.unsplash.com/photo-1511300636412-01634319a722?q=80&w=2070" alt="Landscape Photo 2">
                <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070" alt="Landscape Photo 3">
            </div>
        </section>
        <section id="contact" class="contact">
            <h2>Contact Me</h2>
            <p>Email: <a href="mailto:jane.doe@example.com" style="color: #3B82F6;">jane.doe@example.com</a></p>
        </section>
    </div>
</body>
</html>`,
    language: 'html'
  },
  {
    id: 2,
    title: 'Product Card - iOS',
    date: '2023-12-20',
    prompt: 'A SwiftUI view for a product card. It should show an image, product name, price, and an "Add to Cart" button.',
    generatedCode: `import SwiftUI

struct ProductCardView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Image(systemName: "photo.artframe")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(height: 180)
                .background(Color.gray.opacity(0.2))
                .cornerRadius(12)

            Text("Handmade Ceramic Mug")
                .font(.headline)

            Text("$24.99")
                .font(.title2)
                .fontWeight(.bold)

            Button(action: {
                // Add to cart action
            }) {
                Text("Add to Cart")
                    .fontWeight(.semibold)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(color: Color.black.opacity(0.1), radius: 8, x: 0, y: 4)
    }
}

struct ProductCardView_Previews: PreviewProvider {
    static var previews: some View {
        ProductCardView()
            .padding()
    }
}`,
    language: 'swift'
  },
  {
    id: 3,
    title: 'Blog about Sustainable Living',
    date: '2023-11-05',
    prompt: 'A blog post page. It should have a main title, author and date, an image, and some paragraphs of text.',
    generatedCode: `<!DOCTYPE html>
<html>
<head>
    <title>Blog Post</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; margin: 20px; background: #fff; }
        .post { max-width: 800px; margin: auto; }
        .post img { width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px; }
        .post-title { font-size: 2.5em; margin-bottom: 10px; }
        .post-meta { color: #888; margin-bottom: 20px; }
    </style>
</head>
<body>
    <div class="post">
        <h1 class="post-title">10 Easy Ways to Live More Sustainably</h1>
        <p class="post-meta">By Alex Johnson on November 5, 2023</p>
        <img src="https://images.unsplash.com/photo-1542601906-823862739599?q=80&w=2070" alt="Green leaves">
        <p>Living sustainably is about making conscious choices to reduce our impact on the environment. It doesn't have to be a complete overhaul of your lifestyle overnight. Small, consistent changes can make a big difference.</p>
    </div>
</body>
</html>`,
    language: 'html'
  }
];

function App() {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [codeLanguage, setCodeLanguage] = useState('html');
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const [activeHistoryId, setActiveHistoryId] = useState<number | null>(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authView, setAuthView] = useState<AuthView>(null);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState<boolean>(false);
  const [isPlatformSelectorOpen, setPlatformSelectorOpen] = useState<boolean>(false);
  
  const handleGenerate = async () => {
    if (!isLoggedIn) {
      setAuthView('signIn');
      return;
    }
    if (!prompt.trim() || isLoading) return;
    setPlatformSelectorOpen(true);
  };

  const handleProceedWithGeneration = async (platform: string) => {
    setPlatformSelectorOpen(false);
    setIsLoading(true);
    setError('');
    setGeneratedCode('');
    setActiveHistoryId(null);

    try {
      const code = await generateWebsiteCode(prompt, platform);
      let newCodeLanguage = 'html';
      switch (platform) {
        case 'iOS':
          newCodeLanguage = 'swift';
          break;
        case 'Android':
          newCodeLanguage = 'kotlin';
          break;
        default:
          newCodeLanguage = 'html';
          break;
      }
      setGeneratedCode(code);
      setCodeLanguage(newCodeLanguage);
      
      const newHistoryItem: HistoryItem = {
        id: Date.now(),
        title: prompt.length > 40 ? prompt.substring(0, 40) + '...' : prompt,
        date: new Date().toISOString().split('T')[0],
        prompt: prompt,
        generatedCode: code,
        language: newCodeLanguage,
      };
      setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
      setActiveHistoryId(newHistoryItem.id);

    } catch (err: any) {
      setError(err.message || 'An unknown error occurred. If you are using a personal API key, please verify it in settings.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogin = (email: string) => {
    if (email === 'admin@example.com') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setIsLoggedIn(true);
    setAuthView(null);
  };

  const handleSignUp = (email: string) => {
    setIsAdmin(false);
    setIsLoggedIn(true);
    setAuthView(null);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setGeneratedCode('');
    setError('');
    setPrompt('');
    setHistory([]);
    setActiveHistoryId(null);
  };

  const handleNewProject = () => {
    setGeneratedCode('');
    setError('');
    setPrompt('');
    setActiveHistoryId(null);
  };

  const handleHistoryItemClick = (item: HistoryItem) => {
    setPrompt(item.prompt);
    setGeneratedCode(item.generatedCode);
    setCodeLanguage(item.language);
    setActiveHistoryId(item.id);
    setError('');
  };

  const renderContent = () => {
    if (isLoggedIn) {
      if (isAdmin) {
        return <AdminDashboard />;
      }
      return (
        <UserWorkspace
          prompt={prompt}
          setPrompt={setPrompt}
          handleGenerate={handleGenerate}
          isLoading={isLoading}
          error={error}
          generatedCode={generatedCode}
          codeLanguage={codeLanguage}
          history={history}
          activeHistoryId={activeHistoryId}
          setActiveHistoryId={setActiveHistoryId}
          handleHistoryItemClick={handleHistoryItemClick}
        />
      );
    }

    // Not logged in
    return (
        <WelcomeScreen 
            onLoginClick={() => setAuthView('signIn')}
            onSignUpClick={() => setAuthView('signUp')}
        />
    );
  };

  return (
    <>
      <div className="bg-slate-900 min-h-screen text-slate-300 font-sans flex flex-col">
        <Header 
          isLoggedIn={isLoggedIn} 
          isAdmin={isAdmin}
          onLoginClick={() => setAuthView('signIn')}
          onLogout={handleLogout}
          onNewProject={handleNewProject}
          onSettingsClick={() => setSettingsModalOpen(true)}
        />
        {renderContent()}
      </div>
      
      {authView === 'signIn' && (
        <SignInModal 
            onClose={() => setAuthView(null)} 
            onLogin={handleLogin}
            onSwitchToSignUp={() => setAuthView('signUp')}
        />
      )}
      {authView === 'signUp' && (
        <SignUpModal 
            onClose={() => setAuthView(null)} 
            onSignUp={handleSignUp}
            onSwitchToSignIn={() => setAuthView('signIn')}
        />
      )}
      {isSettingsModalOpen && <SettingsModal onClose={() => setSettingsModalOpen(false)} />}
      {isPlatformSelectorOpen && (
        <PlatformSelectorModal
          onClose={() => setPlatformSelectorOpen(false)}
          onContinue={handleProceedWithGeneration}
        />
      )}
    </>
  );
}

const PlatformSelectorModal = ({ onClose, onContinue }: { onClose: () => void; onContinue: (platform: string) => void; }) => {
  type Platform = 'Web' | 'iOS' | 'Android';
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('Web');

  const handleContinueClick = () => {
    onContinue(selectedPlatform);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-full max-w-md p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <CloseIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-center text-white mb-6">Choose a platform</h2>
        <div className="space-y-3">
          {(['Web', 'iOS', 'Android'] as Platform[]).map(platform => (
            <label key={platform} className="flex items-center justify-between p-4 bg-slate-900 border border-slate-700 rounded-lg cursor-pointer transition-colors hover:border-slate-600 has-[:checked]:border-blue-500 has-[:checked]:ring-2 has-[:checked]:ring-blue-500/30">
              <span className="text-white font-medium">{platform}</span>
              <div className="relative w-5 h-5 flex items-center justify-center">
                <input
                  type="radio"
                  name="platform"
                  value={platform}
                  checked={selectedPlatform === platform}
                  onChange={() => setSelectedPlatform(platform)}
                  className="appearance-none peer absolute inset-0"
                />
                <span className="w-5 h-5 rounded-full border-2 border-slate-500 absolute pointer-events-none peer-checked:border-blue-500 transition-colors"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 absolute pointer-events-none scale-0 peer-checked:scale-100 transition-transform"></span>
              </div>
            </label>
          ))}
        </div>
        <button
          onClick={handleContinueClick}
          className="w-full bg-blue-600 text-white font-semibold rounded-lg py-3 mt-6 hover:bg-blue-500"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const SettingsModal = ({ onClose }: { onClose: () => void; }) => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('userApiKey');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('userApiKey', apiKey);
    onClose();
  };

  return (
     <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-full max-w-md p-8 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <CloseIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-center text-white mb-2">API Key Management</h2>
        <p className="text-center text-slate-400 mb-6">Enter your personal Gemini API key.</p>
        <div className="space-y-4">
          <input 
            type="password" 
            placeholder="Enter your API key" 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)} 
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400" 
          />
        </div>
        <button 
          onClick={handleSave}
          className="w-full bg-blue-600 text-white font-semibold rounded-lg py-3 mt-6 hover:bg-blue-500"
        >
          Save Key
        </button>
      </div>
    </div>
  )
}

export default App;