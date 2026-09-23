import React from 'react';
import { ShieldCheck, Server } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--paper-2)] border-t border-[var(--rule)] text-[var(--ink)] mt-8 py-4 text-xs">
      <div className="max-w-[1600px] mx-auto px-4 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--rule)] pb-2">
          <div className="flex items-center gap-3">
            <span className="font-mono-code font-bold text-[var(--ink)]">MenuMind Decision Harness</span>
            <span className="text-[var(--ink-soft)]">•</span>
            <span className="text-[var(--ink-soft)]">
              Named Customer: <strong className="text-[var(--ink)]">Sander van Dijk</strong> (Sr Partner Onboarding Lead @ Just Eat Takeaway)
            </span>
          </div>

          <div className="font-mono-code text-[11px] text-[var(--ink-soft)] flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Server className="w-3 h-3 text-amber-800" />
              <span>Nebius Token Factory EU Endpoint</span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-800" />
              <span>EU AI Act Article 12/14 Logged</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono-code text-[var(--ink-soft)]">
          <div>
            EU FIC Reg. 1169/2011 Annex II • High-Hazard Allergen Safety Gate • Missing information = UNKNOWN (Fail-Closed Policy)
          </div>
          <div>
            Designed strictly to UI UX Pro Max standards (IBM Plex Sans / Mono • Radius 2px • No Purple/Gradients)
          </div>
        </div>
      </div>
    </footer>
  );
};
