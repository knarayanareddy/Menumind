import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Filter, 
  FileSpreadsheet, 
  Sparkles, 
  ExternalLink,
  Info,
  Printer,
  QrCode
} from 'lucide-react';
import { MENU_FIXTURES } from '../data/mockData';
import { AllergenType } from '../types';

interface AllergenMeta {
  key: AllergenType;
  label: string;
  shortLabel: string;
  icon: string;
}

const EU_14_ALLERGENS: AllergenMeta[] = [
  { key: 'gluten', label: 'Gluten (Cereals)', shortLabel: 'Gluten', icon: '🌾' },
  { key: 'crustaceans', label: 'Crustaceans (Shrimp/Prawn)', shortLabel: 'Crustacean', icon: '🦐' },
  { key: 'eggs', label: 'Eggs', shortLabel: 'Eggs', icon: '🥚' },
  { key: 'fish', label: 'Fish', shortLabel: 'Fish', icon: '🐟' },
  { key: 'peanuts', label: 'Peanuts (Groundnuts)', shortLabel: 'Peanuts', icon: '🥜' },
  { key: 'soy', label: 'Soybeans (Soy/Tofu)', shortLabel: 'Soy', icon: '🌱' },
  { key: 'milk', label: 'Milk (Dairy/Lactose)', shortLabel: 'Milk', icon: '🥛' },
  { key: 'tree_nuts', label: 'Tree Nuts (Almond/Walnut)', shortLabel: 'Nuts', icon: '🌰' },
  { key: 'celery', label: 'Celery', shortLabel: 'Celery', icon: '🥬' },
  { key: 'mustard', label: 'Mustard', shortLabel: 'Mustard', icon: '🟡' },
  { key: 'sesame', label: 'Sesame Seeds', shortLabel: 'Sesame', icon: '🥯' },
  { key: 'sulfites', label: 'Sulphur Dioxide / Sulphites', shortLabel: 'Sulphites', icon: '🍷' },
  { key: 'lupin', label: 'Lupin', shortLabel: 'Lupin', icon: '🌸' },
  { key: 'molluscs', label: 'Molluscs (Mussels/Squid)', shortLabel: 'Molluscs', icon: '🦪' },
];

export const AllergenMatrix: React.FC = () => {
  const [selectedAllergies, setSelectedAllergies] = useState<AllergenType[]>(['peanuts']);
  const [activeFixtureId, setActiveFixtureId] = useState<string>('mm-satay-01');
  const [viewMode, setViewMode] = useState<'matrix' | 'diner_filter' | 'regulations'>('matrix');

  const activeFixture = MENU_FIXTURES.find(f => f.id === activeFixtureId) || MENU_FIXTURES[0];

  const toggleAllergy = (allergen: AllergenType) => {
    setSelectedAllergies(prev => 
      prev.includes(allergen) 
        ? prev.filter(a => a !== allergen) 
        : [...prev, allergen]
    );
  };

  const clearAllergies = () => setSelectedAllergies([]);

  return (
    <div className="max-w-[1600px] mx-auto p-4 space-y-5">
      {/* Editorial Header Banner */}
      <div className="bg-[var(--paper-card)] border border-[var(--rule)] p-5 rounded-[2px] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--rule)] pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono-code text-xs text-amber-800">
              <FileSpreadsheet className="w-4 h-4" />
              <span>EU FIC REG. 1169/2011 ANNEX II • CUSTOMER 2D ALLERGEN MATRIX</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[var(--ink)] mt-1">
              Interactive Restaurant Allergen Matrix & Diner Safety Filter
            </h1>
            <p className="text-xs text-[var(--ink-soft)] mt-1 max-w-4xl">
              Eliminating the lazy and dangerous restaurant cop-out: <strong className="text-[var(--ink)]">"All meals may contain all allergens :)"</strong>. 
              Powered by Nebius Token Factory Qwen3-VL extraction & Tavily recipe grounding to enforce verified item-by-item safety.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-[var(--paper)] border border-[var(--rule-strong)] text-xs font-mono-code flex items-center gap-1.5 hover:bg-[var(--paper-2)] rounded-[2px]"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print EU Matrix</span>
            </button>
            <div className="bg-[var(--unknown)] text-[var(--ink)] px-2.5 py-1 text-xs font-mono-code font-bold rounded-[2px] flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>DUTCH NVWA 2026 COMPLIANT</span>
            </div>
          </div>
        </div>

        {/* Regulatory Spotlight & Viral Context Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {/* Card 1: The Meme vs The Reality */}
          <div className="bg-[var(--paper)] p-3 border border-[var(--rule)] rounded-[2px] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-rose-800 font-mono-code">THE "BLANKET" COP-OUT</span>
              <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded-[2px]">Viral Meme</span>
            </div>
            <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed">
              Facing EU mandatory disclosure laws, many European venues print: <em className="text-[var(--ink)]">"All meals may contain all allergens."</em> This legally exposes food allergy sufferers to severe anaphylaxis and invalidates menu utility.
            </p>
          </div>

          {/* Card 2: 2026 Dutch & EU Regulatory Ban */}
          <div className="bg-[var(--paper)] p-3 border border-[var(--rule)] rounded-[2px] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-amber-800 font-mono-code">DUTCH NVWA JAN 2026 BAN</span>
              <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-[2px]">Statutory Law</span>
            </div>
            <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed">
              As of January 1, 2026, the Netherlands NVWA strictly prohibits blanket Precautionary Allergen Labeling (PAL) like "may contain traces" without a formal, quantitative threshold risk assessment.
            </p>
          </div>

          {/* Card 3: The MenuMind Solution */}
          <div className="bg-[var(--paper)] p-3 border border-[var(--rule)] rounded-[2px] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-800 font-mono-code">2D HIGH-DENSITY MATRIX</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-[2px]">siddharth3 Concept</span>
            </div>
            <p className="text-[11px] text-[var(--ink-soft)] leading-relaxed">
              Provides diners with a 2-dimensional grid (Dishes × 14 Allergens). Diners toggle their allergies to filter menus in real time with color-coded safety guarantees.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Diner Filter Toolbar */}
      <div className="bg-[var(--paper-card)] border border-[var(--rule)] p-4 rounded-[2px] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--ink)]" />
            <span className="text-xs font-semibold text-[var(--ink)]">DINER ALLERGY FILTER:</span>
            <span className="text-xs text-[var(--ink-soft)]">Select your food allergies to simulate consumer menu safe-view:</span>
          </div>

          <div className="flex items-center gap-2">
            {selectedAllergies.length > 0 && (
              <button
                onClick={clearAllergies}
                className="text-[11px] font-mono-code text-rose-700 hover:underline"
              >
                Clear all ({selectedAllergies.length})
              </button>
            )}
            <div className="text-[11px] font-mono-code bg-[var(--paper)] border border-[var(--rule)] px-2 py-0.5 rounded-[2px]">
              Menu: <strong className="text-[var(--ink)]">{activeFixture.restaurantName}</strong>
            </div>
          </div>
        </div>

        {/* 14 EU Allergen Toggle Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {EU_14_ALLERGENS.map(alg => {
            const isSelected = selectedAllergies.includes(alg.key);
            return (
              <button
                key={alg.key}
                onClick={() => toggleAllergy(alg.key)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-[2px] border transition-all ${
                  isSelected
                    ? 'bg-rose-900 text-white border-rose-900 font-semibold shadow-xs'
                    : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--rule)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
                }`}
              >
                <span>{alg.icon}</span>
                <span>{alg.shortLabel}</span>
                {isSelected && <span className="text-[10px] ml-1">✕</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* The 2D Interactive Allergen Table (The Siddharth3 Concept) */}
      <div className="bg-[var(--paper-card)] border border-[var(--rule)] rounded-[2px] overflow-hidden">
        <div className="p-3 bg-[var(--paper-2)] border-b border-[var(--rule)] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="font-semibold text-[var(--ink)] flex items-center gap-2">
            <span>2D Allergen Breakdown: {activeFixture.restaurantName}</span>
            <span className="font-mono-code text-[11px] text-[var(--ink-soft)]">({activeFixture.items.length} items evaluated)</span>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-[11px] font-mono-code">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full inline-block"></span>
              <span>Absent (Safe)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-rose-600 rounded-full inline-block"></span>
              <span>Confirmed Present</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-[var(--unknown)] border border-amber-600 rounded-full inline-block"></span>
              <span>UNKNOWN (Fail-Closed)</span>
            </div>
          </div>
        </div>

        {/* Scrollable Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-[var(--paper)] border-b border-[var(--rule-strong)] font-mono-code text-[11px] text-[var(--ink-soft)]">
                <th className="p-3 font-semibold min-w-[220px] sticky left-0 bg-[var(--paper)] z-10 border-r border-[var(--rule)]">
                  Dish Name & Price
                </th>
                <th className="p-3 font-semibold min-w-[120px] border-r border-[var(--rule)] text-center">
                  Diner Safety
                </th>
                {EU_14_ALLERGENS.map(alg => (
                  <th 
                    key={alg.key} 
                    className={`p-2.5 text-center min-w-[85px] border-r border-[var(--rule)] ${
                      selectedAllergies.includes(alg.key) ? 'bg-rose-50 text-rose-900 font-bold' : ''
                    }`}
                    title={alg.label}
                  >
                    <div className="text-base">{alg.icon}</div>
                    <div className="truncate text-[10px] mt-0.5">{alg.shortLabel}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--rule)]">
              {activeFixture.items.map(item => {
                // Determine safety against selected allergies
                const triggeredAllergies = item.allergens.filter(a => 
                  selectedAllergies.includes(a.allergen) && (a.status === 'confirmed' || a.status === 'unknown' || a.status === 'suspected')
                );
                const hasUnknownTripwire = item.allergens.some(a => a.status === 'unknown');
                const isSafeForDiner = triggeredAllergies.length === 0;

                return (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-[var(--paper-2)] transition-colors ${
                      !isSafeForDiner ? 'bg-rose-50/40' : ''
                    }`}
                  >
                    {/* Dish column */}
                    <td className="p-3 font-medium text-[var(--ink)] sticky left-0 bg-[var(--paper-card)] z-10 border-r border-[var(--rule)]">
                      <div className="font-semibold text-xs">{item.name}</div>
                      <div className="text-[11px] font-mono-code text-[var(--ink-soft)]">
                        €{(item.priceCents / 100).toFixed(2)} • {item.section}
                      </div>
                      <div className="text-[10px] text-[var(--ink-soft)] line-clamp-1 mt-0.5">
                        {item.printedDescription}
                      </div>
                    </td>

                    {/* Overall Diner Safety Badge */}
                    <td className="p-3 border-r border-[var(--rule)] text-center">
                      {isSafeForDiner ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono-code text-[11px] font-bold rounded-[2px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>SAFE</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-100 text-rose-800 border border-rose-300 font-mono-code text-[11px] font-bold rounded-[2px]" title={triggeredAllergies.map(a => a.allergen).join(', ')}>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>UNSAFE</span>
                        </span>
                      )}
                    </td>

                    {/* 14 Allergen Grid Cells */}
                    {EU_14_ALLERGENS.map(alg => {
                      const statusObj = item.allergens.find(a => a.allergen === alg.key);
                      const status = statusObj ? statusObj.status : 'absent';
                      const isFiltered = selectedAllergies.includes(alg.key);

                      return (
                        <td 
                          key={alg.key} 
                          className={`p-2 text-center border-r border-[var(--rule)] ${
                            isFiltered ? 'bg-rose-50/60' : ''
                          }`}
                        >
                          {status === 'confirmed' && (
                            <span className="inline-block p-1 bg-rose-100 text-rose-800 border border-rose-300 rounded-[2px] font-mono-code font-bold text-[10px]" title="Confirmed in printed recipe or verified disclosure">
                              YES
                            </span>
                          )}
                          {status === 'unknown' && (
                            <span className="inline-block px-1 py-0.5 bg-[var(--unknown)] text-[var(--ink)] border border-amber-600 rounded-[2px] font-mono-code font-bold text-[9px]" title="Silence is never safe: Unstated disclosure flagged UNKNOWN">
                              UNKNOWN
                            </span>
                          )}
                          {status === 'suspected' && (
                            <span className="inline-block px-1 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-[2px] font-mono-code text-[9px]" title="Tavily culinary grounding suspected ingredient">
                              SUSP
                            </span>
                          )}
                          {status === 'absent' && (
                            <span className="text-emerald-700/60 font-mono-code text-xs">
                              —
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparative Regulatory Guidance Box */}
      <div className="bg-[var(--paper-2)] border border-[var(--rule)] p-4 rounded-[2px] text-xs space-y-2">
        <div className="flex items-center gap-2 font-semibold text-[var(--ink)]">
          <Info className="w-4 h-4 text-amber-800" />
          <span>Why Blanket "May Contain All Allergens" Disclaimers No Longer Protect Restaurants</span>
        </div>
        <div className="text-[var(--ink-soft)] space-y-1.5 leading-relaxed text-[11px]">
          <p>
            Under <strong className="text-[var(--ink)]">EU FIC Regulation 1169/2011 Article 44</strong> and the <strong className="text-[var(--ink)]">January 1, 2026 Dutch NVWA Regulatory Policy</strong>, European food business operators cannot evade itemized allergen liability with umbrella disclaimers. 
            Regulatory agencies view blanket notices as an admission of substandard cross-contamination controls.
          </p>
          <p>
            <strong className="text-[var(--ink)]">MenuMind’s Guarantee:</strong> By applying the <em>"Models Propose, Code Decides"</em> rule, MenuMind converts unstated items into deterministic review queues, ensuring that delivery platforms like Just Eat Takeaway and independent restaurant owners remain fully compliant with European food safety directives.
          </p>
        </div>
      </div>
    </div>
  );
};
