import React from 'react';
import { BookOpen, FileText, Compass, Download, ShieldCheck, GraduationCap, Scale, Users, HelpCircle } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Brand Zone */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-900 text-white flex items-center justify-center font-serif-tc font-bold text-base shadow-xs ring-1 ring-blue-950/20">
              領
            </div>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('legal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap hover:text-blue-900 transition-colors"
            >
              校事會議線上領航站
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('legal')}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-md text-sm cursor-pointer ${
                activeTab === 'legal'
                  ? 'bg-blue-50 text-blue-900 font-semibold border border-blue-200/70 shadow-xs'
                  : 'hover:text-blue-900 hover:bg-slate-100/70'
              }`}
            >
              法規引用
            </button>
            <button
              onClick={() => setActiveTab('org')}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-md text-sm cursor-pointer ${
                activeTab === 'org'
                  ? 'bg-blue-50 text-blue-900 font-semibold border border-blue-200/70 shadow-xs'
                  : 'hover:text-blue-900 hover:bg-slate-100/70'
              }`}
            >
              組織運作
            </button>
            <button
              onClick={() => setActiveTab('flow')}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-md text-sm cursor-pointer ${
                activeTab === 'flow'
                  ? 'bg-blue-50 text-blue-900 font-semibold border border-blue-200/70 shadow-xs'
                  : 'hover:text-blue-900 hover:bg-slate-100/70'
              }`}
            >
              流程處理 SOP
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-md text-sm cursor-pointer ${
                activeTab === 'faq'
                  ? 'bg-blue-50 text-blue-900 font-semibold border border-blue-200/70 shadow-xs'
                  : 'hover:text-blue-900 hover:bg-slate-100/70'
              }`}
            >
              常見問答 FAQ
            </button>
            <button
              onClick={() => setActiveTab('talent')}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-md text-sm cursor-pointer ${
                activeTab === 'talent'
                  ? 'bg-blue-50 text-blue-900 font-semibold border border-blue-200/70 shadow-xs'
                  : 'hover:text-blue-900 hover:bg-slate-100/70'
              }`}
            >
              校園人才庫
            </button>

            {/* Quick Diagnostic launcher in menu */}
            <button
              onClick={onOpenTriage}
              className="flex items-center gap-1.5 ml-2 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>分流診斷器</span>
            </button>
          </nav>

          {/* Zone 3: Primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>匯出完整 Markdown</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-200 bg-slate-50/95 px-2 py-2 text-xs text-slate-600">
        <button
          onClick={() => setActiveTab('legal')}
          className={`px-2.5 py-1 rounded transition-colors ${
            activeTab === 'legal' ? 'bg-blue-900 font-semibold text-white shadow-xs' : 'hover:text-blue-900'
          }`}
        >
          法規
        </button>
        <button
          onClick={() => setActiveTab('org')}
          className={`px-2.5 py-1 rounded transition-colors ${
            activeTab === 'org' ? 'bg-blue-900 font-semibold text-white shadow-xs' : 'hover:text-blue-900'
          }`}
        >
          組織
        </button>
        <button
          onClick={() => setActiveTab('flow')}
          className={`px-2.5 py-1 rounded transition-colors ${
            activeTab === 'flow' ? 'bg-blue-900 font-semibold text-white shadow-xs' : 'hover:text-blue-900'
          }`}
        >
          SOP
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-2.5 py-1 rounded transition-colors ${
            activeTab === 'faq' ? 'bg-blue-900 font-semibold text-white shadow-xs' : 'hover:text-blue-900'
          }`}
        >
          QA
        </button>
        <button
          onClick={() => setActiveTab('talent')}
          className={`px-2.5 py-1 rounded transition-colors ${
            activeTab === 'talent' ? 'bg-blue-900 font-semibold text-white shadow-xs' : 'hover:text-blue-900'
          }`}
        >
          人才庫
        </button>
        <button
          onClick={onOpenTriage}
          className="px-2 py-1 rounded text-blue-700 font-semibold bg-blue-50 border border-blue-200"
        >
          診斷
        </button>
      </div>
    </header>
  );
};
