import React, { useState, useMemo } from 'react';
import { OFFICIAL_STATUTES_LIST, OfficialStatuteDoc } from '../data/statutesFullData';
import {
  X,
  BookOpen,
  Search,
  ExternalLink,
  Printer,
  Copy,
  Check,
  FileText,
  Download,
  ZoomIn,
  ZoomOut,
  Scale,
  Calendar,
  Building2,
  FileCheck2
} from 'lucide-react';

interface StatuteReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStatuteId?: string;
  initialArticleNo?: string;
}

export const StatuteReaderModal: React.FC<StatuteReaderModalProps> = ({
  isOpen,
  onClose,
  initialStatuteId = 'statute-dismissal',
  initialArticleNo
}) => {
  const [selectedStatuteId, setSelectedStatuteId] = useState<string>(initialStatuteId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync if initial props change
  React.useEffect(() => {
    if (initialStatuteId) {
      setSelectedStatuteId(initialStatuteId);
    }
    if (initialArticleNo) {
      setSearchQuery(initialArticleNo);
    }
  }, [initialStatuteId, initialArticleNo, isOpen]);

  const currentStatute = useMemo(() => {
    return OFFICIAL_STATUTES_LIST.find((s) => s.id === selectedStatuteId) || OFFICIAL_STATUTES_LIST[0];
  }, [selectedStatuteId]);

  // Filter sections & articles by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return currentStatute.sections;
    const q = searchQuery.trim().toLowerCase();

    return currentStatute.sections
      .map((section) => {
        const matchedArticles = section.articles.filter(
          (art) =>
            art.articleNo.toLowerCase().includes(q) ||
            art.articleNo.replace(/\s+/g, '').includes(q.replace(/\s+/g, '')) ||
            (art.title && art.title.toLowerCase().includes(q)) ||
            art.content.toLowerCase().includes(q)
        );
        return {
          ...section,
          articles: matchedArticles
        };
      })
      .filter((section) => section.articles.length > 0);
  }, [currentStatute, searchQuery]);

  if (!isOpen) return null;

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyFullStatute = () => {
    const header = `【${currentStatute.name}】\n發布日期：${currentStatute.promulgationDate}\n令號：${currentStatute.docNo}\n官方網址：${currentStatute.moeUrl}\n----------------------------------------\n\n`;
    const body = currentStatute.sections
      .map((sec) => {
        const secHeader = `### ${sec.sectionTitle}\n`;
        const arts = sec.articles
          .map((a) => `${a.articleNo}${a.title ? ' ' + a.title : ''}\n${a.content}\n`)
          .join('\n');
        return secHeader + arts;
      })
      .join('\n');

    navigator.clipboard.writeText(header + body);
    setCopiedId('full-statute');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const fontSizeClass = {
    sm: 'text-xs leading-relaxed',
    base: 'text-sm leading-relaxed',
    lg: 'text-base leading-loose'
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/75 backdrop-blur-xs print:p-0 print:bg-white">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden print:max-w-none print:max-h-none print:shadow-none print:border-none print:rounded-none">
        {/* Top Header Bar */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-850/90 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-900 dark:bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-serif-tc font-bold text-slate-900 dark:text-slate-100">
                  教育部主管法規條文全文檢閱視窗
                </h2>
                <span className="text-[11px] font-mono bg-blue-100 dark:bg-blue-950/70 text-blue-900 dark:text-sky-300 px-2 py-0.5 rounded font-semibold border border-blue-200 dark:border-blue-800">
                  官方權威版本
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                完整收錄現行最新條文文本，支援即時關鍵字過濾、字體調節與官方 PDF 連結
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Direct MOE Official Link Button with PDF indicator */}
            <a
              href={currentStatute.moeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 dark:bg-sky-950/70 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-900 dark:text-sky-300 border border-sky-300 dark:border-sky-800 rounded-lg text-xs font-semibold transition-colors shadow-2xs"
              title="前往教育部主管法規共用系統官方網頁（可直接下載教育部官方 PDF 檔）"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sky-700 dark:text-sky-400" />
              <span>教育部官方 PDF 連結</span>
            </a>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors border border-slate-300 dark:border-slate-700 cursor-pointer"
              title="列印或另存為 PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span className="hidden sm:inline">列印 / 存為 PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="關閉視窗"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Statute Selector Tabs */}
        <div className="px-5 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-850/60 flex flex-wrap items-center justify-between gap-2 print:hidden">
          <div className="flex flex-wrap items-center gap-1.5">
            {OFFICIAL_STATUTES_LIST.map((statute) => {
              const isSelected = statute.id === selectedStatuteId;
              return (
                <button
                  key={statute.id}
                  onClick={() => {
                    setSelectedStatuteId(statute.id);
                    setSearchQuery('');
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-900 dark:bg-blue-600 text-white shadow-xs font-semibold'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-blue-900 dark:hover:text-sky-300'
                  }`}
                >
                  {statute.shortName}
                </button>
              );
            })}
          </div>

          {/* Font zoom controls */}
          <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mr-1">字級：</span>
            <button
              onClick={() => setFontSize('sm')}
              className={`px-2 py-0.5 rounded border text-xs cursor-pointer ${fontSize === 'sm' ? 'bg-blue-100 dark:bg-blue-950/80 border-blue-400 dark:border-blue-700 text-blue-900 dark:text-sky-300 font-bold' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}
            >
              小
            </button>
            <button
              onClick={() => setFontSize('base')}
              className={`px-2 py-0.5 rounded border text-xs cursor-pointer ${fontSize === 'base' ? 'bg-blue-100 dark:bg-blue-950/80 border-blue-400 dark:border-blue-700 text-blue-900 dark:text-sky-300 font-bold' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}
            >
              中
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`px-2 py-0.5 rounded border text-xs cursor-pointer ${fontSize === 'lg' ? 'bg-blue-100 dark:bg-blue-950/80 border-blue-400 dark:border-blue-700 text-blue-900 dark:text-sky-300 font-bold' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'}`}
            >
              大
            </button>
          </div>
        </div>

        {/* Search & Metadata Toolbar */}
        <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
          {/* Real-time search inside statute */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋法條編號或內文（如：第9條、阻卻違法、20日）..."
              className="w-full pl-9 pr-7 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyFullStatute}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer shadow-2xs"
            >
              {copiedId === 'full-statute' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-blue-700 dark:text-sky-400" />
                  <span className="text-blue-900 dark:text-sky-300 font-semibold">已複製該法規全文</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>複製本法全文文字</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-white dark:bg-slate-900">
          {/* Statute Title Header Banner */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-blue-700 dark:text-sky-400">
              <span className="bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded font-semibold">
                {currentStatute.category}
              </span>
              <span>·</span>
              <span>{currentStatute.promulgationDate}</span>
              <span>·</span>
              <span>{currentStatute.docNo}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif-tc font-bold text-slate-900 dark:text-slate-100">
              {currentStatute.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl pt-1">
              {currentStatute.summary}
            </p>

            {/* Official MOE notice badge */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                <span>法源主管機關：教育部國民及學前教育署</span>
              </div>
              <span>·</span>
              <a
                href={currentStatute.moeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 dark:text-sky-400 hover:text-blue-900 dark:hover:text-sky-300 font-medium underline inline-flex items-center gap-1"
              >
                <span>教育部主管法規共用系統（點此開啟官方頁面與下載官方 PDF）</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Sections and Articles List */}
          {filteredSections.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm space-y-2">
              <div>查無包含「{searchQuery}」之法條內容。</div>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs px-3 py-1 bg-blue-900 dark:bg-blue-600 text-white rounded-md hover:bg-blue-800 dark:hover:bg-blue-500"
              >
                清除搜尋條件
              </button>
            </div>
          ) : (
            filteredSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-4">
                <h3 className="text-base sm:text-lg font-serif-tc font-bold text-slate-900 dark:text-slate-100 pb-2 border-b-2 border-blue-900/40 dark:border-blue-700/60 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-700 dark:bg-sky-400" />
                  <span>{section.sectionTitle}</span>
                </h3>

                <div className="space-y-4">
                  {section.articles.map((art) => {
                    const isCopied = copiedId === art.articleNo;
                    return (
                      <div
                        key={art.articleNo}
                        id={`art-${art.articleNo.replace(/\s+/g, '')}`}
                        className="bg-slate-50/70 dark:bg-slate-850/70 border border-slate-200/90 dark:border-slate-800 rounded-xl p-4 sm:p-5 hover:border-blue-300 dark:hover:border-blue-700 transition-all space-y-2.5"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="text-sm sm:text-base font-serif-tc font-bold text-blue-950 dark:text-sky-300">
                              {art.articleNo}
                            </span>
                            {art.title && (
                              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                                {art.title}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => handleCopyText(art.articleNo, `【${currentStatute.name} ${art.articleNo}${art.title ? ' ' + art.title : ''}】\n${art.content}`)}
                            className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 hover:text-blue-900 dark:hover:text-sky-300 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                            title="複製此法條原文"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-blue-700 dark:text-sky-400" />
                                <span className="text-blue-900 dark:text-sky-300 font-semibold">已複製</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>複製法條</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Article Text */}
                        <div className={`text-slate-800 dark:text-slate-200 whitespace-pre-line font-sans ${fontSizeClass}`}>
                          {art.content}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 print:hidden">
          <div className="flex items-center gap-2">
            <span>本站法條資料依教育部 115 年 10 月最新公布法規共用系統標準條文庫建立</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={currentStatute.moeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 dark:text-sky-400 hover:underline inline-flex items-center gap-1 font-medium"
            >
              <span>教育部官方線上 PDF 下載專區</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg font-medium transition-colors cursor-pointer"
            >
              關閉視窗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
