import React, { useState, useEffect } from 'react';
import { SLIDES_DATA } from '../data/mockData';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  MessageSquare, 
  Play, 
  ShieldAlert, 
  Volume2, 
  Code2
} from 'lucide-react';

export const PitchDeck: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [demoWidgetTripwire, setDemoWidgetTripwire] = useState<boolean>(true);
  const [demoWidgetAudioPlayed, setDemoWidgetAudioPlayed] = useState<boolean>(false);

  const currentSlide = SLIDES_DATA[currentSlideIndex];

  // Keyboard navigation for presentation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, SLIDES_DATA.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, SLIDES_DATA.length - 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const handlePlayDemoAudio = () => {
    setDemoWidgetAudioPlayed(true);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        "Hazard detected. Satay dish missing peanut disclosure. Publish locked."
      );
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`max-w-[1600px] mx-auto p-4 space-y-4 ${isFullscreen ? 'fixed inset-0 bg-[var(--paper)] z-50 p-6 overflow-y-auto' : ''}`}>
      {/* Deck Controls Top Bar */}
      <div className="bg-[var(--paper-card)] border border-[var(--rule)] p-3 rounded-[2px] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono-code font-bold text-sm text-[var(--ink)]">MenuMind Pitch Deck</span>
          <span className="text-[var(--rule-strong)]">|</span>
          <span className="text-[var(--ink-soft)] font-mono-code">Slide {currentSlideIndex + 1} of 4</span>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex items-center gap-1 font-mono-code">
          {SLIDES_DATA.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`px-2.5 py-1 rounded-[2px] text-[11px] font-bold transition-all border ${
                currentSlideIndex === idx
                  ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]'
                  : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--rule)] hover:text-[var(--ink)]'
              }`}
            >
              Slide {slide.id}
            </button>
          ))}
        </div>

        {/* Presentation Controls */}
        <div className="flex items-center gap-2 font-mono-code">
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-2.5 py-1 rounded-[2px] text-[11px] font-semibold flex items-center gap-1 border ${
              showSpeakerNotes
                ? 'bg-amber-100 text-amber-950 border-amber-400'
                : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--rule)]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Speaker Notes</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-2.5 py-1 bg-[var(--paper)] border border-[var(--rule-strong)] hover:bg-[var(--paper-2)] text-[var(--ink)] rounded-[2px] text-[11px] flex items-center gap-1"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Deck'}</span>
          </button>
        </div>
      </div>

      {/* Main Slide Card Container */}
      <div className="bg-[var(--paper-card)] border-2 border-[var(--ink)] rounded-[2px] p-6 sm:p-8 space-y-6 shadow-md min-h-[540px] flex flex-col justify-between">
        {/* Slide Header */}
        <div className="border-b border-[var(--rule-strong)] pb-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono-code font-bold uppercase bg-[var(--unknown)] text-[var(--ink)] px-2 py-0.5 rounded-[2px]">
              {currentSlide.category}
            </span>
            <span className="text-xs font-mono-code text-[var(--ink-soft)]">
              Accel AI Innovate Pitch • 23 September 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] font-ui">
            {currentSlide.title}
          </h1>
          <p className="text-sm font-semibold text-amber-900 font-mono-code">
            {currentSlide.subtitle}
          </p>
        </div>

        {/* Slide Body Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-auto">
          {/* Left / Primary Text Column (7 or 12 cols) */}
          <div className={`${currentSlide.content.keyStats || currentSlide.content.codeSnippet || currentSlideIndex === 2 ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
            <h2 className="text-lg font-bold text-[var(--ink)] leading-snug font-doc">
              "{currentSlide.content.headline}"
            </h2>

            <ul className="space-y-3 text-xs sm:text-sm text-[var(--ink)] font-ui">
              {currentSlide.content.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-800 mt-2 shrink-0"></span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column Visual / Widget / Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {/* Slide 1 & Slide 4 Stats */}
            {currentSlide.content.keyStats && (
              <div className="space-y-2.5">
                {currentSlide.content.keyStats.map((stat, idx) => (
                  <div key={idx} className="bg-[var(--paper)] border border-[var(--rule-strong)] p-3 rounded-[2px] space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono-code">
                      <span className="text-[var(--ink-soft)] font-semibold">{stat.label}</span>
                      {stat.badge && (
                        <span className="bg-[var(--paper-2)] border border-[var(--rule)] px-1.5 py-0.5 text-[10px] rounded-[2px] text-[var(--ink)] font-bold">
                          {stat.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-bold font-mono-code text-[var(--ink)]">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Slide 2 Code Snippet */}
            {currentSlide.content.codeSnippet && (
              <div className="bg-[var(--ink)] text-[var(--paper)] p-3.5 rounded-[2px] font-mono-code text-[11px] space-y-2">
                <div className="text-amber-400 font-bold border-b border-gray-700 pb-1 flex items-center justify-between">
                  <span>app/skins/menumind/policy.py</span>
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <pre className="text-[10px] leading-relaxed overflow-x-auto text-gray-200">
                  {currentSlide.content.codeSnippet}
                </pre>
              </div>
            )}

            {/* Slide 3 Live Interactive Demo Widget */}
            {currentSlideIndex === 2 && (
              <div className="bg-[var(--paper)] border-2 border-[var(--ink)] p-3.5 rounded-[2px] space-y-3 font-mono-code text-xs">
                <div className="flex items-center justify-between border-b border-[var(--rule)] pb-1.5">
                  <span className="font-bold text-[var(--ink)] flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-amber-800" />
                    <span>Live 90-Sec Demo Widget (mm-satay-01)</span>
                  </span>
                  <span className="text-[10px] bg-[var(--unknown)] text-[var(--ink)] font-bold px-1.5 py-0.5 rounded-[2px]">
                    INTERACTIVE
                  </span>
                </div>

                <div className="bg-[var(--paper-card)] p-2.5 border border-[var(--rule)] rounded-[2px] space-y-1.5">
                  <div className="flex justify-between font-bold">
                    <span>Dish: Satay Ayam (€14.50)</span>
                    <span className="text-amber-800">No printed allergen label</span>
                  </div>
                  <div className="text-[11px] text-[var(--ink-soft)] italic font-sans">
                    "Grilled marinated chicken skewers with warm peanut dipping sauce."
                  </div>

                  {demoWidgetTripwire ? (
                    <div className="bg-amber-100 border border-amber-500 p-2 rounded-[2px] space-y-1">
                      <div className="font-bold text-amber-950 flex items-center gap-1 text-[11px]">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-800" />
                        <span>FAIL-CLOSED GATE TRIPPED: Allergen UNKNOWN</span>
                      </div>
                      <div className="text-[10px] text-amber-900">
                        Missing peanut disclosure forces status = QUEUE. Publish button is LOCKED.
                      </div>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-500 p-2 rounded-[2px] text-emerald-900 text-[11px]">
                      ✓ Allergen verified by operator. Publish unlocked.
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={handlePlayDemoAudio}
                    className="flex-1 py-1.5 bg-[var(--paper-2)] border border-[var(--rule-strong)] text-[11px] font-bold rounded-[2px] flex items-center justify-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                    <span>{demoWidgetAudioPlayed ? 'Voice Alert Sent' : 'Test Audio Alert'}</span>
                  </button>

                  <button
                    onClick={() => setDemoWidgetTripwire(!demoWidgetTripwire)}
                    className="flex-1 py-1.5 bg-[var(--ink)] text-[var(--paper)] text-[11px] font-bold rounded-[2px]"
                  >
                    {demoWidgetTripwire ? 'Toggle Operator Resolve' : 'Reset Tripwire'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Slide Controls & Footer Navigation */}
        <div className="border-t border-[var(--rule-strong)] pt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlideIndex === 0}
              className={`px-3 py-1.5 rounded-[2px] border flex items-center gap-1 transition-all ${
                currentSlideIndex === 0
                  ? 'bg-[var(--paper-2)] text-[var(--ink-soft)] border-[var(--rule)] cursor-not-allowed'
                  : 'bg-[var(--paper-card)] text-[var(--ink)] border-[var(--rule-strong)] hover:bg-[var(--paper)] font-bold'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Slide</span>
            </button>

            <button
              onClick={handleNextSlide}
              disabled={currentSlideIndex === SLIDES_DATA.length - 1}
              className={`px-4 py-1.5 rounded-[2px] border flex items-center gap-1 transition-all ${
                currentSlideIndex === SLIDES_DATA.length - 1
                  ? 'bg-[var(--paper-2)] text-[var(--ink-soft)] border-[var(--rule)] cursor-not-allowed'
                  : 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-bold hover:bg-black'
              }`}
            >
              <span>Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[var(--ink-soft)] hidden sm:block">
            Use Left / Right arrow keys or Spacebar to navigate deck
          </div>
        </div>
      </div>

      {/* Speaker Notes Drawer */}
      {showSpeakerNotes && (
        <div className="bg-[var(--paper-card)] border border-[var(--rule)] p-4 rounded-[2px] space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-[var(--rule)] pb-1.5 font-mono-code">
            <span className="font-bold text-[var(--ink)] flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-amber-800" />
              <span>Speaker Notes for Pitcher (Slide {currentSlide.id}):</span>
            </span>
            <span className="text-[10px] text-[var(--ink-soft)]">For 5-Minute Pitch Practice</span>
          </div>

          <p className="text-[var(--ink)] leading-relaxed font-sans bg-[var(--paper)] p-3 border border-[var(--rule)] rounded-[2px]">
            {currentSlide.content.speakerNotes}
          </p>
        </div>
      )}
    </div>
  );
};
