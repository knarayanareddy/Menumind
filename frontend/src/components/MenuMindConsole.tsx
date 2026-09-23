import React, { useState } from 'react';
import { 
  MenuItem, 
  MenuFixture, 
  PipelineStep, 
  AuditReceipt,
  AllergenStatus 
} from '../types';
import { MENU_FIXTURES, MOCK_RECEIPT } from '../data/mockData';
import { 
  Play, 
  Lock, 
  Check, 
  Volume2, 
  FileText, 
  Search, 
  Database, 
  GitBranch, 
  ShieldAlert, 
  UserCheck, 
  Hash, 
  Layers, 
  ChevronRight,
  RefreshCw,
  Edit2
} from 'lucide-react';

interface MenuMindConsoleProps {
  killSwitchActive: boolean;
}

export const MenuMindConsole: React.FC<MenuMindConsoleProps> = ({ killSwitchActive }) => {
  const [selectedFixture, setSelectedFixture] = useState<MenuFixture>(MENU_FIXTURES[0]);
  const [customText, setCustomText] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [isExecuting, setIsProcessing] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(4);
  const [activeItems, setActiveItems] = useState<MenuItem[]>(MENU_FIXTURES[0].items);
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const [selectedItemForReview, setSelectedItemForReview] = useState<MenuItem | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const [showFlowGraph, setShowFlowGraph] = useState<boolean>(true);
  const [auditReceipt, setAuditReceipt] = useState<AuditReceipt>(MOCK_RECEIPT);
  const [operatorNotes, setOperatorNotes] = useState<string>('');
  const [publishAttemptMessage, setPublishAttemptMessage] = useState<string | null>(null);

  const pipelineSteps: PipelineStep[] = [
    {
      id: 1,
      phase: 'Phase 1',
      title: 'Modal Worker + Winnow Compactor',
      status: activeStepIndex >= 0 ? (activeStepIndex === 0 ? 'running' : 'completed') : 'pending',
      durationMs: 1.4,
      details: 'SHA-256 Hash computed. Stripped 42 useless whitespace bytes in 1.4ms with 0% semantic loss.',
      outputSnippet: 'hash: e3b0c44298... | len_raw: 482 -> len_compact: 440',
    },
    {
      id: 2,
      phase: 'Phase 2',
      title: 'Nebius Qwen3-VL Extraction',
      status: activeStepIndex >= 1 ? (activeStepIndex === 1 ? 'running' : 'completed') : 'pending',
      durationMs: 42.0,
      details: 'Nebius Token Factory Qwen/Qwen3-VL-30B-A3B extracted dish entities, sections, prices in cents.',
      outputSnippet: 'entities: 3 items | currency: EUR | confidence: 0.992',
    },
    {
      id: 3,
      phase: 'Phase 3',
      title: 'Tavily Culinary Recipe Grounding',
      status: activeStepIndex >= 2 ? (activeStepIndex === 2 ? 'running' : 'completed') : 'pending',
      durationMs: 22.5,
      details: 'Grounding ethnic/ambiguous dishes (e.g. "Satay Ayam", "Trassi") against recipe databases.',
      outputSnippet: 'tavily_result: Satay sauce contains ground peanuts & arachis oil. Grounding confirmed.',
    },
    {
      id: 4,
      phase: 'Phase 4',
      title: 'Qwen3-8B EU-14 Strict JSON Logits',
      status: activeStepIndex >= 3 ? (activeStepIndex === 3 ? 'running' : 'completed') : 'pending',
      durationMs: 18.1,
      details: 'Categorizing EU FIC Reg 1169/2011 Annex II mandatory allergens into closed-set schemas.',
      outputSnippet: 'logits: peanut=UNKNOWN (0.99), soy=SUSPECTED | schema_errors: 0',
    },
    {
      id: 5,
      phase: 'Phase 5',
      title: 'Fail-Closed Python Policy DAG',
      status: activeStepIndex >= 4 ? (selectedFixture.id === 'mm-inject-01' ? 'flagged' : 'completed') : 'pending',
      durationMs: 0.8,
      details: 'app/skins/menumind/policy.py evaluated state. Missing peanut disclosure forced UNKNOWN -> Publish LOCKED.',
      outputSnippet: 'action: QUEUE | publishable: False | reason: EU FIC Reg 1169/2011 Fail-Closed Gate',
    },
  ];

  // Run pipeline simulation when fixture changes
  const runPipelineSimulation = (fixture: MenuFixture) => {
    setIsProcessing(true);
    setActiveStepIndex(0);
    setAudioPlayed(false);
    setPublishAttemptMessage(null);

    const stepTimimer = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev < 4) {
          return prev + 1;
        } else {
          clearInterval(stepTimimer);
          setIsProcessing(false);
          setActiveItems(fixture.items);
          
          // Update receipt
          setAuditReceipt({
            ...MOCK_RECEIPT,
            jobId: `job_${fixture.id}_${Math.floor(Math.random() * 90000 + 10000)}`,
            timestamp: new Date().toISOString(),
            action: fixture.id === 'mm-inject-01' ? 'BLOCK' : fixture.items.some(i => !i.publishable) ? 'QUEUE' : 'ALLOW',
            costEuros: fixture.id === 'mm-clean-03' ? 0.06 : 0.08,
            latencyMs: Math.floor(Math.random() * 15 + 75),
          });
          return 4;
        }
      });
    }, 220);
  };

  const handleSelectFixture = (fixture: MenuFixture) => {
    setSelectedFixture(fixture);
    setIsCustomMode(false);
    runPipelineSimulation(fixture);
  };

  const handlePlayElevenLabsAudio = () => {
    setAudioPlayed(true);
    // Web Speech API fallback audio synthesis or clear sound cue
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        "Hazard detected. Satay dish missing peanut disclosure. Publish locked."
      );
      utterance.rate = 1.0;
      utterance.pitch = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleToggleAllergenStatus = (itemId: string, allergenType: string) => {
    setActiveItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const updatedAllergens = item.allergens.map((alg) => {
            if (item.allergens.some((a) => a.allergen === allergenType)) {
              if (alg.allergen === allergenType) {
                const nextStatusMap: Record<AllergenStatus['status'], AllergenStatus['status']> = {
                  unknown: 'confirmed',
                  confirmed: 'absent',
                  suspected: 'confirmed',
                  absent: 'unknown',
                };
                return { ...alg, status: nextStatusMap[alg.status] };
              }
              return alg;
            }
            return alg;
          });

          // Re-check publishable status
          const hasUnknown = updatedAllergens.some((a) => a.status === 'unknown');
          return {
            ...item,
            allergens: updatedAllergens,
            publishable: !hasUnknown && !item.injectionDetected,
            status: hasUnknown ? 'QUEUE' : item.injectionDetected ? 'BLOCK' : 'ALLOW',
          };
        }
        return item;
      })
    );
  };

  const handleOperatorApproveItem = (itemId: string) => {
    setActiveItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const resolvedAllergens = item.allergens.map((a) =>
            a.status === 'unknown' ? { ...a, status: 'confirmed' as const, source: 'printed_label' as const } : a
          );
          return {
            ...item,
            allergens: resolvedAllergens,
            publishable: true,
            status: 'ALLOW',
            statusReason: `Verified & approved by Sander van Dijk (Sr Partner Onboarding Lead) @ ${new Date().toLocaleTimeString()}`,
          };
        }
        return item;
      })
    );
    setSelectedItemForReview(null);
  };

  const handleAttemptPublish = () => {
    const blockedItems = activeItems.filter((i) => !i.publishable);
    if (killSwitchActive) {
      setPublishAttemptMessage('PUBLISH BLOCKED: Recommendations frozen via Emergency Kill Switch.');
    } else if (blockedItems.length > 0) {
      setPublishAttemptMessage(
        `PUBLISH LOCKED: ${blockedItems.length} dish(es) fail EU FIC Reg 1169/2011 safety gate. Missing allergen disclosure is UNKNOWN.`
      );
      handlePlayElevenLabsAudio();
    } else {
      setPublishAttemptMessage('CATALOG PUBLISHED: All items verified and pushed to Just Eat Takeaway (Takeaway.com) live catalog!');
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 space-y-4">
      {/* Top Console Bar / Named Customer Ribbon */}
      <div className="bg-[var(--paper-card)] border border-[var(--rule)] p-3 rounded-[2px] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-800" />
          <span className="font-semibold text-[var(--ink)]">ONBOARDING CONSOLE:</span>
          <span className="text-[var(--ink-soft)]">
            Partner Onboarding Workspace for <strong className="text-[var(--ink)]">Sander van Dijk</strong> (Just Eat Takeaway)
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono-code">
          <span className="bg-[var(--paper-2)] border border-[var(--rule)] px-2 py-0.5 rounded-[2px]">
            EU FIC Reg 1169/2011 Annex II
          </span>
          <span className="bg-[var(--unknown)] text-[var(--ink)] font-bold px-2 py-0.5 rounded-[2px]">
            FAIL-CLOSED RULE: Missing = UNKNOWN
          </span>
        </div>
      </div>

      {/* Main 2-Column Console Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Intake & 5-Phase Pipeline Execution (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Intake Selection Card */}
          <div className="bg-[var(--paper-card)] border border-[var(--rule)] p-3.5 rounded-[2px] space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--rule)] pb-2">
              <h3 className="font-semibold text-sm text-[var(--ink)] flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>1. Menu Intake & Fixtures</span>
              </h3>
              <span className="text-[11px] font-mono-code text-[var(--ink-soft)]">4 Golden Fixtures</span>
            </div>

            {/* Fixture Selector Buttons */}
            <div className="space-y-2">
              {MENU_FIXTURES.map((fixture) => {
                const isSelected = selectedFixture.id === fixture.id && !isCustomMode;
                return (
                  <button
                    key={fixture.id}
                    onClick={() => handleSelectFixture(fixture)}
                    className={`w-full text-left p-2.5 rounded-[2px] border transition-all text-xs space-y-1 ${
                      isSelected
                        ? 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-medium'
                        : 'bg-[var(--paper)] text-[var(--ink)] border-[var(--rule)] hover:bg-[var(--paper-2)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono-code font-bold">{fixture.id}</span>
                      <span
                        className={`text-[10px] font-mono-code px-1.5 py-0.5 rounded-[2px] uppercase ${
                          fixture.targetRisk === 'High-Hazard Allergen'
                            ? 'bg-[#C5A202] text-black font-bold'
                            : fixture.targetRisk === 'Prompt Injection'
                            ? 'bg-[#9B2C1F] text-white font-bold'
                            : fixture.targetRisk === 'Ambiguous Ethnic Dishes'
                            ? 'bg-[var(--queue)] text-white font-bold'
                            : 'bg-[var(--allow)] text-white font-bold'
                        }`}
                      >
                        {fixture.targetRisk}
                      </span>
                    </div>
                    <div className="line-clamp-1 font-semibold">{fixture.title}</div>
                    <div className={`text-[11px] line-clamp-1 ${isSelected ? 'text-amber-200' : 'text-[var(--ink-soft)]'}`}>
                      {fixture.restaurantName} ({fixture.cuisine})
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Input Toggle */}
            <div className="pt-2 border-t border-[var(--rule)]">
              <button
                onClick={() => setIsCustomMode(!isCustomMode)}
                className="w-full text-xs font-mono-code text-center py-1.5 border border-dashed border-[var(--rule-strong)] text-[var(--ink-soft)] hover:text-[var(--ink)] hover:bg-[var(--paper-2)] rounded-[2px]"
              >
                {isCustomMode ? '← Back to Golden Fixtures' : '+ Drop / Paste Custom Menu Text'}
              </button>

              {isCustomMode && (
                <div className="mt-2 space-y-2">
                  <textarea
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Paste unformatted menu text, chalkboard OCR string, or WhatsApp dish list..."
                    className="w-full h-24 p-2 text-xs font-mono-code bg-[var(--paper)] border border-[var(--rule-strong)] rounded-[2px] focus:outline-none focus:ring-1 focus:ring-[var(--ink)]"
                  />
                  <button
                    onClick={() => runPipelineSimulation(selectedFixture)}
                    className="w-full bg-[var(--ink)] text-[var(--paper)] font-mono-code text-xs font-semibold py-2 rounded-[2px] hover:bg-black transition-colors flex items-center justify-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Run MenuMind Pipeline</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 5-Phase Pipeline Execution Step Tracker */}
          <div className="bg-[var(--paper-card)] border border-[var(--rule)] p-3.5 rounded-[2px] space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--rule)] pb-2">
              <h3 className="font-semibold text-sm text-[var(--ink)] flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-800" />
                <span>2. 5-Phase Execution Harness</span>
              </h3>
              {isExecuting && (
                <span className="text-[11px] font-mono-code text-amber-800 font-bold flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Processing...</span>
                </span>
              )}
            </div>

            <div className="space-y-2 text-xs">
              {pipelineSteps.map((step) => (
                <div
                  key={step.id}
                  className={`p-2 rounded-[2px] border transition-all ${
                    step.status === 'running'
                      ? 'bg-amber-50 border-amber-500 font-medium'
                      : step.status === 'completed'
                      ? 'bg-[var(--paper)] border-[var(--rule)]'
                      : step.status === 'flagged'
                      ? 'bg-red-50 border-[#9B2C1F]'
                      : 'bg-[var(--paper-2)] border-transparent opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono-code mb-0.5">
                    <span className="font-bold flex items-center gap-1">
                      <span>{step.phase}:</span>
                      <span>{step.title}</span>
                    </span>
                    <span className="text-[10px] text-[var(--ink-soft)]">{step.durationMs}ms</span>
                  </div>
                  <div className="text-[11px] text-[var(--ink-soft)] leading-tight">{step.details}</div>
                  {step.outputSnippet && (
                    <div className="mt-1 font-mono-code text-[10px] bg-[var(--paper-2)] p-1 rounded-[2px] text-[var(--ink)] overflow-x-auto">
                      {step.outputSnippet}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Audit Receipt & OpenTelemetry Trigger Button */}
            <div className="pt-2 border-t border-[var(--rule)] flex items-center justify-between text-xs">
              <button
                onClick={() => setShowReceiptModal(true)}
                className="font-mono-code text-[11px] text-[var(--ink)] hover:underline flex items-center gap-1 font-semibold"
              >
                <Hash className="w-3.5 h-3.5" />
                <span>View SQLite Receipt & OTel Spans</span>
              </button>
              <button
                onClick={() => setShowFlowGraph(!showFlowGraph)}
                className="font-mono-code text-[11px] text-[var(--ink-soft)] hover:text-[var(--ink)] flex items-center gap-1"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>{showFlowGraph ? 'Hide FlowGraph' : 'Show FlowGraph'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Work Surface & Kitchen Ticket Grid (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* FlowGraph DAG Visualization Drawer */}
          {showFlowGraph && (
            <div className="bg-[var(--paper-card)] border border-[var(--rule)] p-3.5 rounded-[2px] space-y-2">
              <div className="flex items-center justify-between border-b border-[var(--rule)] pb-2 text-xs">
                <h4 className="font-semibold text-[var(--ink)] flex items-center gap-1.5 font-mono-code">
                  <GitBranch className="w-4 h-4 text-amber-800" />
                  <span>FlowGraph DAG State Machine (app/harness/dag.py)</span>
                </h4>
                <span className="font-mono-code text-[10px] text-[var(--ink-soft)]">Models Propose, Code Decides</span>
              </div>

              {/* FlowGraph Diagram Representation */}
              <div className="bg-[var(--paper)] p-3 rounded-[2px] border border-[var(--rule)] font-mono-code text-[11px] overflow-x-auto">
                <div className="flex items-center justify-between min-w-[640px] gap-2">
                  <div className="p-2 border border-[var(--rule-strong)] rounded-[2px] bg-[var(--paper-card)] text-center">
                    <div className="font-bold text-[var(--ink)]">1. Intake Payload</div>
                    <div className="text-[10px] text-[var(--ink-soft)]">SHA-256 Hash</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--ink-soft)]" />

                  <div className="p-2 border border-[var(--rule-strong)] rounded-[2px] bg-[var(--paper-card)] text-center">
                    <div className="font-bold text-[var(--ink)]">2. Nebius Qwen3-VL</div>
                    <div className="text-[10px] text-[var(--ink-soft)]">30B Multimodal</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--ink-soft)]" />

                  <div className="p-2 border border-amber-600 bg-amber-50 rounded-[2px] text-center">
                    <div className="font-bold text-amber-900">3. Tavily Recipe Ground</div>
                    <div className="text-[10px] text-amber-700">Culinary DB Lookup</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--ink-soft)]" />

                  <div className={`p-2 border rounded-[2px] text-center ${
                    selectedFixture.id === 'mm-inject-01'
                      ? 'bg-red-50 border-[#9B2C1F] text-[#9B2C1F]'
                      : 'bg-amber-100 border-amber-600 text-amber-950 font-bold'
                  }`}>
                    <div className="font-bold">4. Fail-Closed Policy</div>
                    <div className="text-[10px]">
                      {selectedFixture.id === 'mm-inject-01' ? 'Prompt Injection Trip' : 'Unstated -> UNKNOWN'}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--ink-soft)]" />

                  <div className="p-2 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] rounded-[2px] text-center">
                    <div className="font-bold">5. Publish GATE</div>
                    <div className="text-[10px] text-amber-200">
                      {activeItems.some(i => !i.publishable) ? 'LOCKED (QUEUE)' : 'VERIFIED (ALLOW)'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Kitchen Ticket Grid / Catalog View Header */}
          <div className="bg-[var(--paper-card)] border border-[var(--rule)] p-3.5 rounded-[2px] space-y-3">
            <div className="flex flex-wrap items-center justify-between border-b border-[var(--rule)] pb-2 gap-2">
              <div>
                <h3 className="font-semibold text-base text-[var(--ink)] flex items-center gap-2">
                  <span>3. Kitchen Ticket Rail & Catalog Triage</span>
                  <span className="text-xs font-mono-code font-normal text-[var(--ink-soft)]">
                    ({activeItems.length} dish items)
                  </span>
                </h3>
                <p className="text-xs text-[var(--ink-soft)]">
                  Restaurant: <strong className="text-[var(--ink)]">{selectedFixture.restaurantName}</strong> • {selectedFixture.cuisine}
                </p>
              </div>

              {/* ElevenLabs Voice Alert Control & Publish Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayElevenLabsAudio}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code font-semibold rounded-[2px] border transition-all ${
                    audioPlayed
                      ? 'bg-amber-100 text-amber-950 border-amber-400'
                      : 'bg-[var(--paper)] text-[var(--ink)] border-[var(--rule-strong)] hover:bg-[var(--paper-2)]'
                  }`}
                  title="Simulate ElevenLabs Audio Dispatch Alert for kitchen leads"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                  <span>{audioPlayed ? 'Audio Dispatched' : 'ElevenLabs Voice Alert'}</span>
                </button>

                <button
                  onClick={handleAttemptPublish}
                  disabled={killSwitchActive}
                  className={`flex items-center gap-2 px-4 py-1.5 text-xs font-mono-code font-bold rounded-[2px] transition-all border ${
                    activeItems.some((i) => !i.publishable) || killSwitchActive
                      ? 'bg-[#9B2C1F] text-white border-[#9B2C1F] cursor-not-allowed'
                      : 'bg-[#3F5A2A] text-white border-[#3F5A2A] hover:bg-emerald-800'
                  }`}
                >
                  {activeItems.some((i) => !i.publishable) || killSwitchActive ? (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>PUBLISH LOCKED</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>PUBLISH TO TAKEAWAY.COM</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Publish Lock Alert Banner if triggered */}
            {publishAttemptMessage && (
              <div className={`p-2.5 rounded-[2px] text-xs font-mono-code flex items-start gap-2 border ${
                publishAttemptMessage.includes('PUBLISHED')
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-400'
                  : 'bg-red-50 text-[#9B2C1F] border-[#9B2C1F]'
              }`}>
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1">{publishAttemptMessage}</div>
              </div>
            )}

            {/* Kitchen Tickets List */}
            <div className="space-y-3">
              {activeItems.map((item) => {
                const hasUnknown = item.allergens.some((a) => a.status === 'unknown');
                const isBlocked = item.status === 'BLOCK' || item.injectionDetected;

                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-[2px] border transition-all space-y-2.5 ${
                      isBlocked
                        ? 'bg-red-50/70 border-[#9B2C1F]'
                        : hasUnknown
                        ? 'bg-[var(--paper)] border-[var(--rule-strong)] shadow-2xs'
                        : 'bg-[var(--paper-card)] border-[var(--rule)]'
                    }`}
                  >
                    {/* Item Top Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[var(--rule)] pb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[var(--ink)]">{item.name}</span>
                          <span className="font-mono-code font-bold text-xs text-[var(--ink)]">
                            €{(item.priceCents / 100).toFixed(2)}
                          </span>
                          <span className="text-[10px] font-mono-code bg-[var(--paper-2)] border border-[var(--rule)] px-1.5 py-0.5 rounded-[2px] text-[var(--ink-soft)]">
                            {item.section}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--ink-soft)] italic mt-0.5">
                          "{item.printedDescription}"
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2">
                        {item.status === 'ALLOW' && <span className="badge-allow">ALLOW</span>}
                        {item.status === 'QUEUE' && <span className="badge-queue">QUEUE (UNSTATED)</span>}
                        {item.status === 'BLOCK' && <span className="badge-block">BLOCK (SECURITY)</span>}

                        <button
                          onClick={() => setSelectedItemForReview(item)}
                          className="px-2 py-1 bg-[var(--paper-2)] border border-[var(--rule-strong)] hover:bg-[var(--ink)] hover:text-[var(--paper)] rounded-[2px] text-[11px] font-mono-code flex items-center gap-1 transition-colors"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Review / Override</span>
                        </button>
                      </div>
                    </div>

                    {/* Prompt Injection Threat Intercept Box */}
                    {item.injectionDetected && (
                      <div className="bg-[#9B2C1F] text-white p-2 rounded-[2px] text-xs font-mono-code space-y-1">
                        <div className="font-bold flex items-center gap-1.5">
                          <ShieldAlert className="w-4 h-4" />
                          <span>HOSTILE PROMPT INJECTION DETECTED (Confidence: {((item.injectionConfidence || 0) * 100).toFixed(1)}%)</span>
                        </div>
                        <div className="text-[11px] text-amber-100">
                          Attacker attempted to overwrite allergen policy. Python policy fail-closed gate locked catalog.
                        </div>
                      </div>
                    )}

                    {/* Allergen Badges Grid */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono-code">
                        <span className="text-[var(--ink-soft)] font-semibold">EU-14 ALLERGEN DISCLOSURE STATUS:</span>
                        {item.tavilyGroundingUsed && (
                          <span className="text-amber-800 font-semibold flex items-center gap-1 text-[10px]">
                            <Search className="w-3 h-3" />
                            <span>Tavily Culinary Grounding Applied</span>
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {item.allergens.map((alg) => (
                          <button
                            key={alg.allergen}
                            onClick={() => handleToggleAllergenStatus(item.id, alg.allergen)}
                            className={`text-xs font-mono-code px-2 py-1 rounded-[2px] transition-all flex items-center gap-1 cursor-pointer border ${
                              alg.status === 'unknown'
                                ? 'bg-[var(--unknown)] text-[var(--ink)] font-bold border-amber-600 shadow-xs'
                                : alg.status === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-900 border-emerald-600 font-semibold'
                                : alg.status === 'suspected'
                                ? 'bg-amber-50 text-amber-900 border-amber-500'
                                : 'bg-[var(--paper-2)] text-[var(--ink-soft)] border-[var(--rule)] opacity-60'
                            }`}
                            title="Click to toggle allergen status (Unknown -> Confirmed -> Absent)"
                          >
                            <span>{alg.label}:</span>
                            <span className="uppercase font-bold">{alg.status}</span>
                          </button>
                        ))}
                      </div>

                      {item.tavilyNotes && (
                        <p className="text-[11px] text-[var(--ink-soft)] font-mono-code bg-[var(--paper)] p-1.5 border border-[var(--rule)] rounded-[2px] mt-1">
                          <strong>Tavily Grounding Note:</strong> {item.tavilyNotes}
                        </p>
                      )}
                    </div>

                    {/* Policy Reason Footer */}
                    <div className="text-[11px] font-mono-code text-[var(--ink-soft)] pt-1 border-t border-[var(--rule)] flex items-center justify-between">
                      <span className="line-clamp-1">
                        <strong>Policy Gate Reason:</strong> {item.statusReason}
                      </span>
                      <span className="shrink-0 text-[10px] text-[var(--ink)] font-semibold">
                        {item.publishable ? '✓ PUBLISHABLE' : '🔒 PUBLISH LOCKED'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Human Operator Review Drawer / Modal */}
      {selectedItemForReview && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--paper-card)] border-2 border-[var(--ink)] max-w-2xl w-full p-4 rounded-[2px] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--rule-strong)] pb-2">
              <h3 className="font-semibold text-base text-[var(--ink)] flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-amber-800" />
                <span>Operator Override: {selectedItemForReview.name}</span>
              </h3>
              <button
                onClick={() => setSelectedItemForReview(null)}
                className="text-xs font-mono-code font-bold px-2 py-1 bg-[var(--paper-2)] border border-[var(--rule)] hover:bg-[var(--ink)] hover:text-[var(--paper)] rounded-[2px]"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[var(--paper)] p-2.5 border border-[var(--rule)] rounded-[2px] space-y-1 font-mono-code">
                <div><strong>Printed Dish Text:</strong> "{selectedItemForReview.printedDescription}"</div>
                <div><strong>Price:</strong> €{(selectedItemForReview.priceCents / 100).toFixed(2)}</div>
                <div><strong>Current Policy Status:</strong> {selectedItemForReview.status}</div>
              </div>

              <div className="space-y-2">
                <label className="font-semibold block text-[var(--ink)]">
                  Verify or Resolve EU-14 Allergens (Sander van Dijk Override):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {selectedItemForReview.allergens.map((alg) => (
                    <div
                      key={alg.allergen}
                      className="p-2 border border-[var(--rule)] rounded-[2px] bg-[var(--paper)] flex items-center justify-between"
                    >
                      <span className="font-mono-code font-bold">{alg.label}:</span>
                      <button
                        onClick={() => handleToggleAllergenStatus(selectedItemForReview.id, alg.allergen)}
                        className="px-2 py-0.5 text-[11px] font-mono-code font-bold bg-[var(--paper-2)] border border-[var(--rule-strong)] rounded-[2px]"
                      >
                        {alg.status.toUpperCase()}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold block text-[var(--ink)]">Operator Verification Note:</label>
                <input
                  type="text"
                  value={operatorNotes}
                  onChange={(e) => setOperatorNotes(e.target.value)}
                  placeholder="e.g. Partner called restaurant owner. Peanut oil confirmed present in satay dipping sauce."
                  className="w-full p-2 bg-[var(--paper)] border border-[var(--rule-strong)] text-xs rounded-[2px]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--rule)] font-mono-code text-xs">
              <button
                onClick={() => setSelectedItemForReview(null)}
                className="px-3 py-1.5 bg-[var(--paper-2)] border border-[var(--rule)] rounded-[2px]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleOperatorApproveItem(selectedItemForReview.id)}
                className="px-4 py-1.5 bg-[var(--ink)] text-[var(--paper)] font-bold rounded-[2px] hover:bg-black"
              >
                Confirm & Resolve Allergen Gate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SQLite Receipt & OTel Spans Modal */}
      {showReceiptModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--paper-card)] border-2 border-[var(--ink)] max-w-3xl w-full p-4 rounded-[2px] space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--rule-strong)] pb-2">
              <h3 className="font-semibold text-base text-[var(--ink)] flex items-center gap-2 font-mono-code">
                <Database className="w-5 h-5 text-amber-800" />
                <span>SQLite Audit Receipt & OpenTelemetry Spans</span>
              </h3>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="text-xs font-mono-code font-bold px-2 py-1 bg-[var(--paper-2)] border border-[var(--rule)] hover:bg-[var(--ink)] hover:text-[var(--paper)] rounded-[2px]"
              >
                ✕ Close
              </button>
            </div>

            <div className="bg-[var(--ink)] text-[var(--paper)] p-3 rounded-[2px] font-mono-code text-xs space-y-2 overflow-x-auto">
              <div className="text-amber-300 font-bold border-b border-amber-800 pb-1">
                // SQLite Immutable Record (app/harness/db.py)
              </div>
              <pre className="text-[11px] leading-relaxed">
{JSON.stringify(
  {
    job_id: auditReceipt.jobId,
    input_sha256: auditReceipt.inputHash,
    timestamp: auditReceipt.timestamp,
    actor: auditReceipt.actor,
    reviewer_name: auditReceipt.reviewerName,
    engine: auditReceipt.modelEngine,
    endpoint: auditReceipt.endpoint,
    total_tokens: auditReceipt.totalTokens,
    cost_euros: auditReceipt.costEuros,
    latency_ms: auditReceipt.latencyMs,
    policy_action: auditReceipt.action,
    spans_count: auditReceipt.spansCount,
    trace_id: auditReceipt.traceId,
    exhibit_dossier_hash: auditReceipt.exhibitHash,
  },
  null,
  2
)}
              </pre>
            </div>

            <div className="text-xs font-mono-code text-[var(--ink-soft)] flex items-center justify-between">
              <span>EU AI Act Article 12/14 Immutable Log Compliance Verified</span>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="px-3 py-1 bg-[var(--ink)] text-[var(--paper)] font-bold rounded-[2px]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
