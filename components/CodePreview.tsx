import React, { useState, useEffect, useRef } from 'react';
import { DocumentDuplicateIcon, PlusIcon, MinusIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon } from './icons/Icons';
import { Tooltip } from './Tooltip';

interface CodePreviewProps {
  code: string;
  language: string;
}

export const CodePreview: React.FC<CodePreviewProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement | null>(null);

  const [zoom, setZoom] = useState(1);
  const [fontSize, setFontSize] = useState(14);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (language !== 'html' && codeRef.current && (window as any).Prism) {
        (window as any).Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleZoomIn = () => {
    if (language === 'html') {
      setZoom(z => Math.min(z + 0.1, 2));
    } else {
      setFontSize(fs => Math.min(fs + 1, 24));
    }
  };

  const handleZoomOut = () => {
    if (language === 'html') {
      setZoom(z => Math.max(z - 0.1, 0.5));
    } else {
      setFontSize(fs => Math.max(fs - 1, 8));
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);


  return (
    <div className={`bg-slate-900 rounded-lg overflow-hidden h-full flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="bg-slate-800/50 px-4 py-2 border-b border-slate-700 flex justify-between items-center flex-shrink-0">
        <span className="text-sm font-mono text-slate-400">{language}</span>
        <div className="flex items-center space-x-4">
            <Tooltip text="Zoom Out">
                <button onClick={handleZoomOut} className="text-slate-300 hover:text-white">
                    <MinusIcon className="h-5 w-5" />
                </button>
            </Tooltip>
            
            <span className="text-sm text-slate-400 w-12 text-center">
                {language === 'html' ? `${Math.round(zoom * 100)}%` : `${fontSize}px`}
            </span>

            <Tooltip text="Zoom In">
                <button onClick={handleZoomIn} className="text-slate-300 hover:text-white">
                    <PlusIcon className="h-5 w-5" />
                </button>
            </Tooltip>

            <div className="w-px h-5 bg-slate-700 mx-2"></div>
            
            <Tooltip text={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
                <button onClick={toggleFullscreen} className="text-slate-300 hover:text-white">
                    {isFullscreen ? <ArrowsPointingInIcon className="h-5 w-5" /> : <ArrowsPointingOutIcon className="h-5 w-5" />}
                </button>
            </Tooltip>

            <div className="w-px h-5 bg-slate-700 mx-2"></div>

            <Tooltip text={copied ? 'Copied!' : 'Copy to clipboard'}>
                <button
                    onClick={handleCopy}
                    className="flex items-center space-x-2 text-sm text-slate-300 hover:text-white"
                >
                    <DocumentDuplicateIcon className="h-5 w-5" />
                    <span>{copied ? 'Copied!' : 'Copy code'}</span>
                </button>
            </Tooltip>
        </div>
      </div>
      <div className="overflow-auto flex-1 relative">
        {language === 'html' ? (
            <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top left', width: `${100/zoom}%`, height: `${100/zoom}%` }}>
              <iframe 
                  srcDoc={code} 
                  title="Website Preview"
                  className="w-full h-full bg-white"
                  sandbox="allow-scripts"
              />
            </div>
        ) : (
            <pre className="h-full w-full !bg-slate-900 p-4" style={{ fontSize: `${fontSize}px` }}>
                <code ref={codeRef} className={`language-${language}`}>
                    {code}
                </code>
            </pre>
        )}
      </div>
    </div>
  );
};

export default CodePreview;
