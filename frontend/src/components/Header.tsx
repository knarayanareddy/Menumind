import React from 'react';
import { 
  Utensils, 
  Code, 
  BarChart3, 
  Presentation, 
  Lock, 
  ShieldAlert, 
  Server
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'console' | 'repo' | 'eval' | 'deck';
  setActiveTab: (tab: 'console' | 'repo' | 'eval' | 'deck') => void;
  killSwitchActive: boolean;
  setKillSwitchActive: (active: boolean) => void;
  isProcessing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  killSwitchActive,
  setKillSwitchActive,
}) => {
  return (
    <header className="bg-[var(--paper-2)] border-b border-[var(--rule)] text-[var(--ink)]">
      {/* Top Banner - Instrument Chrome Bar */}
      <div className="max-w-[1600px] mx-auto px-4 py-2 flex flex-wrap items-center justify-between text-xs border-b border-[var(--rule)] gap-2">
        <div className="flex items-center gap-3">
          <div className="font-mono-code font-bold text-sm tracking-tight flex items-center gap-1.5 text-[var(--ink)]">
            <span className="bg-[var(--ink)] text-[var(--paper)] px-1.5 py-0.5 rounded-[2px] font-mono-code">4PRD</span>
            <span className="text-[var(--ink-soft)]">/</span>
            <span>menumind</span>
          </div>
          <span className="hidden sm:inline text-[var(--rule-strong)]">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-[var(--ink-soft)] font-mono-code">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>CUSTOMER:</span>
            <span className="font-semibold text-[var(--ink)]">Sander van Dijk (Sr Partner Onboarding Lead @ Just Eat Takeaway)</span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono-code">
          {/* Engine indicator */}
          <div className="hidden md:flex items-center gap-1.5 bg-[var(--paper-card)] border border-[var(--rule)] px-2 py-1 rounded-[2px] text-[11px]">
            <Server className="w-3.5 h-3.5 text-amber-700" />
            <span className="text-[var(--ink-soft)]">ENGINE:</span>
            <span className="font-semibold text-[var(--ink)]">Nebius Token Factory (EU Zero-Retention)</span>
          </div>

          {/* Kill switch */}
          <button
            onClick={() => setKillSwitchActive(!killSwitchActive)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] font-mono-code text-[11px] font-semibold transition-colors border ${
              killSwitchActive
                ? 'bg-[#9B2C1F] text-white border-[#9B2C1F]'
                : 'bg-[var(--paper-card)] text-[var(--ink)] border-[var(--rule-strong)] hover:bg-[var(--paper)]'
            }`}
            title="Emergency Kill Switch: Freeze all automated recommendations & block auto-publish"
          >
            {killSwitchActive ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>RECOMMENDATIONS FROZEN</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-700" />
                <span>KILL SWITCH: NORMAL</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1600px] mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="font-ui font-semibold text-lg tracking-tight text-[var(--ink)] flex items-center gap-2">
            <span>MenuMind</span>
            <span className="text-xs font-mono-code bg-[var(--unknown)] text-[var(--ink)] px-2 py-0.5 font-bold rounded-[2px]">
              EU-14 ALLERGEN GATE
            </span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav className="flex items-center gap-1 bg-[var(--paper)] p-1 border border-[var(--rule)] rounded-[2px]">
          <button
            onClick={() => setActiveTab('console')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-[2px] text-xs font-medium transition-all ${
              activeTab === 'console'
                ? 'bg-[var(--ink)] text-[var(--paper)] font-semibold shadow-xs'
                : 'text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--paper-2)]'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>1. MenuMind Triage Console</span>
          </button>

          <button
            onClick={() => setActiveTab('repo')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-[2px] text-xs font-medium transition-all ${
              activeTab === 'repo'
                ? 'bg-[var(--ink)] text-[var(--paper)] font-semibold shadow-xs'
                : 'text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--paper-2)]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>2. 4PRD Repo & Harness Review</span>
          </button>

          <button
            onClick={() => setActiveTab('eval')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-[2px] text-xs font-medium transition-all ${
              activeTab === 'eval'
                ? 'bg-[var(--ink)] text-[var(--paper)] font-semibold shadow-xs'
                : 'text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--paper-2)]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>3. Benchmark & Evals (/eval)</span>
          </button>

          <button
            onClick={() => setActiveTab('deck')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-[2px] text-xs font-medium transition-all ${
              activeTab === 'deck'
                ? 'bg-[var(--ink)] text-[var(--paper)] font-semibold shadow-xs'
                : 'text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--paper-2)]'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>4. Pitch Deck (4 Slides)</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
