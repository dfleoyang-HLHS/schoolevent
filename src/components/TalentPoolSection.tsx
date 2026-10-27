import React, { useState, useMemo } from 'react';
import { TALENT_POOL_DATA, REGIONS_LIST, TalentExpert } from '../data/talentPoolData';
import {
  Users,
  Search,
  Filter,
  Scale,
  MapPin,
  Building,
  GraduationCap,
  Copy,
  Check,
  ShieldCheck,
  Download,
  BadgeAlert,
  UserCheck
} from 'lucide-react';

export const TalentPoolSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('全部區域');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [genderFilter, setGenderFilter] = useState<'全部' | '男' | '女'>('全部');
  const [roleFilter, setRoleFilter] = useState<string>('全部');
  const [copiedRegion, setCopiedRegion] = useState<boolean>(false);

  // Quick region group shortcuts
  const regionGroups = [
    { label: '全部', value: '全部區域' },
    { label: '雙北基桃', value: '臺北市,新北市,基隆市,桃園市' },
    { label: '中彰投苗', value: '臺中市,彰化縣,南投縣,苗栗縣' },
    { label: '雲嘉南高屏', value: '雲林縣,嘉義縣,嘉義市,臺南市,高雄市,屏東縣' },
    { label: '宜花東離島', value: '宜蘭縣,花蓮縣,臺東縣,金門縣,澎湖縣,連江縣' },
    { label: '各地律師公會', value: '律師' },
    { label: '家長/心理/社工團體', value: '團體' }
  ];

  // Filtering
  const filteredExperts = useMemo(() => {
    return TALENT_POOL_DATA.filter((expert) => {
      // Region matching
      let matchesRegion = true;
      if (selectedRegion !== '全部區域') {
        if (selectedRegion.includes(',')) {
          const list = selectedRegion.split(',');
          matchesRegion = list.includes(expert.region);
        } else if (selectedRegion === '律師') {
          matchesRegion = expert.region.includes('律師');
        } else if (selectedRegion === '團體') {
          matchesRegion = expert.region.includes('團體') || expert.region.includes('公會') && !expert.region.includes('律師');
        } else {
          matchesRegion = expert.region === selectedRegion;
        }
      }

      // Gender matching
      const matchesGender = genderFilter === '全部' || expert.gender === genderFilter;

      // Role category matching
      let matchesRole = true;
      if (roleFilter === '校長') {
        matchesRole = expert.title.includes('校長');
      } else if (roleFilter === '律師') {
        matchesRole = expert.title.includes('律師');
      } else if (roleFilter === '主任/督學') {
        matchesRole = expert.title.includes('主任') || expert.title.includes('督學');
      } else if (roleFilter === '心理/社工') {
        matchesRole = expert.title.includes('心理') || expert.title.includes('社工');
      }

      // Search matching (Name, Unit, Title, Region)
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        expert.name.toLowerCase().includes(q) ||
        expert.unit.toLowerCase().includes(q) ||
        expert.title.toLowerCase().includes(q) ||
        expert.region.toLowerCase().includes(q);

      return matchesRegion && matchesGender && matchesRole && matchesSearch;
    });
  }, [selectedRegion, genderFilter, roleFilter, searchQuery]);

  // Statistics
  const totalCount = filteredExperts.length;
  const lawyerCount = filteredExperts.filter((e) => e.title.includes('律師')).length;
  const principalCount = filteredExperts.filter((e) => e.title.includes('校長')).length;
  const femaleCount = filteredExperts.filter((e) => e.gender === '女').length;
  const maleCount = filteredExperts.filter((e) => e.gender === '男').length;

  const handleCopyList = () => {
    const header = `【教育部校園事件處理會議調查人才庫名單 - ${selectedRegion}】\n序號 | 姓名 | 性別 | 職稱 | 服務單位 | 所屬縣市/推薦單位\n---------------------------------------------------------`;
    const rows = filteredExperts
      .map((e) => `${e.id} | ${e.name} | ${e.gender} | ${e.title} | ${e.unit} | ${e.region}`)
      .join('\n');
    navigator.clipboard.writeText(`${header}\n${rows}`);
    setCopiedRegion(true);
    setTimeout(() => setCopiedRegion(false), 2000);
  };

  return (
    <section className="space-y-10">
      {/* Chapter Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-8 transition-colors">
        <div className="flex items-center gap-2 text-xs font-serif-tc tracking-widest text-blue-700 dark:text-sky-400 font-medium mb-2">
          <span>CHAPTER 05</span>
          <span aria-hidden="true">·</span>
          <span>CAMPUS INVESTIGATION TALENT POOL</span>
          <span aria-hidden="true">·</span>
          <span>教育部核定調查人才庫名冊</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif-tc font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              校園人才庫：各區域調查專業人員線上檢索系統
            </h1>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              依《高級中等以下學校教師解聘不續聘停聘或資遣辦法》第 14 條及第 16 條規定，調查小組應一律「100% 全數外聘」，
              由主管機關自教育部調查人才庫推舉 3~5 倍學者專家名單，並必須包含「法律專家學者至少 1 人」。
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={handleCopyList}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer active:scale-95"
            >
              {copiedRegion ? (
                <>
                  <Check className="w-3.5 h-3.5 text-sky-300" />
                  <span>已複製名冊列表</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>複製目前區域清單</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Legal Tip Box */}
        <div className="mt-6 p-4 bg-blue-50/70 dark:bg-blue-950/60 rounded-xl border border-blue-200 dark:border-blue-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3 shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-blue-700 dark:text-sky-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-blue-950 dark:text-sky-300">
              法定外聘調查小組遴選規範提醒（解聘辦法第 16 條）
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              學校組成調查小組時，各該主管機關（教育局/國教署）應從本人才庫推舉 3 倍至 5 倍專家學者供學校遴選 3 人或 5 人為委員。
              調查小組委員中「應包括法律專家學者至少一人」（偏遠學校不在此限）。學校切勿私自聘用未列名主管機關推舉名冊之人員。
            </p>
          </div>
        </div>
      </div>

      {/* Region Dropdown & Search Filter Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Main Region Dropdown Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-xs font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 shrink-0">
              <MapPin className="w-4 h-4 text-blue-700 dark:text-sky-400" />
              <span>選擇所屬縣市 / 推薦單位：</span>
            </label>
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full sm:w-64 px-3.5 py-2 text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer shadow-2xs"
              >
                {REGIONS_LIST.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Real-time Keyword Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋姓名、服務單位或職稱..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors shadow-2xs"
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
        </div>

        {/* Group Shortcuts & Role Filter */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Geographic Group Shortcuts */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium mr-1">分區速選：</span>
            {regionGroups.map((grp) => (
              <button
                key={grp.label}
                onClick={() => setSelectedRegion(grp.value)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedRegion === grp.value
                    ? 'bg-blue-900 dark:bg-blue-600 text-white font-medium shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-900 dark:hover:text-sky-300'
                }`}
              >
                {grp.label}
              </button>
            ))}
          </div>

          {/* Role Filters */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">專長身分：</span>
            {['全部', '律師', '校長', '主任/督學', '心理/社工'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  roleFilter === role
                    ? 'bg-blue-800 dark:bg-blue-600 text-white font-medium shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-900 dark:hover:text-sky-300'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Gender Filter */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium text-slate-700 dark:text-slate-300">性別篩選：</span>
          {(['全部', '男', '女'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setGenderFilter(g)}
              className={`px-2.5 py-0.5 rounded cursor-pointer transition-colors ${
                genderFilter === g
                  ? 'bg-blue-100 dark:bg-blue-950/70 font-bold text-blue-900 dark:text-sky-300 border border-blue-200 dark:border-blue-800'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {g === '全部' ? '全部性別' : g}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats Ribbon for Selected Pool */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs hover:border-blue-300 dark:hover:border-blue-700 transition-all">
          <div className="text-xs text-slate-500 dark:text-slate-400">當前篩選人才總數</div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-1">
            {totalCount} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">位</span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            教育部合格調查人才庫名冊
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs hover:border-blue-300 dark:hover:border-blue-700 transition-all">
          <div className="text-xs text-slate-500 dark:text-slate-400">具執業律師/法學專長</div>
          <div className="text-2xl font-bold font-mono text-blue-700 dark:text-sky-400 mt-1">
            {lawyerCount} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">位</span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            符合解§16「法定法律專家」條件
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs hover:border-blue-300 dark:hover:border-blue-700 transition-all">
          <div className="text-xs text-slate-500 dark:text-slate-400">校長 / 退休校長</div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100 mt-1">
            {principalCount} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">位</span>
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            具豐富校務與調查實務經驗
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs hover:border-blue-300 dark:hover:border-blue-700 transition-all">
          <div className="text-xs text-slate-500 dark:text-slate-400">性別分布比例</div>
          <div className="text-lg font-bold font-mono text-slate-900 dark:text-slate-100 mt-1">
            男 {maleCount} · 女 {femaleCount}
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            男女均衡，利於組成人數配置
          </div>
        </div>
      </div>

      {/* Talent Pool Results Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50 dark:bg-slate-850/80">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-900 dark:text-sky-400" />
            <h2 className="text-base font-serif-tc font-bold text-slate-900 dark:text-slate-100">
              人才庫專家名冊清單
            </h2>
            <span className="text-xs font-mono text-blue-900 dark:text-sky-300 bg-blue-100/70 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded font-semibold">
              {filteredExperts.length} 人
            </span>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            目前區域範圍：
            <span className="font-semibold text-blue-950 dark:text-sky-300 ml-1">
              {selectedRegion.includes(',') ? '跨縣市組合' : selectedRegion}
            </span>
          </div>
        </div>

        {filteredExperts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm space-y-3">
            <div>查無符合篩選條件之人才資料。</div>
            <button
              onClick={() => {
                setSelectedRegion('全部區域');
                setSearchQuery('');
                setGenderFilter('全部');
                setRoleFilter('全部');
              }}
              className="text-xs px-3.5 py-1.5 bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg transition-colors cursor-pointer"
            >
              清除所有篩選條件
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-100/90 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-serif-tc">
                  <th className="py-3 px-4 font-semibold w-16 text-center">序號</th>
                  <th className="py-3 px-4 font-semibold w-28">姓名</th>
                  <th className="py-3 px-4 font-semibold w-16 text-center">性別</th>
                  <th className="py-3 px-4 font-semibold w-36">法定職稱</th>
                  <th className="py-3 px-4 font-semibold">任職服務單位</th>
                  <th className="py-3 px-4 font-semibold w-36 text-slate-600 dark:text-slate-400">所屬縣市/推薦單位</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredExperts.map((expert) => {
                  const isLawyer = expert.title.includes('律師');
                  const isPrincipal = expert.title.includes('校長');
                  return (
                    <tr
                      key={expert.id}
                      className="hover:bg-blue-50/40 dark:hover:bg-blue-950/30 transition-colors"
                    >
                      <td className="py-3.5 px-4 text-center font-mono text-slate-500 dark:text-slate-400">
                        {expert.id}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100 font-serif-tc">
                        <div className="flex items-center gap-1.5">
                          <span>{expert.name}</span>
                          {isLawyer && (
                            <span className="text-[10px] bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-sky-300 px-1.5 py-0.5 rounded font-sans font-medium border border-blue-200 dark:border-blue-800">
                              法律專家
                            </span>
                          )}
                          {isPrincipal && (
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded font-sans font-normal border border-slate-200 dark:border-slate-700">
                              校長
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center font-mono text-slate-600 dark:text-slate-400">
                        {expert.gender}
                      </td>

                      <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                        {expert.title}
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 leading-relaxed">
                        <div className="flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{expert.unit}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200/80 dark:border-slate-700">
                          {expert.region}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850/80 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            資料來源：教育部校園事件處理會議調查人才庫名單（含各直轄市、縣市及律師、家長、心理、社工全國專業團體推薦）。
          </div>
          <div className="font-mono">
            顯示 {filteredExperts.length} / 共 {TALENT_POOL_DATA.length} 筆
          </div>
        </div>
      </div>
    </section>
  );
};
