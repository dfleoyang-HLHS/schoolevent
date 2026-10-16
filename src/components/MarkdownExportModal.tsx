import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText } from 'lucide-react';
import { REFORM_COMPARISONS, CORE_LAWS } from '../data/lawsData';
import { COMMITTEE_MEMBERS, OPERATION_RULES } from '../data/committeeData';
import { FLOW_STAGES, ASCII_INFOGRAPHIC_STRUCTURE } from '../data/flowchartData';
import { FAQ_DATA } from '../data/faqData';

interface MarkdownExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MarkdownExportModal: React.FC<MarkdownExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateFullMarkdown = () => {
    return `# 校事會議線上領航站：高級中等以下學校校園事件處理權威指引與法規實務手冊

> **文檔定位**：提供全國高級中等以下學校行政人員、教師、家長及關心教育之民眾，兼具權威法規引導與實務操作流程之現代化教育法律知識庫。
> **法規依準**：包含《教師法》（民國 115 年 5 月 13 日修正公布）、《高級中等以下學校教師解聘不續聘停聘或資遣辦法》（民國 115 年 10 月 7 日修正發布）、《公立高級中等以下學校教師成績考核辦法》（民國 115 年 10 月 7 日修正發布）、《教育部國民及學前教育署補助直轄市縣（市）政府辦理高級中等以下學校教師法律諮詢作業要點》（民國 115 年 10 月 14 日訂定發布）。

---

# 第一章 法規引用頁（Legal Framework）

## 一、法規源頭梳理與新制立法精神
近年校園事件處理法規歷經多次關鍵性變革，核心目的在於：
1. **確立正當法律程序**：破除過往「球員兼裁判」與「師師相護」之疑慮，導入中央主管機關培訓合格之「調查人才庫」，落實 100% 全外聘客觀獨立調查。
2. **建立雙階分流與初篩機制**：防止瑣碎親師摩擦或不具名黑函動輒癱瘓校園教學，賦予學校「直接結案」與「分流考核自辦調查」之法定途徑。
3. **明定阻卻違法免責專條**：增訂第 4 條正當防衛、緊急危難制止暴力之必要身體強制力免責規定，保障第一線教師管教尊嚴與身心安全。
4. **強化教師實質防衛權與法律諮詢補助**：國教署於 115 年 10 月正式訂定補助作業要點，受調查教師於調查期間可獲專案補助最高新臺幣 3 萬元之法律諮詢費。

## 二、新舊制核心機制變革對照表

| 改革面向 | 舊制痛點（修正前） | 最新修正現行法規（新制突破） |
| :--- | :--- | :--- |
${REFORM_COMPARISONS.map(
  (c) =>
    `| **${c.dimension}** | ${c.oldSystem.replace(/\n/g, '<br/>')} | ${c.newSystem.replace(/\n/g, '<br/>')} |`
).join('\n')}

## 三、核心法規條文與白話文解讀

${CORE_LAWS.map(
  (l) => `### 【${l.source}】${l.title}
* **分類標籤**：${l.category} · ${l.tags.map((t) => '#' + t).join(' ')}
* **白話解讀**：
${l.vernacular}
* **實務操作要訣**：
${l.practicalTip}

<details>
<summary>點擊查閱原始條文文本</summary>

\`\`\`text
${l.rawText}
\`\`\`
</details>
`
).join('\n\n')}

---

# 第二章 組織運作頁（Organization & Committee）

## 一、校事會議法定組成架構
依《高級中等以下學校教師解聘不續聘停聘或資遣辦法》第 12 條規定，校事會議為常設性之 5 人法定委員會，任期一年（期滿得續聘）：

| 委員類別 | 法定人數 | 任用資格與規範 | 產生推派方式 |
| :--- | :---: | :--- | :--- |
${COMMITTEE_MEMBERS.map(
  (m) => `| **${m.roleNumber}：${m.category}** | ${m.statutoryCount} | ${m.qualification} | ${m.designationRule} |`
).join('\n')}

## 二、審議運作四大法定強制規範
1. **員額固定規範**：法定置委員 5 人，任期一年，期滿得續聘。學校不得任意擴增或減少名額。
2. **性別比例限制**：任一性別委員人數不得少於委員總數三分之一（1/3）。5人委員會中任一性別至少須 2 人（即必須為 3男2女 或 2男3女；學校任一性別教師少於1/3者除外）。
3. **開會法定人數與決議門檻**：應經委員二分之一以上出席（至少 3 人出席始得開會），及出席委員過半數之審議通過。
4. **兼任禁令與利益迴避**：校事會議委員**絕對不得同時擔任其審議處理事件之調查小組委員**（第18條）。有行政程序法第32條當然迴避事由或第33條偏頗之虞者，應確實迴避，迴避之委員不計入該案出席人數。

---

# 第三章 流程處理頁（Procedural Flowchart）

## 一、標準作業程序（SOP）五大關鍵階段

${FLOW_STAGES.map(
  (s) => `### 階段 0${s.stepNumber}：${s.stageName}（${s.stageBadge}）
* **法規依據**：${s.legalBasis}
* **觸發條件**：${s.triggerCondition}
* **執行主體**：${s.executingActor}
* **法定期限**：**${s.statutoryDeadline}**
* **法定核心作業**：
${s.keyActions.map((a) => '  - ' + a).join('\n')}
* **必備法定表件**：${s.keyOutputs.join('、')}
* **實務注意事項**：
${s.caveats.map((c) => '  - ' + c).join('\n')}
`
).join('\n')}

## 二、結構化流程圖文本（Infographic 文本規格）

\`\`\`text
${ASCII_INFOGRAPHIC_STRUCTURE.trim()}
\`\`\`

---

# 第四章 常見問答頁（FAQ）

${FAQ_DATA.map(
  (f) => `## Q${f.id.replace('faq-', '')}：${f.question}
* **核心摘要**：${f.shortSummary}
* **法規依據**：${f.legalBasis.join('；')}

### 詳細解答
${f.detailedAnswer}

### 教育現場實務建議
${f.practicalTips.map((t) => '- ' + t).join('\n')}
`
).join('\n\n')}

---
*校事會議線上領航站 編審委員會 謹製*
`;
  };

  const fullMarkdown = generateFullMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `校事會議線上領航站_權威手冊_${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-xl border border-stone-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-stone-800" />
            <h2 className="text-lg font-serif-tc font-bold text-stone-900">
              匯出全站 Markdown 權威手冊（繁體中文規章版）
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-6 py-3 border-b border-stone-100 bg-white flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
          <p>
            內文嚴格遵守教育部官方最新法律術語，多層次標題與表格排版，複製後可直接貼入公文或校務手冊中。
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg text-xs font-medium transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>已複製全部文本</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>一鍵複製 Markdown</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-medium transition-colors border border-stone-300"
            >
              <Download className="w-3.5 h-3.5" />
              <span>下載 .md 檔案</span>
            </button>
          </div>
        </div>

        {/* Modal Content Preview */}
        <div className="flex-1 p-6 overflow-y-auto bg-stone-900 text-stone-100 font-mono text-xs leading-relaxed selection:bg-stone-700">
          <pre className="whitespace-pre-wrap">{fullMarkdown}</pre>
        </div>
      </div>
    </div>
  );
};
