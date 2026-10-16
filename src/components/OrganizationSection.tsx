import React, { useState } from 'react';
import { COMMITTEE_MEMBERS, OPERATION_RULES, CONFLICT_OF_INTEREST_CHECKLIST } from '../data/committeeData';
import { CheckCircle2, XCircle, Scale, Calculator, Info, Shield, Users, ShieldAlert } from 'lucide-react';

export const OrganizationSection: React.FC = () => {
  const [maleCount, setMaleCount] = useState<number>(3);
  const [femaleCount, setFemaleCount] = useState<number>(2);
  const [presentCount, setPresentCount] = useState<number>(5);
  const [recusedCount, setRecusedCount] = useState<number>(0);

  const totalMembers = maleCount + femaleCount;
  const minGenderRatioMet = totalMembers === 5 && maleCount >= 2 && femaleCount >= 2;
  const effectivePresent = Math.max(0, presentCount - recusedCount);
  const isQuorumMet = presentCount >= 3;
  const votesNeededToPass = effectivePresent > 0 ? Math.floor(effectivePresent / 2) + 1 : 0;

  return (
    <section className="space-y-12">
      <div className="border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-serif-tc tracking-widest text-blue-700 font-medium mb-2">
          <span>CHAPTER 02</span>
          <span aria-hidden="true">·</span>
          <span>ORGANIZATION & COMMITTEE</span>
          <span aria-hidden="true">·</span>
          <span>法定組織與議事規範</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif-tc font-bold text-slate-900 tracking-tight">
          組織運作頁：校事會議之法定組成與運作嚴格限制
        </h1>
        <p className="mt-3 text-base text-slate-600 max-w-3xl leading-relaxed">
          依《高級中等以下學校教師解聘不續聘停聘或資遣辦法》第 12 條規定，校事會議為常設性之 5 人法定委員會。
          其組成結構、性別比例配比、開會出席法定門檻與利益迴避原則具有絕對強制性，任何程序瑕疵均可能導致全案決議無效。
        </p>
      </div>

      {/* 5 大法定委員類別清單 */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif-tc font-bold text-slate-900">
            5 大法定委員類別結構表
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            校事會議應置委員五人，任期一年，期滿得續聘。成員橫跨校政、家長、教師組織與外部中央人才庫專家。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COMMITTEE_MEMBERS.map((m, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                  <span className="font-serif-tc font-semibold text-blue-950">{m.roleNumber}</span>
                  <span className="font-mono bg-blue-50 text-blue-900 px-2 py-0.5 rounded border border-blue-200/60 font-semibold">
                    法定 {m.statutoryCount}
                  </span>
                </div>

                <h3 className="text-lg font-serif-tc font-bold text-slate-900">
                  {m.category}
                </h3>

                <div className="text-xs text-slate-700 leading-relaxed">
                  <div className="font-medium text-slate-900 mb-0.5">任用資格：</div>
                  <p>{m.qualification}</p>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed">
                  <div className="font-medium text-slate-900 mb-0.5">產生與推派方式：</div>
                  <p>{m.designationRule}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="font-semibold text-blue-900">實務指引：</span>
                {m.notes}
              </div>
            </div>
          ))}

          {/* 總結核心卡 */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-slate-100 rounded-xl p-5 shadow-md flex flex-col justify-between border border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-400 font-mono pb-2 border-b border-slate-800">
                <Scale className="w-4 h-4 text-sky-400" />
                <span>法定核心綱領</span>
              </div>
              <h3 className="text-lg font-serif-tc font-bold text-white mt-3">
                常設性 5 人黃金配比
              </h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                校事會議絕非行政主管的一言堂，而是由行政代表、教育團體代表、家庭團體代表與獨立中央人才庫專家形成兼顧各方權益的四方平衡監督機制。
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              任期：1 年（自當年 8 月 1 日至次年 7 月 31 日）
            </div>
          </div>
        </div>
      </div>

      {/* 四大運作與審議限制 */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif-tc font-bold text-slate-900">
            四大法定運作與審議限制
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            任何違反法定人數、性別比例或利益迴避之決議，於後續申訴或行政訴訟將遭主管機關或法院撤銷。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {OPERATION_RULES.map((rule, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 hover:border-blue-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-serif-tc font-bold text-slate-900">
                  {rule.title}
                </h3>
                <span className="text-xs font-mono text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 font-semibold">{rule.legalBasis}</span>
              </div>

              <div className="p-2.5 bg-blue-50/70 border border-blue-200/70 rounded text-xs font-semibold text-blue-950">
                {rule.requirement}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{rule.explanation}</p>

              <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="font-medium text-slate-800">實務釋例：</span>
                {rule.calculationExample}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 互動工具：法定開會人數與性別比例即時檢核器 */}
      <div className="bg-slate-50 border border-blue-200/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-2 text-slate-900 font-serif-tc font-bold text-lg sm:text-xl">
          <Calculator className="w-5 h-5 text-blue-700" />
          <span>校事會議法定人數與表決門檻即時檢核器</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600">
          輸入學校目前校事會議委員之人數、性別分配與實際出席狀況，即時檢算是否符合法定開會要件與過半數決議所需票數。
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
          {/* Controls */}
          <div className="space-y-4 bg-white p-5 rounded-xl border border-slate-200 text-xs text-slate-700 shadow-2xs">
            <div className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
              1. 委員會性別組成設定（法定員額固定為 5 人）
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 mb-1">男性委員人數：</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={5}
                    value={maleCount}
                    onChange={(e) => {
                      const val = Math.min(5, Math.max(0, parseInt(e.target.value) || 0));
                      setMaleCount(val);
                      setFemaleCount(5 - val);
                    }}
                    className="w-20 px-3 py-1.5 border border-slate-300 rounded font-mono text-center font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500"
                  />
                  <span>人</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 mb-1">女性委員人數：</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={5}
                    value={femaleCount}
                    onChange={(e) => {
                      const val = Math.min(5, Math.max(0, parseInt(e.target.value) || 0));
                      setFemaleCount(val);
                      setMaleCount(5 - val);
                    }}
                    className="w-20 px-3 py-1.5 border border-slate-300 rounded font-mono text-center font-bold text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-500"
                  />
                  <span>人</span>
                </div>
              </div>
            </div>

            <div className="font-semibold text-slate-900 text-sm border-b border-slate-100 pt-3 pb-2">
              2. 會議出席與利益迴避情境
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 mb-1">實際親自出席人數：</label>
                <div className="flex items-center gap-2">
                  <select
                    value={presentCount}
                    onChange={(e) => setPresentCount(parseInt(e.target.value))}
                    className="w-24 px-3 py-1.5 border border-slate-300 rounded font-mono text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} 人
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 mb-1">本案依法迴避委員數：</label>
                <div className="flex items-center gap-2">
                  <select
                    value={recusedCount}
                    onChange={(e) => setRecusedCount(parseInt(e.target.value))}
                    className="w-24 px-3 py-1.5 border border-slate-300 rounded font-mono text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                  >
                    {[0, 1, 2, 3].map((num) => (
                      <option key={num} value={num} disabled={num >= presentCount}>
                        {num} 人
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostics Report */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between text-xs space-y-4 shadow-2xs">
            <div>
              <div className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
                即時適法性檢核報告
              </div>

              <div className="mt-3 space-y-3">
                <div className="flex items-start gap-2.5">
                  {minGenderRatioMet ? (
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-semibold text-slate-900">
                      性別比例門檻（任一性別不得少於 1/3）：
                    </div>
                    <div className="text-slate-600 mt-0.5">
                      當前配比為 {maleCount} 男 {femaleCount} 女。
                      {minGenderRatioMet ? (
                        <span className="text-blue-900 font-semibold ml-1">
                          合規（任一性別達 2 人以上，符合第 12 條第 3 項）。
                        </span>
                      ) : (
                        <span className="text-rose-700 font-medium ml-1">
                          違法！5人委員會中任一性別至少須 2 人（學校教師單一性別少於1/3者除外）。
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  {isQuorumMet ? (
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-semibold text-slate-900">
                      開會出席門檻（全體委員 1/2 以上）：
                    </div>
                    <div className="text-slate-600 mt-0.5">
                      出席人數：{presentCount} 人 / 5 人。
                      {isQuorumMet ? (
                        <span className="text-blue-900 font-semibold ml-1">
                          合規，已達 3 人法定出席門檻，得正式開會審議。
                        </span>
                      ) : (
                        <span className="text-rose-700 font-medium ml-1">
                          流會！出席未達 3 人，依法不得召開會議作成任何有效決議。
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">
                      實質表決過半數通過門檻（解聘辦法第 24 條第 2 項）：
                    </div>
                    <div className="text-slate-600 mt-0.5">
                      實際出席 {presentCount} 人，扣除迴避委員 {recusedCount} 人後，有效表決基數為{' '}
                      <span className="font-bold text-slate-900 font-mono">{effectivePresent}</span> 人。
                    </div>
                    <div className="mt-1 font-semibold text-blue-950 bg-blue-50/80 border border-blue-200 p-2.5 rounded-lg">
                      本案決議至少需要{' '}
                      <span className="text-base text-blue-700 font-mono font-bold">
                        {votesNeededToPass}
                      </span>{' '}
                      票同意，始得正式通過決議！
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2">
              提示：依第 10 條及第 59 條規定，迴避之委員不計入該項決議案之出席人數。
            </div>
          </div>
        </div>
      </div>

      {/* 利益迴避自我檢核表 */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif-tc font-bold text-slate-900">
            利益迴避實務自我檢核表
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            依《解聘辦法》第 59 條準用《行政程序法》第 32、33 條及第 18 條專條規定，委員遇有下列情事應切實迴避。
          </p>
        </div>

        <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-xs">
          <div className="divide-y divide-slate-200">
            {CONFLICT_OF_INTEREST_CHECKLIST.map((item, idx) => (
              <div key={idx} className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                      {item.clause}
                    </span>
                    {item.isMandatory ? (
                      <span className="text-[11px] font-semibold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded border border-rose-200">
                        法定當然迴避（強制義務）
                      </span>
                    ) : (
                      <span className="text-[11px] font-medium text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                        得聲請迴避 / 主席命其迴避
                      </span>
                    )}
                  </div>

                  <div className="text-sm font-semibold text-slate-900">{item.content}</div>
                  <p className="text-xs text-slate-600">{item.guidance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
