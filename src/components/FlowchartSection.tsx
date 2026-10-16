import React, { useState } from 'react';
import { FLOW_STAGES, ASCII_INFOGRAPHIC_STRUCTURE } from '../data/flowchartData';
import {
  Calendar,
  Clock,
  UserCheck,
  FileCheck,
  AlertTriangle,
  Copy,
  Check,
  ChevronRight,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Layers
} from 'lucide-react';

export const FlowchartSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedAscii, setCopiedAscii] = useState<boolean>(false);

  // Deadline Calculator state
  const [complaintDate, setComplaintDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const calculateDeadlines = (baseDateStr: string) => {
    const base = new Date(baseDateStr);
    if (isNaN(base.getTime())) return null;

    // Helper to add calendar days
    const addDays = (d: Date, days: number) => {
      const res = new Date(d);
      res.setDate(res.getDate() + days);
      return res.toISOString().split('T')[0];
    };

    // Helper to add months
    const addMonths = (d: Date, months: number) => {
      const res = new Date(d);
      res.setMonth(res.getMonth() + months);
      return res.toISOString().split('T')[0];
    };

    return {
      reportNotice20Days: addDays(base, 20),
      schoolMeeting7WorkDays: addDays(base, 11), // roughly 7 business days ~ 10-11 calendar days
      investigation2Months: addMonths(base, 2),
      investigationMaxExtended4Months: addMonths(base, 4),
      appeal30Days: addDays(new Date(addMonths(base, 2)), 30),
    };
  };

  const calculated = calculateDeadlines(complaintDate);

  const handleCopyAscii = () => {
    navigator.clipboard.writeText(ASCII_INFOGRAPHIC_STRUCTURE);
    setCopiedAscii(true);
    setTimeout(() => setCopiedAscii(false), 2000);
  };

  const currentStage = FLOW_STAGES.find((s) => s.stepNumber === activeStep) || FLOW_STAGES[0];

  return (
    <section className="space-y-12">
      {/* Chapter Header */}
      <div className="border-b border-stone-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-serif-tc tracking-widest text-stone-500 mb-2">
          <span>CHAPTER 03</span>
          <span aria-hidden="true">·</span>
          <span>PROCEDURAL FLOWCHART & SOP</span>
          <span aria-hidden="true">·</span>
          <span>五階段法定標準作業程序</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-tc font-bold text-stone-900 tracking-tight">
          流程處理頁：全校園事件處理標準作業程序（SOP）
        </h1>
        <p className="mt-3 text-base text-stone-600 max-w-3xl leading-relaxed">
          從「接獲檢舉/知悉」到「終局決議與行政救濟」，全面梳理 115 年最新法定各階段之
          「觸發條件」、「執行主體」與「法定期限」。落實程序正義，杜絕逾期或違法取證。
        </p>
      </div>

      {/* 法定時限試算工具 (Interactive Statutory Deadline Calculator) */}
      <div className="bg-stone-100/80 border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-stone-900 font-serif-tc font-bold text-lg sm:text-xl">
              <Calculator className="w-5 h-5 text-stone-800" />
              <span>校園事件法定關鍵時限推算器</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              輸入學校接獲檢舉或知悉之基準日期，系統將自動推算各階段之法定期限截止日。
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-600 font-medium whitespace-nowrap">接獲檢舉基準日：</span>
            <input
              type="date"
              value={complaintDate}
              onChange={(e) => setComplaintDate(e.target.value)}
              className="px-3 py-1.5 bg-white border border-stone-300 rounded-lg text-xs font-mono text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-800"
            />
          </div>
        </div>

        {calculated && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
              <div className="text-[11px] text-stone-500 font-mono">第 8、9、9-1 條</div>
              <div className="font-semibold text-stone-900 text-sm mt-1">
                20 日內受理/分流通知
              </div>
              <div className="mt-2 text-lg font-bold font-mono text-stone-900">
                {calculated.reportNotice20Days}
              </div>
              <div className="mt-1 text-[11px] text-stone-500">
                初篩審查小組無記名表決、阻卻違法結案或考核分流之書面通知檢舉人截止日。
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
              <div className="text-[11px] text-stone-500 font-mono">第 12 條第 1 項</div>
              <div className="font-semibold text-stone-900 text-sm mt-1">
                7 工作日內召開校事會議
              </div>
              <div className="mt-2 text-lg font-bold font-mono text-stone-900">
                ~ {calculated.schoolMeeting7WorkDays}
              </div>
              <div className="mt-1 text-[11px] text-stone-500">
                自正式決定受理起 7 個工作日內，召開 5 人校事會議審議並決議組成調查小組。
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
              <div className="text-[11px] text-stone-500 font-mono">第 21 條第 1 項</div>
              <div className="font-semibold text-stone-900 text-sm mt-1">
                2 個月調查報告法定完成日
              </div>
              <div className="mt-2 text-lg font-bold font-mono text-amber-700">
                {calculated.investigation2Months}
              </div>
              <div className="mt-1 text-[11px] text-stone-500">
                調查小組自第1次會議起 2 個月內完成報告（必要時得延2次每次1個月，最長至{' '}
                <span className="font-mono font-medium text-stone-700">{calculated.investigationMaxExtended4Months}</span>）。
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
              <div className="text-[11px] text-stone-500 font-mono">教師法第 42 條 / 解§10</div>
              <div className="font-semibold text-stone-900 text-sm mt-1">
                30 日法定救濟/陳情不變期
              </div>
              <div className="mt-2 text-lg font-bold font-mono text-stone-900">
                受處分次日起 30 日
              </div>
              <div className="mt-1 text-[11px] text-stone-500">
                教師收受處分30日內提申訴；檢舉人/被害人不服不受理或結案30日內向主管機關審議會陳情。
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 五階段可切換 SOP 導航器 */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif-tc font-bold text-stone-900">
            標準作業程序（SOP）五大關鍵階段詳解
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            點擊切換各階段，檢閱精確的觸發要件、法定執行主體、時限限制與必備表件。
          </p>
        </div>

        {/* Phase Timeline Segmented Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-1.5 bg-stone-100 rounded-xl border border-stone-200">
          {FLOW_STAGES.map((stage) => {
            const isSelected = activeStep === stage.stepNumber;
            return (
              <button
                key={stage.stepNumber}
                onClick={() => setActiveStep(stage.stepNumber)}
                className={`flex flex-col text-left p-3 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50/50'
                }`}
              >
                <div className="text-[11px] font-mono text-stone-500">
                  STEP 0{stage.stepNumber}
                </div>
                <div className="text-xs sm:text-sm font-serif-tc font-bold mt-0.5 truncate">
                  {stage.stageName}
                </div>
                <div className="text-[11px] text-stone-500 mt-1 truncate">
                  {stage.statutoryDeadline.split('（')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-mono mb-1">
                <span>{currentStage.stageBadge}</span>
                <span aria-hidden="true">·</span>
                <span>STEP 0{currentStage.stepNumber}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif-tc font-bold text-stone-900">
                {currentStage.stageName}
              </h3>
            </div>
            <div className="text-xs font-mono bg-stone-100 px-3 py-1.5 rounded-lg text-stone-700 w-fit">
              依據：{currentStage.legalBasis}
            </div>
          </div>

          {/* Three Columns: Trigger, Actor, Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1">
              <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-stone-700" />
                <span>觸發條件（Trigger Condition）</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed pt-1">
                {currentStage.triggerCondition}
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1">
              <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-stone-700" />
                <span>執行主體（Executing Actor）</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed pt-1">
                {currentStage.executingActor}
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1">
              <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>法定期限（Statutory Deadline）</span>
              </div>
              <p className="text-xs text-stone-900 font-medium leading-relaxed pt-1">
                {currentStage.statutoryDeadline}
              </p>
            </div>
          </div>

          {/* Key Actions */}
          <div className="space-y-3">
            <div className="text-sm font-serif-tc font-bold text-stone-900 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-stone-700" />
              <span>本階段法定核心作業事項（Standard Actions）</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-700 leading-relaxed pl-1">
              {currentStage.keyActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-stone-400 font-mono mt-0.5">·</span>
                  <span className="whitespace-pre-line">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outputs and Caveats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-stone-100 text-xs">
            <div className="space-y-1.5">
              <span className="font-semibold text-stone-900">必備法定表件與輸出成果：</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {currentStage.keyOutputs.map((out, idx) => (
                  <span
                    key={idx}
                    className="bg-stone-100 text-stone-800 px-2.5 py-1 rounded border border-stone-200"
                  >
                    {out}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-semibold text-rose-900">實務風險防範與注意要點：</span>
              <ul className="list-disc pl-4 text-stone-600 space-y-0.5">
                {currentStage.caveats.map((cav, idx) => (
                  <li key={idx}>{cav}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 文字版流程圖結構（以便後續製作 Infographic） */}
      <div className="space-y-4 pt-6 border-t border-stone-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif-tc font-bold text-stone-900">
              結構化流程圖文本（Infographic 文本規格）
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              提供條理分明、無歧義之純文字/樹狀流程圖，供學校直接複製並排版輸出為公文、校園宣導折頁或美編圖表。
            </p>
          </div>

          <button
            onClick={handleCopyAscii}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs"
          >
            {copiedAscii ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>已複製流程圖文本</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>一鍵複製流程圖結構</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 sm:p-6 bg-stone-900 text-stone-100 rounded-2xl font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre selection:bg-stone-700">
          {ASCII_INFOGRAPHIC_STRUCTURE.trim()}
        </div>
      </div>
    </section>
  );
};
