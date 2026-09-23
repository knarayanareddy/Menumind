import { useState } from 'react';
import { Header } from './components/Header';
import { MenuMindConsole } from './components/MenuMindConsole';
import { RepoReview } from './components/RepoReview';
import { EvalTable } from './components/EvalTable';
import { PitchDeck } from './components/PitchDeck';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<'console' | 'repo' | 'eval' | 'deck'>('console');
  const [killSwitchActive, setKillSwitchActive] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)] font-ui selection:bg-[var(--ink)] selection:text-[var(--paper)]">
      {/* Header Chrome Bar & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        killSwitchActive={killSwitchActive}
        setKillSwitchActive={setKillSwitchActive}
      />

      {/* Main View Surface */}
      <main className="flex-1 py-4">
        {activeTab === 'console' && (
          <MenuMindConsole killSwitchActive={killSwitchActive} />
        )}

        {activeTab === 'repo' && (
          <RepoReview />
        )}

        {activeTab === 'eval' && (
          <EvalTable />
        )}

        {activeTab === 'deck' && (
          <PitchDeck />
        )}
      </main>

      {/* Footer Disclaimer Strip */}
      <Footer />
    </div>
  );
}

export default App;
