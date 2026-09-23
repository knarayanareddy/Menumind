export type AllergenType = 
  | 'peanuts'
  | 'tree_nuts'
  | 'crustaceans'
  | 'molluscs'
  | 'fish'
  | 'eggs'
  | 'milk'
  | 'soy'
  | 'gluten'
  | 'sesame'
  | 'celery'
  | 'mustard'
  | 'lupin'
  | 'sulfites';

export interface AllergenStatus {
  allergen: AllergenType;
  label: string;
  status: 'confirmed' | 'suspected' | 'unknown' | 'absent';
  source?: 'printed_label' | 'tavily_grounding' | 'fallback_unknown';
}

export interface MenuItem {
  id: string;
  name: string;
  priceCents: number;
  currency: string;
  section: string;
  printedDescription: string;
  allergenInfoPresent: boolean;
  allergens: AllergenStatus[];
  tavilyGroundingUsed: boolean;
  tavilyNotes?: string;
  injectionDetected?: boolean;
  injectionConfidence?: number;
  status: 'ALLOW' | 'QUEUE' | 'BLOCK';
  statusReason: string;
  publishable: boolean;
}

export interface MenuFixture {
  id: string;
  title: string;
  restaurantName: string;
  cuisine: string;
  sourceType: 'Chalkboard Photo' | 'Messy Paper Menu' | 'Adversarial Prompt Injection' | 'Standard Digital Catalog';
  rawInputText: string;
  imageUrl?: string;
  items: MenuItem[];
  summary: string;
  targetRisk: 'High-Hazard Allergen' | 'Prompt Injection' | 'Ambiguous Ethnic Dishes' | 'Clean Catalog';
}

export interface PipelineStep {
  id: number;
  phase: string;
  title: string;
  status: 'pending' | 'running' | 'completed' | 'flagged';
  durationMs: number;
  details: string;
  outputSnippet?: string;
}

export interface AuditReceipt {
  jobId: string;
  inputHash: string;
  timestamp: string;
  actor: 'human' | 'policy_engine';
  reviewerName: string;
  modelEngine: string;
  endpoint: string;
  totalTokens: number;
  costEuros: number;
  latencyMs: number;
  action: 'ALLOW' | 'QUEUE' | 'BLOCK';
  spansCount: number;
  traceId: string;
  exhibitHash: string;
}

export interface EvalFixture {
  id: string;
  name: string;
  category: string;
  nebiusResult: string;
  nebiusLatency: number;
  nebiusCost: number;
  nebiusPassed: boolean;
  sonnetResult: string;
  sonnetLatency: number;
  sonnetCost: number;
  sonnetPassed: boolean;
  peanutFalseNegative: boolean;
}

export interface RepoSkin {
  id: 'menumind' | 'listguard' | 'clausewindow' | 'exhibit';
  name: string;
  vertical: string;
  primaryCustomer: string;
  tokenFactoryEngine: string;
  regulatoryDriver: string;
  demoHook: string;
  failClosedRule: string;
}

export interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  content: {
    headline: string;
    bullets: string[];
    keyStats?: { label: string; value: string; badge?: string }[];
    codeSnippet?: string;
    speakerNotes: string;
  };
}
