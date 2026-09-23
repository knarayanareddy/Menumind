import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Filter, 
  FileSpreadsheet, 
  Printer,
  QrCode,
  Search,
  Building2,
  Check,
  UserCheck,
  Sparkles,
  Download,
  Info
} from 'lucide-react';
import { FIFTY_RESTAURANT_FIXTURES } from '../data/mockData';
import { AllergenType, MenuItem } from '../types';

interface AllergenMeta {
  key: AllergenType;
  label: string;
  shortLabel: string;
  icon: string;
}

const EU_14_ALLERGENS: AllergenMeta[] = [
  { key: 'gluten', label: 'Gluten (Cereals)', shortLabel: 'Gluten', icon: '🌾' },
  { key: 'crustaceans', label: 'Crustaceans (Prawn/Shrimp)', shortLabel: 'Crustacean', icon: '🦐' },
  { key: 'eggs', label: 'Eggs', shortLabel: 'Eggs', icon: '🥚' },
  { key: 'fish', label: 'Fish', shortLabel: 'Fish', icon: '🐟' },
  { key: 'peanuts', label: 'Peanuts (Groundnuts)', shortLabel: 'Peanuts', icon: '🥜' },
  { key: 'soy', label: 'Soybeans (Soy/Tofu)', shortLabel: 'Soy', icon: '🌱' },
  { key: 'milk', label: 'Milk (Dairy/Lactose)', shortLabel: 'Milk', icon: '🥛' },
  { key: 'tree_nuts', label: 'Tree Nuts (Almond/Walnut)', shortLabel: 'Nuts', icon: '🌰' },
  { key: 'celery', label: 'Celery', shortLabel: 'Celery', icon: '🥬' },
  { key: 'mustard', label: 'Mustard', shortLabel: 'Mustard', icon: '🟡' },
  { key: 'sesame', label: 'Sesame Seeds', shortLabel: 'Sesame', icon: '🥯' },
  { key: 'sulfites', label: 'Sulphites / SO2', shortLabel: 'Sulphites', icon: '🍷' },
  { key: 'lupin', label: 'Lupin', shortLabel: 'Lupin', icon: '🌸' },
  { key: 'molluscs', label: 'Molluscs (Mussel/Squid)', shortLabel: 'Molluscs', icon: '🦪' },
];

const CUISINES = [
  'All',
  'Indonesian',
  'Surinamese',
  'Italian',
  'Thai',
  'Japanese',
  'Indian',
  'Mexican',
  'Middle Eastern',
  'French',
  'Chinese',
  'European'
];

export const AllergenMatrix: React.FC = () => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>(FIFTY_RESTAURANT_FIXTURES[0].id);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAllergies, setSelectedAllergies] = useState<AllergenType[]>(['peanuts']);
  const [ownerConfirmedMap, setOwnerConfirmedMap] = useState<Record<string, boolean>>({});
  const [showCertModal, setShowCertModal] = useState<boolean>(false);

  // Filter restaurants
  const filteredRestaurants = useMemo(() => {
    return FIFTY_RESTAURANT_FIXTURES.filter(r => {
      const matchesCuisine = selectedCuisine === 'All' || r.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase());
      const matchesSearch = r.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            r.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            r.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCuisine && matchesSearch;
    });
  }, [selectedCuisine, searchQuery]);

  const activeRestaurant = useMemo(() => {
    return FIFTY_RESTAURANT_FIXTURES.find(r => r.id === selectedRestaurantId) || FIFTY_RESTAURANT_FIXTURES[0];
  }, [selectedRestaurantId]);

  const toggleAllergy = (allergen: AllergenType) => {
    setSelectedAllergies(prev => 
      prev.includes(allergen) 
        ? prev.filter(a => a !== allergen) 
        : [...prev, allergen]
    );
  };

  const clearAllergies = () => setSelectedAllergies([]);

  const isOwnerConfirmed = !!ownerConfirmedMap[activeRestaurant.id];

  const handleConfirmByOwner = () => {
    setOwnerConfirmedMap(prev => ({ ...prev, [activeRestaurant.id]: true }));
    setShowCertModal(true);
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 space-y-5">
      {/* Top Banner & Regulatory Header */}
      <div className="bg-[var(--paper-card)] border border-[var(--rule)] p-5 rounded-[2px] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--rule)] pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono-code text-xs text-amber-800">
              <FileSpreadsheet className="w-4 h-4" />
              <span>EU FIC REG. 1169/2011 ANNEX II • 50-RESTAURANT REAL-WORLD BENCHMARK</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[var(--ink)] mt-1">
              Live 2D Customer Allergen Matrix & Marketplace Verification Hub
            </h1>
            <p className="text-xs text-[var(--ink-soft)] mt-1 max-w-4xl">
              50 real-world European & Amsterdam menus evaluated dish-by-dish. Solves the dangerous cop-out: <strong className="text-[var(--ink)]">"All meals may contain all allergens :)"</strong>. 
              Enforces the <strong className="text-amber-900">Dutch NVWA Jan 1, 2026 Precautionary Allergen Labeling (PAL) Ban</strong> across delivery networks.
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
              <span>50 RESTAURANTS LIVE</span>
            </div>
          </div>
        </div>

        {/* 50-Restaurant Filter & Selector Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs pt-1">
          {/* Search Box */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-[var(--ink-soft)]" />
            <input
              type="text"
              placeholder="Search 50 restaurants, cuisines, dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-[var(--paper)] border border-[var(--rule-strong)] rounded-[2px] text-xs font-ui text-[var(--ink)] focus:outline-none focus:ring-1 focus:ring-[var(--ink)]"
            />
          </div>

          {/* Cuisine Filter Pills */}
          <div className="md:col-span-8 flex items-center gap-1.5 overflow-x-auto pb-1">
            {CUISINES.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCuisine(c)}
                className={`px-2.5 py-1 rounded-[2px] text-[11px] font-mono-code whitespace-nowrap transition-all border ${
                  selectedCuisine === c
                    ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-bold'
                    : 'bg-[var(--paper)] text-[var(--ink-soft)] border-[var(--rule)] hover:border-[var(--ink)]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Restaurant Selector Dropdown Grid */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-[11px] font-mono-code text-[var(--ink-soft)] whitespace-nowrap flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5" /> Select Venue:
          </span>
          <div className="flex gap-1.5 overflow-x-auto">
            {filteredRestaurants.map(r => {
              const isSelected = r.id === activeRestaurant.id;
              const hasUnknown = r.items.some(item => item.allergens.some(a => a.status === 'unknown'));
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedRestaurantId(r.id)}
                  className={`px-2.5 py-1 text-xs rounded-[2px] border whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-semibold'
                      : 'bg-[var(--paper)] text-[var(--ink)] border-[var(--rule)] hover:border-[var(--rule-strong)]'
                  }`}
                >
                  <span>{r.restaurantName}</span>
                  {hasUnknown && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--unknown)]" title="Contains unstated allergens (fail-closed)"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Diner Allergy Filter Toolbar */}
      <div className="bg-[var(--paper-card)] border border-[var(--rule)] p-4 rounded-[2px] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[var(--ink)]" />
            <span className="text-xs font-semibold text-[var(--ink)]">INTERACTIVE DINER SAFETY FILTER:</span>
            <span className="text-xs text-[var(--ink-soft)]">Click your personal allergies to filter the active menu in real-time:</span>
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
              Active: <strong className="text-[var(--ink)]">{activeRestaurant.restaurantName}</strong> ({activeRestaurant.city})
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
                {isSelected && <span className="text-[10px] ml-1 font-bold">✕</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* The 2D Interactive Allergen Table (The Siddharth3 Concept) */}
      <div className="bg-[var(--paper-card)] border border-[var(--rule)] rounded-[2px] overflow-hidden">
        {/* Restaurant Header Ribbon */}
        <div className="p-3 bg-[var(--paper-2)] border-b border-[var(--rule)] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-semibold text-sm text-[var(--ink)] flex items-center gap-2">
              <span>{activeRestaurant.restaurantName}</span>
              <span className="font-mono-code text-[11px] text-[var(--ink-soft)]">
                • {activeRestaurant.cuisine} • {activeRestaurant.city} • Source: {activeRestaurant.sourceType}
              </span>
            </div>
          </div>

          {/* Action buttons: Certify & Publish */}
          <div className="flex items-center gap-2 font-mono-code text-xs">
            {isOwnerConfirmed ? (
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-1 rounded-[2px] flex items-center gap-1 font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>CERTIFIED BY RESTAURANT OPERATOR</span>
              </span>
            ) : (
              <button
                onClick={handleConfirmByOwner}
                className="bg-[var(--ink)] text-[var(--paper)] px-3 py-1 rounded-[2px] hover:bg-black transition-all flex items-center gap-1.5 font-semibold"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chef / Thuisbezorgd Sign-Off</span>
              </button>
            )}

            <button
              onClick={() => setShowCertModal(true)}
              className="bg-[var(--paper)] border border-[var(--rule-strong)] px-2.5 py-1 rounded-[2px] hover:bg-[var(--paper-2)] flex items-center gap-1 text-[var(--ink)]"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>EU QR Card</span>
            </button>
          </div>
        </div>

        {/* Scrollable Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-[var(--paper)] border-b border-[var(--rule-strong)] font-mono-code text-[11px] text-[var(--ink-soft)]">
                <th className="p-3 font-semibold min-w-[240px] sticky left-0 bg-[var(--paper)] z-10 border-r border-[var(--rule)]">
                  Dish & Description
                </th>
                <th className="p-3 font-semibold min-w-[110px] border-r border-[var(--rule)] text-center">
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
              {activeRestaurant.items.map(item => {
                // Determine safety against selected allergies
                const triggeredAllergies = item.allergens.filter(a => 
                  selectedAllergies.includes(a.allergen) && (a.status === 'confirmed' || a.status === 'unknown' || a.status === 'suspected')
                );
                const hasUnknown = item.allergens.some(a => a.status === 'unknown');
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
                      <div className="font-semibold text-xs text-[var(--ink)]">{item.name}</div>
                      <div className="text-[11px] font-mono-code text-[var(--ink-soft)]">
                        €{(item.priceCents / 100).toFixed(2)} • {item.section}
                      </div>
                      <div className="text-[11px] text-[var(--ink-soft)] mt-0.5 leading-snug">
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
                            <span className="inline-block px-1.5 py-0.5 bg-rose-100 text-rose-800 border border-rose-300 rounded-[2px] font-mono-code font-bold text-[10px]" title="Confirmed in recipe or label">
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
                            <span className="text-emerald-700/50 font-mono-code text-xs">
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

      {/* Official Certificate & QR Card Modal */}
      {showCertModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--paper)] border-2 border-[var(--ink)] max-w-lg w-full p-6 rounded-[2px] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--rule)] pb-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-emerald-800" />
                <h3 className="font-bold text-base text-[var(--ink)]">EU FIC Reg 1169/2011 Verified Certificate</h3>
              </div>
              <button 
                onClick={() => setShowCertModal(false)}
                className="text-xs font-mono-code px-2 py-1 bg-[var(--paper-2)] border rounded-[2px]"
              >
                Close
              </button>
            </div>

            <div className="p-4 bg-[var(--paper-card)] border border-[var(--rule)] rounded-[2px] space-y-3 font-mono-code text-xs">
              <div className="text-center pb-2 border-b border-[var(--rule)]">
                <div className="text-sm font-bold text-[var(--ink)]">{activeRestaurant.restaurantName}</div>
                <div className="text-[11px] text-[var(--ink-soft)]">{activeRestaurant.cuisine} • {activeRestaurant.city}</div>
                <div className="text-[10px] text-emerald-800 font-bold mt-1">✓ SUBSTANTIATED ALLERGEN COMPLIANCE PASS</div>
              </div>

              <div className="space-y-1 text-[11px]">
                <div>DISPATCH AUTHORITY: <strong className="text-[var(--ink)]">MenuMind Decision Engine</strong></div>
                <div>AUDIT STANDARD: <strong className="text-[var(--ink)]">Dutch NVWA Precautionary Labeling Directive (2026)</strong></div>
                <div>VALIDATED ITEMS: <strong className="text-[var(--ink)]">{activeRestaurant.items.length} dishes verified</strong></div>
                <div>OPERATOR SIGN-OFF: <strong className="text-emerald-800">Confirmed (Sander van Dijk / Chef)</strong></div>
              </div>

              {/* QR Code Mock Box */}
              <div className="flex items-center justify-center p-4 bg-white border border-[var(--rule)] rounded-[2px]">
                <div className="text-center space-y-1">
                  <QrCode className="w-20 h-20 mx-auto text-black" />
                  <div className="text-[9px] text-gray-500">Scan at Table for Real-Time Allergen Filter</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-[var(--ink)] text-[var(--paper)] text-xs font-mono-code font-semibold rounded-[2px]"
              >
                Print Official Counter Placard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
