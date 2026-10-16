import React from 'react';
import { BookOpen, FileText, Compass, Download, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExport: () => void;
  onOpenTriage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
  onOpenTriage,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element Brand Zone */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center font-serif-tc font-bold text-lg shadow-xs">
              領
            </div>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('legal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap hover:text-stone-700 transition-colors"
            >
              校事會議線上領航站
            </a>
          </div>

          {/* Zone 2: 4–5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <button
              onClick={() => setActiveTab('legal')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 text-sm ${
                activeTab === 'legal'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent hover:text-stone-900'
              }`}
            >
              法規引用
            </button>
            <button
              onClick={() => setActiveTab('org')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 text-sm ${
                activeTab === 'org'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent hover:text-stone-900'
              }`}
            >
              組織運作
            </button>
            <button
              onClick={() => setActiveTab('flow')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 text-sm ${
                activeTab === 'flow'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent hover:text-stone-900'
              }`}
            >
              流程處理 SOP
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 text-sm ${
                activeTab === 'faq'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent hover:text-stone-900'
              }`}
            >
              常見問答 FAQ
            </button>
            <button
              onClick={() => setActiveTab('talent')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 text-sm ${
                activeTab === 'talent'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent hover:text-stone-900'
              }`}
            >
              校園人才庫
            </button>
            <button
              onClick={onOpenTriage}
              className="flex items-center gap-1.5 text-stone-700 hover:text-stone-950 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              <Compass className="w-3.5 h-3.5 text-stone-700" />
              <span>分流診斷器</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-50 bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs active:scale-[0.98]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>匯出完整 Markdown</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 bg-stone-100/90 px-2 py-1.5 text-xs text-stone-600">
        <button
          onClick={() => setActiveTab('legal')}
          className={`px-2.5 py-1 rounded ${activeTab === 'legal' ? 'bg-white font-semibold text-stone-900 shadow-xs' : ''}`}
        >
          法規引用
        </button>
        <button
          onClick={() => setActiveTab('org')}
          className={`px-2.5 py-1 rounded ${activeTab === 'org' ? 'bg-white font-semibold text-stone-900 shadow-xs' : ''}`}
        >
          組織運作
        </button>
        <button
          onClick={() => setActiveTab('flow')}
          className={`px-2.5 py-1 rounded ${activeTab === 'flow' ? 'bg-white font-semibold text-stone-900 shadow-xs' : ''}`}
        >
          SOP流程
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-2.5 py-1 rounded ${activeTab === 'faq' ? 'bg-white font-semibold text-stone-900 shadow-xs' : ''}`}
        >
          實務QA
        </button>
        <button
          onClick={() => setActiveTab('talent')}
          className={`px-2.5 py-1 rounded ${activeTab === 'talent' ? 'bg-white font-semibold text-stone-900 shadow-xs' : ''}`}
        >
          校園人才庫
        </button>
      </div>
    </header>
  );
};
