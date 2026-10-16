import React, { useState } from 'react';
import { CORE_LAWS, REFORM_COMPARISONS, LawArticle } from '../data/lawsData';
import { Search, ChevronDown, ChevronUp, Copy, Check, Scale, ShieldAlert, Sparkles, BookOpen, AlertCircle } from 'lucide-react';

export const LegalFrameworkSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedLawId, setExpandedLawId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['全部', '教師法', '解聘辦法', '考核辦法', '救濟與補助'];

  const filteredLaws = CORE_LAWS.filter((law) => {
    const matchesCategory = selectedCategory === '全部' || law.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      law.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.rawText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.vernacular.toLowerCase().includes(searchQuery.toLowerCase()) ||
      law.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="space-y-12">
      {/* Editorial Chapter Header */}
      <div className="border-b border-stone-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-serif-tc tracking-widest text-stone-500 mb-2">
          <span>CHAPTER 01</span>
          <span aria-hidden="true">·</span>
          <span>LEGAL FRAMEWORK & REFORM</span>
          <span aria-hidden="true">·</span>
          <span>民國 115 年最新體系</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-tc font-bold text-stone-900 tracking-tight">
          法規引用頁：母法源頭與新制變革總覽
        </h1>
        <p className="mt-3 text-base text-stone-600 max-w-3xl leading-relaxed">
          全面梳理現行最新《教師法》、民國 115 年 10 月修正之《高級中等以下學校教師解聘不續聘停聘或資遣辦法》、
          《公立高級中等以下學校教師成績考核辦法》第 6 條之一，以及教育部國教署 115 年 10 月 14 日最新訂定之
          「教師法律諮詢作業要點」。以白話拆解法理，指引行政操作與權益保障。
        </p>

        {/* 115 年最新法規要點快報 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-200/60 text-xs text-stone-700">
          <div className="p-3 bg-stone-100 rounded-lg border border-stone-200">
            <div className="font-semibold text-stone-900 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-stone-800" />
              <span>解聘辦法 & 考核辦法最新修正</span>
            </div>
            <p className="mt-1 text-stone-600">
              民國 115 年 10 月 7 日令公布實施。明定初篩分流機制、阻卻違法不罰結案、以及考核辦法第 6-1 條校內自查期程。
            </p>
          </div>
          <div className="p-3 bg-stone-100 rounded-lg border border-stone-200">
            <div className="font-semibold text-stone-900 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-stone-800" />
              <span>全外聘人才庫制度健全化</span>
            </div>
            <p className="mt-1 text-stone-600">
              校事會議調查小組一律 100% 全數外聘，主管機關自中央人才庫推舉 3~5 倍名單，必須納入法律學者專家至少 1 人。
            </p>
          </div>
          <div className="p-3 bg-stone-100 rounded-lg border border-stone-200">
            <div className="font-semibold text-stone-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-stone-800" />
              <span>教師法律諮詢專案最高補助3萬</span>
            </div>
            <p className="mt-1 text-stone-600">
              民國 115 年 10 月 14 日令訂定。學校組成調查小組起至報告完成止，提供受調查教師法律諮詢費用每人以 3 萬元為原則。
            </p>
          </div>
        </div>
      </div>

      {/* 新舊制核心差異對照表 (Core Differences) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif-tc font-bold text-stone-900">
              新舊制核心機制變革對照
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              分析近年修法之關鍵精神：從「逢案必查、全校涉入」走向「二階段初篩分流、全外聘專業調查與人身防衛保障」。
            </p>
          </div>
        </div>

        <div className="overflow-x-auto border border-stone-200 rounded-xl bg-white shadow-2xs">
          <table className="w-full text-left text-sm text-stone-700 border-collapse">
            <thead>
              <tr className="bg-stone-100/80 border-b border-stone-200 text-stone-900 font-serif-tc">
                <th className="py-3.5 px-4 font-semibold w-1/5 whitespace-nowrap">改革面向</th>
                <th className="py-3.5 px-4 font-semibold w-2/5 text-stone-600">修正前（舊制痛點）</th>
                <th className="py-3.5 px-4 font-semibold w-2/5 text-stone-900">最新修正現行法規（新制突破）</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {REFORM_COMPARISONS.map((comp, idx) => (
                <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-4 px-4 font-medium text-stone-900 align-top">
                    <div className="font-serif-tc font-bold">{comp.dimension}</div>
                    <div className="mt-2 text-xs text-stone-500 leading-normal">
                      <span className="font-medium text-stone-700">立法理念：</span>
                      {comp.rationale}
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top text-stone-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-stone-50/40">
                    {comp.oldSystem}
                  </td>
                  <td className="py-4 px-4 align-top text-stone-900 text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-amber-50/15">
                    {comp.newSystem}
                    <div className="mt-2 text-xs text-emerald-800 font-medium">
                      效益：{comp.impact}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 核心條文即時搜尋與白話文深度解讀 */}
      <div className="space-y-6 pt-6 border-t border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 mb-1">
            <span>REAL-TIME SEARCH & STATUTE NAVIGATOR</span>
            <span aria-hidden="true">·</span>
            <span>行政法規即時檢索系統</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif-tc font-bold text-stone-900">
            教育部法規即時檢索與實務要訣
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            支援條文案號、白話解讀、實務指引、標籤或原始法條全文即時模糊比對，專為第一線學校行政人員快速檢索設計。
          </p>
        </div>

        {/* 專用高效率搜尋列 (Dedicated High-Efficiency Search Input Box) */}
        <div className="bg-white border-2 border-stone-300 focus-within:border-stone-900 rounded-xl p-2 sm:p-3 shadow-xs transition-all space-y-3">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-stone-500 shrink-0 ml-1" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="輸入關鍵字即時檢索（如：阻卻違法、考核分流、全外聘、3萬元、第14條、第8條、教學不力...）"
              className="w-full text-sm sm:text-base text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-md transition-colors shrink-0 font-medium"
              >
                清除
              </button>
            )}
          </div>

          {/* Quick-Search Hot Keyword Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs text-stone-500">
            <span className="font-medium text-stone-700 shrink-0">常見行政熱搜詞：</span>
            {[
              '阻卻違法',
              '考核分流',
              '全外聘人才庫',
              '法律諮詢補助',
              '第14條終身解聘',
              '第8條直接結案',
              '第16條教學不力',
              '第18條終局停聘',
            ].map((kw) => (
              <button
                key={kw}
                onClick={() => setSearchQuery(kw)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  searchQuery === kw
                    ? 'bg-stone-900 text-white font-medium'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter and Search Result Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg w-fit border border-stone-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-stone-600 font-mono">
            檢索結果：
            <span className="font-bold text-stone-900 px-1 font-mono text-sm">
              {filteredLaws.length}
            </span>
            筆相符法規條文
            {searchQuery && (
              <span className="text-stone-500 ml-1">
                （含關鍵字「<span className="text-stone-900 font-medium">{searchQuery}</span>」）
              </span>
            )}
          </div>
        </div>

        {/* Laws List */}
        <div className="space-y-6">
          {filteredLaws.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-stone-300 rounded-xl bg-white text-stone-600 text-sm space-y-3">
              <div>查無符合「<span className="font-semibold text-stone-900">{searchQuery}</span>」之法規條文。</div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('全部');
                }}
                className="text-xs px-3.5 py-1.5 bg-stone-900 text-stone-50 rounded-lg hover:bg-stone-800 transition-colors shadow-2xs"
              >
                清除關鍵字並重置分類
              </button>
            </div>
          ) : (
            filteredLaws.map((law) => {
              const isExpanded = expandedLawId === law.id;
              return (
                <div
                  key={law.id}
                  className="bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-2xs hover:border-stone-300 transition-all space-y-4"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                      <span className="font-semibold text-stone-800">{law.source}</span>
                      <span aria-hidden="true">·</span>
                      <span>{law.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{law.article}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                      {law.tags.map((tag, idx) => (
                        <span key={idx} className="text-stone-600">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-serif-tc font-bold text-stone-900">
                    {law.title}
                  </h3>

                  {/* Vernacular (白話文解讀) */}
                  <div className="p-4 bg-stone-50 rounded-lg border border-stone-200/70 text-sm text-stone-800 leading-relaxed">
                    <div className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-stone-700" />
                      <span>法理白話文解讀</span>
                    </div>
                    <p>{law.vernacular}</p>
                  </div>

                  {/* Practical tip */}
                  <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-200/60 text-sm text-stone-800 leading-relaxed">
                    <div className="font-semibold text-amber-950 mb-1 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-700" />
                      <span>學校行政與實務操作要訣</span>
                    </div>
                    <p className="text-stone-700">{law.practicalTip}</p>
                  </div>

                  {/* Expand Raw Statute button & panel */}
                  <div className="pt-2">
                    <button
                      onClick={() => setExpandedLawId(isExpanded ? null : law.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-3.5 h-3.5" />
                          <span>收合原始法條文本</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3.5 h-3.5" />
                          <span>展開查閱完整法條原文</span>
                        </>
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 p-4 bg-stone-900 text-stone-100 rounded-lg text-xs leading-relaxed font-mono whitespace-pre-wrap relative overflow-x-auto">
                        <button
                          onClick={() => handleCopyText(law.id, law.rawText)}
                          className="absolute right-3 top-3 px-2 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded flex items-center gap-1 text-[11px] transition-colors"
                          title="複製法條原文"
                        >
                          {copiedId === law.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>已複製</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>複製法條</span>
                            </>
                          )}
                        </button>
                        {law.rawText}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
