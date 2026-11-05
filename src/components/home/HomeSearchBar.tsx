import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, Mic, MicOff } from 'lucide-react';

export const HomeSearchBar: React.FC = () => {
  const { setIsSearchOpen, setSearchQuery, setActiveView, showToast } = useStore();
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        setIsListening(true);
        showToast('Listening...', 'Speak what you are looking for (e.g. Jhumka, Perfume)', 'gold');

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(transcript);
          setActiveView('shop');
          setIsListening(false);
          showToast('Search Result', `Showing results for "${transcript}"`, 'gold');
        };

        recognition.onerror = () => {
          setIsListening(false);
          setIsSearchOpen(true);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch {
        setIsListening(false);
      }
    }

    setIsListening(true);
    showToast('Voice Search Simulated', 'Detected: "Traditional Kundan Jhumka"', 'gold');
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('Jhumka');
      setActiveView('shop');
    }, 1200);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div
        onClick={() => setIsSearchOpen(true)}
        className="group relative flex items-center justify-between w-full h-13 px-5 rounded-2xl bg-[#0B251E] border-2 border-[#D4AF37]/50 hover:border-[#F5D77F] shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(212,175,55,0.15)] cursor-pointer backdrop-blur-md transition-all duration-300"
      >
        {/* Left: Gold Search Icon & Placeholder */}
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          <Search className="w-5 h-5 text-[#F5D77F] shrink-0" />
          <span className="text-xs sm:text-sm text-[#E8D5B7]/80 truncate font-light tracking-wide">
            Search for jewellery, perfumes, cosmetics, accessories...
          </span>
        </div>

        {/* Right: Gold Mic Icon */}
        <button
          type="button"
          onClick={handleVoiceSearch}
          className={`p-2 rounded-xl transition-all shrink-0 ${
            isListening
              ? 'text-red-400 bg-red-950/60 animate-pulse'
              : 'text-[#F5D77F] hover:bg-[#D4AF37]/20 hover:scale-105'
          }`}
          title="Voice Search"
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
