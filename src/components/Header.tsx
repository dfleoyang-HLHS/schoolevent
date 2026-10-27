import React from 'react';
import { BookOpen, FileText, Compass, Download, GraduationCap, Scale, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExport: () => void;
  onOpenTriage: () => void;
  onOpenStatutes?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
  onOpenTriage,
  onOpenStatutes,
}) => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-6 h-16">
          {/* Zone 1: Brand Zone */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-900 dark:bg-blue-600 text-white flex items-center justify-center font-serif-tc font-bold text-base shadow-xs ring-1 ring-blue-950/20 dark:ring-blue-400/30">
              領
            </div>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('legal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap hover:text-blue-900 dark:hover:text-sky-300 transition-colors"
            >
              校事會議線上領航站
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveTab('legal')}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-md text-sm cursor-pointer ${
                activeTab === 'legal'
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-sky-300 font-semibold border border-blue-200/70 dark:border-blue-700/60 shadow-xs'
                  : 'hover:text-blue-900 dark:hover:text-sky-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
              }`}
            >
              法規引用
            </button>
            <button
              onClick={() => setActiveTab('org')}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-md text-sm cursor-pointer ${
                activeTab === 'org'
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-sky-300 font-semibold border border-blue-200/70 dark:border-blue-700/60 shadow-xs'
                  : 'hover:text-blue-900 dark:hover:text-sky-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
              }`}
            >
              組織運作
            </button>
            <button
              onClick={() => setActiveTab('flow')}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-md text-sm cursor-pointer ${
                activeTab === 'flow'
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-sky-300 font-semibold border border-blue-200/70 dark:border-blue-700/60 shadow-xs'
                  : 'hover:text-blue-900 dark:hover:text-sky-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
              }`}
            >
              流程處理 SOP
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-md text-sm cursor-pointer ${
                activeTab === 'faq'
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-sky-300 font-semibold border border-blue-200/70 dark:border-blue-700/60 shadow-xs'
                  : 'hover:text-blue-900 dark:hover:text-sky-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
              }`}
            >
              常見問答 FAQ
            </button>
            <button
              onClick={() => setActiveTab('talent')}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-md text-sm cursor-pointer ${
                activeTab === 'talent'
                  ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-900 dark:text-sky-300 font-semibold border border-blue-200/70 dark:border-blue-700/60 shadow-xs'
                  : 'hover:text-blue-900 dark:hover:text-sky-300 hover:bg-slate-100/70 dark:hover:bg-slate-800/70'
              }`}
            >
              校園人才庫
            </button>

            {/* Quick Statute Modal button */}
            {onOpenStatutes && (
              <button
                onClick={onOpenStatutes}
                className="flex items-center gap-1.5 ml-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-950 dark:hover:text-sky-200 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                title="彈出法規全文與官方 PDF 視窗"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-700 dark:text-sky-400" />
                <span>法規視窗</span>
              </button>
            )}

            {/* Quick Diagnostic launcher in menu */}
            <button
              onClick={onOpenTriage}
              className="flex items-center gap-1.5 ml-1 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-sky-300 bg-blue-50/80 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
              <span>分流診斷器</span>
            </button>
          </nav>

          {/* Zone 3: Actions + Day/Night Theme Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Daytime / Nighttime Switch Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer shadow-2xs active:scale-95 bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-sky-200 dark:border-slate-700"
              title={isDark ? '切換為白天版（日間清爽模式）' : '切換為夜間版（夜間冷靜模式）'}
              aria-label={isDark ? '切換為白天版' : '切換為夜間版'}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="hidden sm:inline">白天版</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-blue-700" />
                  <span className="hidden sm:inline">夜間版</span>
                </>
              )}
            </button>

            {/* Export Markdown */}
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs font-medium text-white bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">匯出完整 Markdown</span>
              <span className="sm:hidden">匯出</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-900/95 px-2 py-2 text-xs text-slate-600 dark:text-slate-400">
        <button
          onClick={() => setActiveTab('legal')}
          className={`px-2 py-1 rounded transition-colors ${
            activeTab === 'legal'
              ? 'bg-blue-900 dark:bg-blue-600 font-semibold text-white shadow-xs'
              : 'hover:text-blue-900 dark:hover:text-white'
          }`}
        >
          法規
        </button>
        <button
          onClick={() => setActiveTab('org')}
          className={`px-2 py-1 rounded transition-colors ${
            activeTab === 'org'
              ? 'bg-blue-900 dark:bg-blue-600 font-semibold text-white shadow-xs'
              : 'hover:text-blue-900 dark:hover:text-white'
          }`}
        >
          組織
        </button>
        <button
          onClick={() => setActiveTab('flow')}
          className={`px-2 py-1 rounded transition-colors ${
            activeTab === 'flow'
              ? 'bg-blue-900 dark:bg-blue-600 font-semibold text-white shadow-xs'
              : 'hover:text-blue-900 dark:hover:text-white'
          }`}
        >
          SOP
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-2 py-1 rounded transition-colors ${
            activeTab === 'faq'
              ? 'bg-blue-900 dark:bg-blue-600 font-semibold text-white shadow-xs'
              : 'hover:text-blue-900 dark:hover:text-white'
          }`}
        >
          QA
        </button>
        <button
          onClick={() => setActiveTab('talent')}
          className={`px-2 py-1 rounded transition-colors ${
            activeTab === 'talent'
              ? 'bg-blue-900 dark:bg-blue-600 font-semibold text-white shadow-xs'
              : 'hover:text-blue-900 dark:hover:text-white'
          }`}
        >
          人才庫
        </button>
        {onOpenStatutes && (
          <button
            onClick={onOpenStatutes}
            className="px-2 py-1 rounded text-blue-900 dark:text-sky-300 font-semibold bg-blue-100/70 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800"
          >
            法規視窗
          </button>
        )}
        <button
          onClick={onOpenTriage}
          className="px-2 py-1 rounded text-blue-700 dark:text-sky-300 font-semibold bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700"
        >
          分流診斷
        </button>
      </div>
    </header>
  );
};
