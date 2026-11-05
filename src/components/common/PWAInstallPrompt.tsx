import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';

interface PWAInstallPromptProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Check if already in standalone PWA mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    if (isStandalone) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt (Android / Chrome / Desktop)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show install banner after 2 seconds
      setTimeout(() => setShowBanner(true), 2500);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // For iOS, show after 3 seconds if not dismissed previously
    if (isIosDevice) {
      const dismissed = sessionStorage.getItem('pwa_ios_dismissed');
      if (!dismissed) {
        setTimeout(() => setShowBanner(true), 3000);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowIOSGuide(false);
    sessionStorage.setItem('pwa_ios_dismissed', 'true');
  };

  if (!showBanner && !showIOSGuide) return null;

  return (
    <>
      {/* Floating Bottom Install Banner */}
      {showBanner && !showIOSGuide && (
        <div className="fixed bottom-20 left-4 right-4 z-40 max-w-md mx-auto animate-in slide-in-from-bottom duration-300">
          <div className="p-3.5 rounded-2xl bg-[#061B15]/95 border-2 border-[#D4AF37]/60 shadow-[0_10px_30px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.3)] backdrop-blur-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl gold-foil-bg flex items-center justify-center text-[#061B15] shrink-0 font-bold shadow">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#FFFDF7] leading-tight">
                  Install Pasand Art Gallery
                </h4>
                <p className="text-[10px] text-[#E8D5B7]/80 truncate">
                  Add to home screen for faster shopping & orders
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleInstallClick}
                className="px-3 py-1.5 rounded-xl gold-foil-bg text-[#061B15] font-bold text-xs uppercase tracking-wider shadow hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                Install
              </button>
              <button
                onClick={handleDismiss}
                className="p-1.5 text-[#E8D5B7]/60 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* iOS Instructions Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-sm rounded-3xl bg-[#092820] border-2 border-[#D4AF37]/50 p-6 text-center space-y-4 shadow-2xl">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute top-4 right-4 p-1.5 text-[#E8D5B7] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-full gold-foil-bg mx-auto flex items-center justify-center text-[#061B15]">
              <Smartphone className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-serif-luxury text-[#FFFDF7] font-semibold">
              Install on iPhone / iPad
            </h3>

            <div className="text-xs text-[#E8D5B7] text-left space-y-2.5 bg-[#04140F] p-4 rounded-2xl border border-[#D4AF37]/30">
              <p className="flex items-start gap-2">
                <span className="font-bold text-[#F5D77F]">1.</span>
                <span>
                  Tap the <strong className="text-white">Share</strong> button at the bottom of your Safari screen (icon with arrow ⎋).
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold text-[#F5D77F]">2.</span>
                <span>
                  Scroll down and tap <strong className="text-white">"Add to Home Screen"</strong> (icon with a plus ⊞).
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold text-[#F5D77F]">3.</span>
                <span>
                  Tap <strong className="text-white">Add</strong> in the top-right corner.
                </span>
              </p>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 rounded-xl gold-foil-bg text-[#061B15] font-bold text-xs uppercase tracking-wider"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

