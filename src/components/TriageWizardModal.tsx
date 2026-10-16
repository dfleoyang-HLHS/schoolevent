import React, { useState } from 'react';
import { X, Compass, ArrowRight, RotateCcw, CheckCircle2, AlertOctagon, HelpCircle, FileText } from 'lucide-react';

interface TriageWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TriageWizardModal: React.FC<TriageWizardModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [isAnonymous, setIsAnonymous] = useState<boolean | null>(null);
  const [hasConcreteMajorCrime, setHasConcreteMajorCrime] = useState<boolean | null>(null);
  const [isSelfDefenseOrJustified, setIsSelfDefenseOrJustified] = useState<boolean | null>(null);
  const [reachesDismissalSeverity, setReachesDismissalSeverity] = useState<boolean | null>(null);

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setIsAnonymous(null);
    setHasConcreteMajorCrime(null);
    setIsSelfDefenseOrJustified(null);
    setReachesDismissalSeverity(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-stone-800" />
            <h2 className="text-lg font-serif-tc font-bold text-stone-900">
              校園事件初篩與分流法規決策診斷器
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-800 flex-1">
          <div className="p-3 bg-stone-100 rounded-lg text-xs text-stone-600 leading-relaxed border border-stone-200">
            本工具依據 115 年 10 月最新修正之《解聘辦法》第 4、8、9、9-1 條及《考核辦法》第 6-1 條邏輯設計，協助學校行政人員快速判斷受理與分流途徑。
          </div>

          {/* Step 1: 具名檢舉檢核 */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-stone-500">STEP 1 / 3 · 形式受理要件</div>
              <h3 className="text-base font-bold font-serif-tc text-stone-900">
                檢舉人是否於檢舉書上具備「真實姓名」及聯絡方式？
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                依《解聘辦法》第 5 條第 3 項，檢舉應填具檢舉書載明姓名、聯絡電話及事實。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsAnonymous(false);
                    setStep(2);
                  }}
                  className="p-4 border border-stone-300 rounded-xl hover:border-stone-900 hover:bg-stone-50 text-left transition-all group"
                >
                  <div className="font-semibold text-stone-900 group-hover:text-stone-950">
                    A. 是，具真實姓名檢舉
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    檢舉書填具清楚姓名與聯絡資訊，非匿名投書。
                  </div>
                </button>

                <button
                  onClick={() => {
                    setIsAnonymous(true);
                    setStep(15); // Sub-step for anonymous exception
                  }}
                  className="p-4 border border-stone-300 rounded-xl hover:border-stone-900 hover:bg-stone-50 text-left transition-all group"
                >
                  <div className="font-semibold text-stone-900 group-hover:text-stone-950">
                    B. 否，為匿名或未具真實姓名之檢舉
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    黑函、網路匿名爆料、未留真實身分。
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 1.5: 匿名黑函之重大事證檢核 (第9條第2項) */}
          {step === 15 && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-amber-700 font-semibold">
                EXCEPTION · 匿名案件之實質事證檢驗（解§9Ⅱ）
              </div>
              <h3 className="text-base font-bold font-serif-tc text-stone-900">
                該匿名檢舉是否檢附極具體證據，且客觀涉及《教師法》第 14 條、第 15 條重大解聘情事？
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                如涉及重大性侵、重傷或暴力體罰，並附有確切直接影音事證；若僅為空泛指控或臆測則選否。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setHasConcreteMajorCrime(true);
                    setStep(2);
                  }}
                  className="p-4 border border-stone-300 rounded-xl hover:border-stone-900 hover:bg-stone-50 text-left transition-all"
                >
                  <div className="font-semibold text-stone-900">
                    是，事證極為確切且涉及重大解聘罪嫌
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    學校依第 9 條第 2 項得本於職權繼續調查處理。
                  </div>
                </button>

                <button
                  onClick={() => {
                    setHasConcreteMajorCrime(false);
                    setStep(100); // Result: 不受理
                  }}
                  className="p-4 border border-stone-300 rounded-xl hover:border-stone-900 hover:bg-stone-50 text-left transition-all"
                >
                  <div className="font-semibold text-stone-900">
                    否，為空泛指控或未涉第14、15條重大罪嫌
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    依第 9 條第 1 項第 3 款應無記名表決不予受理。
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: 阻卻違法不罰檢核 (第4條 & 第8條) */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-stone-500">STEP 2 / 3 · 正當行為初篩（解§4、§8）</div>
              <h3 className="text-base font-bold font-serif-tc text-stone-900">
                教師被指控之行為，是否顯屬為制止暴力、自傷或正當管教之必要身體強制措施？
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                例如：學生互毆、意圖跳樓或持利刃，教師即時施加物理阻擋拉開；或業務上正當合理管教。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsSelfDefenseOrJustified(true);
                    setStep(200); // Result: 第8條直接結案
                  }}
                  className="p-4 border border-stone-300 rounded-xl hover:border-stone-900 hover:bg-stone-50 text-left transition-all"
                >
                  <div className="font-semibold text-stone-900">
                    A. 是，顯屬正當防衛或緊急危害制止
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    符合第 4 條阻卻違法不罰要件。
                  </div>
                </button>

                <button
                  onClick={() => {
                    setIsSelfDefenseOrJustified(false);
                    setStep(3);
                  }}
                  className="p-4 border border-stone-300 rounded-xl hover:border-stone-900 hover:bg-stone-50 text-left transition-all"
                >
                  <div className="font-semibold text-stone-900">
                    B. 否，非屬緊急阻卻事由或情節需進一步查證
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    進入後續情節輕重分流判定。
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 情節輕重與分流判定 (第9條之1 vs 第12條) */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-xs font-mono text-stone-500">STEP 3 / 3 · 情節輕重分流判定（解§9-1）</div>
              <h3 className="text-base font-bold font-serif-tc text-stone-900">
                涉案行為是否達到《教師法》第 14 至 16 條或 18 條應予解聘、不續聘或終局停聘之程度？
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                由審查會議依第 3 條裁量因素衡量身心侵害、故意過失與頻率。
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setReachesDismissalSeverity(false);
                    setStep(300); // Result: 考核分流
                  }}
                  className="p-4 border border-stone-300 rounded-xl hover:border-stone-900 hover:bg-stone-50 text-left transition-all"
                >
                  <div className="font-semibold text-stone-900">
                    A. 未達解聘/停聘程度，但涉及成績考核懲處
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    如管教失當、口氣欠佳，涉及申誡或記過。
                  </div>
                </button>

                <button
                  onClick={() => {
                    setReachesDismissalSeverity(true);
                    setStep(400); // Result: 校事會議外聘小組
                  }}
                  className="p-4 border border-stone-300 rounded-xl hover:border-stone-900 hover:bg-stone-50 text-left transition-all"
                >
                  <div className="font-semibold text-stone-900">
                    B. 情節重大，疑似涉及解聘、不續聘或終局停聘
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    如嚴重體罰造成傷害、重大霸凌或教學不力。
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* DIAGNOSIS RESULTS */}

          {/* Result 100: 不受理 */}
          {step === 100 && (
            <div className="p-5 bg-stone-100 rounded-xl border border-stone-300 space-y-4">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-base font-serif-tc">
                <AlertOctagon className="w-5 h-5 text-stone-700" />
                <span>診斷結果：【應不予受理】（存查結案）</span>
              </div>
              <div className="text-xs text-stone-700 leading-relaxed space-y-2">
                <p>
                  <strong>法規依據：</strong>《解聘辦法》第 9 條第 1 項第 3 款。
                </p>
                <p>
                  <strong>法定程序：</strong>由校長邀集外聘人才庫學者專家 1 人、教師代表 1 人、家長代表 1 人召開審查會議（校長僅陳述意見無表決權），經無記名投票過半數通過後作成「不予受理」決定。
                </p>
                <p>
                  <strong>後續作為：</strong>學校應於接獲檢舉之日起 20 日內以書面敘明理由通知檢舉人（若無聯絡資訊則行政存查備查），毋須召開校事會議或外聘調查小組。
                </p>
              </div>
            </div>
          )}

          {/* Result 200: 直接結案 */}
          {step === 200 && (
            <div className="p-5 bg-emerald-50 rounded-xl border border-emerald-300 space-y-4">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-base font-serif-tc">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>診斷結果：【第 8 條阻卻違法直接結案】（免入調查）</span>
              </div>
              <div className="text-xs text-emerald-900 leading-relaxed space-y-2">
                <p>
                  <strong>法規依據：</strong>《解聘辦法》第 4 條、第 8 條第 1 項。
                </p>
                <p>
                  <strong>法定程序：</strong>教師行為顯屬第 4 條正當防衛、制止暴力自傷之必要強制措施，或正當輔導管教辦法範圍者，<strong>學校應予結案，不適用第 9 條召開會議審議之程序！</strong>
                </p>
                <p>
                  <strong>後續作為：</strong>學校應於接獲檢舉之日起 20 日內，以書面敘明理由通知檢舉人。學校得以親師生溝通、行政晤談設法化解衝突，且<strong>不得對該教師予以不利之成績考核</strong>。
                </p>
              </div>
            </div>
          )}

          {/* Result 300: 考核分流 */}
          {step === 300 && (
            <div className="p-5 bg-amber-50 rounded-xl border border-amber-300 space-y-4">
              <div className="flex items-center gap-2 text-amber-950 font-bold text-base font-serif-tc">
                <FileText className="w-5 h-5 text-amber-800" />
                <span>診斷結果：【第 9 條之一考核分流】（校內自辦調查）</span>
              </div>
              <div className="text-xs text-amber-900 leading-relaxed space-y-2">
                <p>
                  <strong>法規依據：</strong>《解聘辦法》第 9 條之一、《考核辦法》第 6 條之一。
                </p>
                <p>
                  <strong>法定程序：</strong>經 4 人審查會議無記名表決認定涉一般懲處者，分流依《考核辦法》辦理。學校於 20 日內書面通知檢舉人。由學校指派校內人員進行內部調查，<strong>自派員起 2 個月內完成</strong>（必要時延長一次至多1個月）。
                </p>
                <p>
                  <strong>效益：</strong>徹底脫鉤重大不適任之外聘調查小組程序，節省龐大外聘公帑與同儕耗損。若調查中發現事態嚴重涉解聘，再改報校事會議。
                </p>
              </div>
            </div>
          )}

          {/* Result 400: 校事會議外聘小組 */}
          {step === 400 && (
            <div className="p-5 bg-stone-900 text-stone-100 rounded-xl border border-stone-800 space-y-4">
              <div className="flex items-center gap-2 font-bold text-base font-serif-tc text-white">
                <AlertOctagon className="w-5 h-5 text-amber-400" />
                <span>診斷結果：【正式受理，啟動校事會議全外聘調查】</span>
              </div>
              <div className="text-xs text-stone-300 leading-relaxed space-y-2">
                <p>
                  <strong>法規依據：</strong>《解聘辦法》第 9 條、第 12 條、第 16 條及《教師法》。
                </p>
                <p>
                  <strong>法定時限與程序：</strong>
                  <br />1. 接獲檢舉 20 日內書面通知檢舉人決定「受理」。
                  <br />2. 受理後 <strong>7 個工作日內</strong>召開 5 人校事會議審議。
                  <br />3. 報請主管機關自人才庫推舉 3~5 倍名單，學校遴選 3 或 5 人組成調查小組（<strong>100%全外聘且含至少1名法律專家</strong>）。
                  <br />4. 調查小組自第1次會議起 <strong>2 個月內完成調查報告</strong>。
                </p>
                <p className="text-amber-300">
                  <strong>權益提醒：</strong>受調查教師於調查期間可申請國教署專案補助最高 30,000 元之專業律師法律諮詢費！
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-stone-600 hover:text-stone-900 font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重新診斷</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg font-medium transition-colors"
          >
            完成關閉
          </button>
        </div>
      </div>
    </div>
  );
};
