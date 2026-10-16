import React, { useState } from 'react';
import { FAQ_DATA, FaqItem } from '../data/faqData';
import { Search, ChevronDown, ChevronUp, Copy, Check, HelpCircle, BookMarked, Lightbulb } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['全部', '受理門檻', '案件分流', '調查小組', '救濟途徑', '報告效力'];

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyAnswer = (faq: FaqItem) => {
    const textToCopy = `【校事會議專業解答】\n問題：${faq.question}\n核心摘要：${faq.shortSummary}\n\n法規依據：\n${faq.legalBasis.map((b) => '· ' + b).join('\n')}\n\n詳細解答：\n${faq.detailedAnswer}\n\n實務建議：\n${faq.practicalTips.map((t) => '· ' + t).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(faq.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCat = selectedCategory === '全部' || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.detailedAnswer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.legalBasis.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <section className="space-y-12">
      {/* Chapter Header */}
      <div className="border-b border-stone-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-serif-tc tracking-widest text-stone-500 mb-2">
          <span>CHAPTER 04</span>
          <span aria-hidden="true">·</span>
          <span>PRACTICAL FAQS & LEGAL ADVICE</span>
          <span aria-hidden="true">·</span>
          <span>教育現場最常遭遇痛點</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-tc font-bold text-stone-900 tracking-tight">
          常見問答頁：第一線校園法律爭議擬真詳解
        </h1>
        <p className="mt-3 text-base text-stone-600 max-w-3xl leading-relaxed">
          精選校園實務最棘手的四大核心問題（匿名黑函、情節顯著輕微判定、全外聘人才庫爭議、當事教師救濟與最新法律諮詢補助），
          提供兼具嚴謹法理與溫和實務指引之權威解答。
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category buttons */}
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

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋常見問題或條文..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-800 transition-colors"
          />
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-5">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-stone-300 rounded-xl bg-white text-stone-500 text-sm">
            查無相關問題，請嘗試搜尋其他關鍵字。
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs hover:border-stone-300 transition-all"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1.5 pr-2">
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                      <span className="font-semibold text-stone-800">Q{faq.id.replace('faq-', '')}</span>
                      <span aria-hidden="true">·</span>
                      <span>{faq.category}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-serif-tc font-bold text-stone-900">
                      {faq.question}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-0.5">
                      {faq.shortSummary}
                    </p>
                  </div>

                  <div className="shrink-0 pt-1 text-stone-500">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-stone-800" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Accordion Body */}
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-8 pt-2 border-t border-stone-100 space-y-6 text-sm text-stone-800">
                    {/* Legal Basis Bar */}
                    <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                      <div className="font-semibold text-stone-900 mb-1.5 flex items-center gap-1.5">
                        <BookMarked className="w-3.5 h-3.5 text-stone-700" />
                        <span>權威法理與法規條文依據</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-stone-600 font-mono">
                        {faq.legalBasis.map((b, idx) => (
                          <span
                            key={idx}
                            className="bg-white px-2 py-0.5 rounded border border-stone-200"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Detailed Answer text */}
                    <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-stone-700 whitespace-pre-wrap">
                      {faq.detailedAnswer}
                    </div>

                    {/* Practical Tips */}
                    <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/60 text-xs space-y-2">
                      <div className="font-semibold text-amber-950 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-700" />
                        <span>教育現場行政與教師行動指引（Actionable Advice）</span>
                      </div>
                      <ul className="space-y-1.5 text-stone-700 pl-4 list-disc">
                        {faq.practicalTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Copy QA button */}
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => handleCopyAnswer(faq)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors shadow-2xs"
                      >
                        {copiedId === faq.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>已複製本題擬真解答</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>複製完整擬真解答</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
