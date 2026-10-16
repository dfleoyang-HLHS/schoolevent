import React, { useState } from 'react';
import { Header } from './components/Header';
import { LegalFrameworkSection } from './components/LegalFrameworkSection';
import { OrganizationSection } from './components/OrganizationSection';
import { FlowchartSection } from './components/FlowchartSection';
import { FaqSection } from './components/FaqSection';
import { TalentPoolSection } from './components/TalentPoolSection';
import { MarkdownExportModal } from './components/MarkdownExportModal';
import { TriageWizardModal } from './components/TriageWizardModal';
import { StatuteReaderModal } from './components/StatuteReaderModal';
import { Scale, BookOpen, Users, Compass, HelpCircle, FileText, ExternalLink, ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('legal');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isTriageOpen, setIsTriageOpen] = useState<boolean>(false);
  const [isStatuteReaderOpen, setIsStatuteReaderOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-900 selection:text-white">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenTriage={() => setIsTriageOpen(true)}
        onOpenStatutes={() => setIsStatuteReaderOpen(true)}
      />

      {/* Hero Marquee Section - Refined Calm Navy Blue Theme */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-slate-100 py-12 sm:py-16 border-b border-slate-800 shadow-sm relative overflow-hidden">
        {/* Subtle background mesh glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400">
            <span>TAIWAN EDUCATION LEGAL REFORM</span>
            <span aria-hidden="true">·</span>
            <span>民國 115 年新制修法專題</span>
            <span aria-hidden="true">·</span>
            <span>教育部主管法規共用系統最新依準</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-serif-tc font-bold tracking-tight text-white leading-tight">
              校事會議線上領航站
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              為全國高級中等以下學校行政人員、教師、家長及關心教育之公眾，提供兼具「權威法規引導」與「實務操作流程」的無障礙現代化知識庫。
            </p>
          </div>

          {/* Quick Action Ribbon */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsTriageOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-all shadow-md shadow-blue-950/40 active:scale-95 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-white" />
              <span>啟動初篩與分流診斷器</span>
            </button>

            <button
              onClick={() => setIsStatuteReaderOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-900/90 hover:bg-blue-800 text-sky-200 rounded-lg text-xs font-semibold transition-all border border-blue-700/80 active:scale-95 cursor-pointer hover:border-sky-400"
            >
              <BookOpen className="w-4 h-4 text-sky-300" />
              <span>查閱法條全文文字視窗 & 官方 PDF</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('talent');
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700/90 text-sky-300 rounded-lg text-xs font-medium transition-all border border-slate-700/80 active:scale-95 cursor-pointer hover:border-sky-500/40"
            >
              <GraduationCap className="w-4 h-4 text-sky-400" />
              <span>查詢教育部校園人才庫</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('flow');
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 rounded-lg text-xs font-medium transition-all border border-slate-700/80 active:scale-95 cursor-pointer hover:border-slate-600"
            >
              <Scale className="w-4 h-4 text-slate-300" />
              <span>檢閱 5 階段法定 SOP 流程</span>
            </button>

            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 rounded-lg text-xs font-medium transition-all border border-slate-700/80 active:scale-95 cursor-pointer hover:border-slate-600"
            >
              <FileText className="w-4 h-4 text-slate-400" />
              <span>匯出全站 Markdown 文本</span>
            </button>
          </div>

          {/* Operational Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/60">
              <div className="font-mono text-slate-100 text-base font-bold">100% 全外聘</div>
              <div className="mt-0.5 text-slate-400">調查小組專家人才庫</div>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/60">
              <div className="font-mono text-slate-100 text-base font-bold">20 日法定通知</div>
              <div className="mt-0.5 text-slate-400">初篩審查與考核分流</div>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/60">
              <div className="font-mono text-slate-100 text-base font-bold">7 個工作日</div>
              <div className="mt-0.5 text-slate-400">受理後法定召開會議</div>
            </div>
            <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/60">
              <div className="font-mono text-sky-400 text-base font-bold">最高 3 萬元</div>
              <div className="mt-0.5 text-slate-400">國教署律師法律諮詢補助</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {activeTab === 'legal' && <LegalFrameworkSection />}
        {activeTab === 'org' && <OrganizationSection />}
        {activeTab === 'flow' && <FlowchartSection />}
        {activeTab === 'faq' && <FaqSection />}
        {activeTab === 'talent' && <TalentPoolSection />}
      </main>

      {/* Institutional Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-12 text-xs text-slate-600 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900 font-serif-tc flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-blue-900 text-white text-[10px] flex items-center justify-center font-bold">領</span>
                校事會議線上領航站
              </div>
              <p className="text-slate-500">
                依據中華民國現行最新《教師法》、《解聘辦法》、《成績考核辦法》暨國教署補助作業要點編制
              </p>
            </div>
            <div className="flex items-center gap-4 text-slate-500 text-xs">
              <button
                onClick={() => {
                  setActiveTab('legal');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-blue-900 transition-colors cursor-pointer"
              >
                法規體系
              </button>
              <button
                onClick={() => {
                  setActiveTab('org');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-blue-900 transition-colors cursor-pointer"
              >
                組織法定
              </button>
              <button
                onClick={() => {
                  setActiveTab('flow');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-blue-900 transition-colors cursor-pointer"
              >
                SOP流程
              </button>
              <button
                onClick={() => {
                  setActiveTab('faq');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-blue-900 transition-colors cursor-pointer"
              >
                實務問答
              </button>
              <button
                onClick={() => {
                  setActiveTab('talent');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-blue-900 transition-colors cursor-pointer"
              >
                校園人才庫
              </button>
              <button
                onClick={() => setIsStatuteReaderOpen(true)}
                className="text-blue-700 font-semibold hover:underline cursor-pointer"
              >
                法規全文視窗 & PDF
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-slate-400">
            <p>
              © 2026 校事會議線上領航站 · 專業教育法律導航與實務知識庫 · 本站資料僅供校園事件法律實務指引參考
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://edu.law.moe.gov.tw/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-700 flex items-center gap-1 transition-colors"
              >
                <span>教育部主管法規共用系統官方網頁</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <MarkdownExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
      <TriageWizardModal
        isOpen={isTriageOpen}
        onClose={() => setIsTriageOpen(false)}
      />
      <StatuteReaderModal
        isOpen={isStatuteReaderOpen}
        onClose={() => setIsStatuteReaderOpen(false)}
      />
    </div>
  );
}
