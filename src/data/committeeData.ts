export interface CommitteeMemberRole {
  roleNumber: string;
  category: string;
  statutoryCount: string;
  qualification: string;
  designationRule: string;
  notes: string;
}

export const COMMITTEE_MEMBERS: CommitteeMemberRole[] = [
  {
    roleNumber: '第一類',
    category: '校長',
    statutoryCount: '1 人',
    qualification: '現任學校校長（法定當然代表）',
    designationRule: '依法由校長本人擔任召集人及會議主席。校長因故請假或缺席時，由職務代理人代理。',
    notes: '若教師為合聘教師時，由主聘學校校長出任（第12條第3項）。'
  },
  {
    roleNumber: '第二類',
    category: '學校家長會代表',
    statutoryCount: '1 人',
    qualification: '學校在學學生家長代表',
    designationRule: '由學校家長會推派代表一人出任；若學校家長會無法推派代表者，由全國或地方家長團體代表擔任。',
    notes: '若涉及家長本人子女或有親屬關係，依行政程序法第32條應自行迴避。'
  },
  {
    roleNumber: '第三類',
    category: '行政人員代表',
    statutoryCount: '1 人',
    qualification: '學校各處室編制內行政人員（如教務主任、學務主任、輔導主任、組長或職員等）',
    designationRule: '由校內行政同仁或兼任行政職務之教師互選或由學校指派產生。',
    notes: '通常由與教學、生活輔導或校園安全最密切之行政主管出任。'
  },
  {
    roleNumber: '第四類',
    category: '學校教師會代表',
    statutoryCount: '1 人',
    qualification: '合法立案之學校教師會推派代表',
    designationRule: '學校有教師會者由該會推派一人；學校無教師會者，由該校「未兼行政或董事之教師代表」或「全國或地方教師會推派之代表」擔任。',
    notes: '確保第一線非行政基層教師之獨立專業觀點與同儕權益倡導。'
  },
  {
    roleNumber: '第五類',
    category: '學者專家 / 社會公正人士',
    statutoryCount: '1 人',
    qualification: '教育部校事會議調查人才庫或輔導人才庫經培訓合格之專業人員',
    designationRule: '遴選教育學者、法律學者專家、兒童及少年福利學者專家或社會公正人士一人擔任。得自中央人才庫名冊中聘請。',
    notes: '引進外部法律與專業視角，確保會議評議公正客觀，不受校內人情糾葛干擾。'
  }
];

export interface OperationRule {
  title: string;
  legalBasis: string;
  requirement: string;
  explanation: string;
  calculationExample: string;
}

export const OPERATION_RULES: OperationRule[] = [
  {
    title: '法定人數與任期規範',
    legalBasis: '《解聘辦法》第 12 條第 2 項',
    requirement: '法定置委員 5 人，任期一年，期滿得續聘。',
    explanation: '校事會議為常設法定委員會，由 5 大代表組成，任期統一為 1 學年（通常為當年8月1日至翌年7月31日），以維持審議經驗延續性。',
    calculationExample: '全校校事會議固定名額為 5 名，不得任意擴編或減額（除偏遠學校合聘等特殊情況外）。'
  },
  {
    title: '性別比例嚴格限制',
    legalBasis: '《解聘辦法》第 12 條第 3 項',
    requirement: '任一性別委員人數不得少於委員總數三分之一（1/3）。',
    explanation: '5名委員之 1/3 為 1.67 人，採無條件進位必須至少 2 人。因此 5 位委員中，男性或女性任一性別不得少於 2 人（即配比必須為 3男2女 或 2男3女）。例外條件：學校任一性別教師總數少於 1/3 者，不在此限。',
    calculationExample: '若委員組成目前為 4 男 1 女，即違反法規強制性規定，作成之決議將具有程序違法瑕疵而有被撤銷風險！'
  },
  {
    title: '開會出席與決議門檻',
    legalBasis: '《解聘辦法》第 24 條第 2 項',
    requirement: '應經委員二分之一以上出席，及出席委員過半數之審議通過。',
    explanation: '出席門檻：5 人委員中，至少須 3 人親自出席方得開會。決議門檻：以實際出席人數之過半數同意為通過。',
    calculationExample: '3人出席時，至少需 2 人同意；4人出席時，至少需 3 人同意；全額 5 人出席時，至少需 3 人同意。'
  },
  {
    title: '利益迴避之絕對禁令',
    legalBasis: '《解聘辦法》第 18 條、第 59 條及《行政程序法》第 32、33 條',
    requirement: '校事會議委員，絕對不得同時擔任其審議處理事件之調查小組委員！',
    explanation: '避免「球員兼裁判」。兼任者或有行政程序法第32條自行迴避事由（本人、配偶、四親等血親、三親等姻親、曾為代理人輔佐人或證人）或第33條有偏頗之虞者，必須嚴格迴避。迴避之委員不計入該決議案之出席人數。',
    calculationExample: '若委員甲為涉案教師之同配偶親屬，委員甲依法迴避後，出席人數基數減為 4 人，決議過半需至少 3 票同意。'
  }
];

export const CONFLICT_OF_INTEREST_CHECKLIST = [
  {
    clause: '行政程序法第32條第1款',
    content: '本人或其配偶、前配偶、四親等內之血親或三親等內之姻親或曾有此關係者為事件之當事人。',
    isMandatory: true,
    guidance: '法定當然迴避。無須申請，該委員應主動聲明迴避離席，不得參與討論及表決。'
  },
  {
    clause: '行政程序法第32條第2款',
    content: '本人或其配偶、前配偶，就該事件與當事人有共同權利人或共同義務人之關係。',
    isMandatory: true,
    guidance: '法定當然迴避。例如共同承擔校園專案責任或有實質利害連帶關係。'
  },
  {
    clause: '行政程序法第32條第3款',
    content: '現為或曾為該事件當事人之代理人、輔佐人。',
    isMandatory: true,
    guidance: '法定當然迴避。若曾在事件中擔任當事人之委任律師或法規輔佐人，不得出任委員審查。'
  },
  {
    clause: '行政程序法第32條第4款',
    content: '於該事件，曾為證人、鑑定人。',
    isMandatory: true,
    guidance: '法定當然迴避。如曾就檢舉事實接受過訪談陳述證詞或提供專業鑑定。'
  },
  {
    clause: '解聘辦法第18條專條禁令',
    content: '校事會議委員，不得同時擔任其審議處理事件之調查小組委員。',
    isMandatory: true,
    guidance: '特別法強制規定。調查小組為全外聘獨立機構，校事會議委員嚴禁跨入調查小組，以保客觀審議。'
  },
  {
    clause: '行政程序法第33條聲請迴避',
    content: '有具體事實，足認其執行職務有偏頗之虞者。',
    isMandatory: false,
    guidance: '當事人得檢具具體事實與事證申請該委員迴避；或由會議主席命其迴避，並經委員會審議決議。'
  }
];
