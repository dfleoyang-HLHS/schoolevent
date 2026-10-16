import React, { useState } from 'react';
import { Header } from './components/Header';
import { LegalFrameworkSection } from './components/LegalFrameworkSection';
import { OrganizationSection } from './components/OrganizationSection';
import { FlowchartSection } from './components/FlowchartSection';
import { FaqSection } from './components/FaqSection';
import { MarkdownExportModal } from './components/MarkdownExportModal';
import { TriageWizardModal } from './components/TriageWizardModal';
import { Scale, BookOpen, Users, Compass, HelpCircle, FileText, ExternalLink, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('legal');
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isTriageOpen, setIsTriageOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-stone-800 selection:text-white">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenTriage={() => setIsTriageOpen(true)}
      />

      {/* Hero Marquee Section */}
      <section className="bg-stone-900 text-stone-100 py-12 sm:py-16 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-stone-400">
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
            <p className="text-base sm:text-lg text-stone-300 leading-relaxed font-sans">
              為全國高級中等以下學校行政人員、教師、家長及關心教育之公眾，提供兼具「權威法規引導」與「實務操作流程」的無障礙現代化知識庫。
            </p>
          </div>

          {/* Quick Action Ribbon */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsTriageOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-stone-900 hover:bg-stone-100 rounded-lg text-xs font-semibold transition-all shadow-xs active:scale-95"
            >
              <Compass className="w-4 h-4 text-stone-800" />
              <span>啟動初篩與分流診斷器</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('flow');
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium transition-all border border-stone-700 active:scale-95"
            >
              <Scale className="w-4 h-4 text-amber-400" />
              <span>檢閱 5 階段法定 SOP 流程</span>
            </button>

            <button
              onClick={() => setIsExportOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium transition-all border border-stone-700 active:scale-95"
            >
              <FileText className="w-4 h-4 text-stone-400" />
              <span>匯出全站 Markdown 文本</span>
            </button>
          </div>

          {/* Operational Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-800/80 text-xs text-stone-400">
            <div>
              <div className="font-mono text-stone-200 text-base font-bold">100% 全外聘</div>
              <div className="mt-0.5">調查小組專家人才庫</div>
            </div>
            <div>
              <div className="font-mono text-stone-200 text-base font-bold">20 日法定通知</div>
              <div className="mt-0.5">初篩審查與考核分流</div>
            </div>
            <div>
              <div className="font-mono text-stone-200 text-base font-bold">7 個工作日</div>
              <div className="mt-0.5">受理後法定召開會議</div>
            </div>
            <div>
              <div className="font-mono text-amber-400 text-base font-bold">最高 3 萬元</div>
              <div className="mt-0.5">國教署律師法律諮詢補助</div>
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
      </main>

      {/* Institutional Footer */}
      <footer className="mt-20 border-t border-stone-200 bg-white py-12 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-100 pb-6">
            <div>
              <div className="flex items-center gap-2 font-serif-tc font-bold text-stone-900 text-sm">
                <span>校事會議線上領航站</span>
                <span className="font-normal text-stone-400 font-mono text-xs">· 台灣教育法學實務指引</span>
              </div>
              <p className="text-stone-500 mt-1 max-w-xl">
                本系統依據教育部主管法規共用系統最新公布條文規劃編纂，旨在增進教育夥伴對正當法律程序、免責阻卻條款與實質調查權利之理解。
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-stone-500">
              <span className="hover:text-stone-800 transition-colors">《教師法》</span>
              <span className="hover:text-stone-800 transition-colors">《解聘不續聘停聘資遣辦法》</span>
              <span className="hover:text-stone-800 transition-colors">《教師成績考核辦法》</span>
              <span className="hover:text-stone-800 transition-colors">《行政程序法》</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 text-[11px]">
            <div>
              © 2026 校事會議線上領航站 Editorial Legal Guide. 繁體中文無障礙版.
            </div>
            <div>
              法律效力仍以教育部正式發布之行政規章與司法裁判實務見解為準.
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
    </div>
  );
}
