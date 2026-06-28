// 中级注册安全工程师 - 测评题库
// 按科目 + 知识点分级，支持自适应选题
const QUESTION_BANK = [
  // ==================== 安全生产法律法规 ====================
  {
    id: "law_001",
    subject: "安全生产法律法规",
    knowledgePoint: "安全生产法·总则",
    subPoint: "适用范围",
    difficulty: 1,
    type: "single",
    question: "根据《安全生产法》，下列哪类单位不适用本法？",
    options: [
      { key: "A", text: "矿山企业" },
      { key: "B", text: "烟花爆竹生产企业" },
      { key: "C", text: "消防安全单位" },
      { key: "D", text: "建筑施工企业" }
    ],
    answer: "C",
    explanation: "《安全生产法》第二条规定：有关法律、行政法规对消防安全和道路交通安全、铁路交通安全、水上交通安全、民用航空安全以及核与辐射安全、特种设备安全另有规定的，适用其规定。消防安全单位主要适用《消防法》。",
    hint: "注意《安全生产法》的适用范围排除条款"
  },
  {
    id: "law_002",
    subject: "安全生产法律法规",
    knowledgePoint: "安全生产法·生产经营单位的安全生产保障",
    subPoint: "主要负责人职责",
    difficulty: 2,
    type: "single",
    question: "根据《安全生产法》，生产经营单位的主要负责人对本单位安全生产工作负有的职责不包括：",
    options: [
      { key: "A", text: "建立健全并落实本单位全员安全生产责任制" },
      { key: "B", text: "组织制定并实施本单位安全生产规章制度和操作规程" },
      { key: "C", text: "组织制定并实施本单位的生产安全事故应急救援预案" },
      { key: "D", text: "直接负责现场安全管理巡查" }
    ],
    answer: "D",
    explanation: "《安全生产法》第二十一条规定了主要负责人的七项职责，包括A、B、C选项，但不包括D。现场安全管理巡查属于安全管理人员的职责范畴。",
    hint: "主要负责人的职责聚焦在制度建设和组织层面，而非具体执行"
  },
  {
    id: "law_003",
    subject: "安全生产法律法规",
    knowledgePoint: "安全生产法·从业人员的权利和义务",
    subPoint: "从业人员权利",
    difficulty: 1,
    type: "single",
    question: "从业人员发现直接危及人身安全的紧急情况时，有权停止作业或者在采取可能的应急措施后撤离作业场所。这体现了从业人员的哪项权利？",
    options: [
      { key: "A", text: "知情权" },
      { key: "B", text: "紧急避险权" },
      { key: "C", text: "批评检举权" },
      { key: "D", text: "拒绝违章指挥权" }
    ],
    answer: "B",
    explanation: "《安全生产法》第五十五条规定了从业人员的紧急避险权：从业人员发现直接危及人身安全的紧急情况时，有权停止作业或者在采取可能的应急措施后撤离作业场所。",
    hint: "注意区分紧急避险权与拒绝违章指挥权的触发条件"
  },
  {
    id: "law_004",
    subject: "安全生产法律法规",
    knowledgePoint: "安全生产许可证条例",
    subPoint: "适用范围",
    difficulty: 2,
    type: "multi",
    question: "根据《安全生产许可证条例》，下列哪些企业需要取得安全生产许可证？（多选）",
    options: [
      { key: "A", text: "煤矿企业" },
      { key: "B", text: "建筑施工企业" },
      { key: "C", text: "危险化学品生产企业" },
      { key: "D", text: "烟花爆竹生产企业" },
      { key: "E", text: "食品加工企业" }
    ],
    answer: "ABCD",
    explanation: "《安全生产许可证条例》第二条规定：国家对矿山企业、建筑施工企业和危险化学品、烟花爆竹、民用爆炸物品生产企业实行安全生产许可制度。食品加工企业不在范围内。",
    hint: "记住六大高危行业：矿山、建筑施工、危险化学品、烟花爆竹、民用爆炸物品、金属冶炼"
  },
  {
    id: "law_005",
    subject: "安全生产法律法规",
    knowledgePoint: "生产安全事故报告和调查处理条例",
    subPoint: "事故等级划分",
    difficulty: 3,
    type: "single",
    question: "某化工厂发生爆炸事故，造成12人死亡、35人重伤、直接经济损失8600万元。根据《生产安全事故报告和调查处理条例》，该事故属于：",
    options: [
      { key: "A", text: "特别重大事故" },
      { key: "B", text: "重大事故" },
      { key: "C", text: "较大事故" },
      { key: "D", text: "一般事故" }
    ],
    answer: "B",
    explanation: "重大事故的标准：造成10人以上30人以下死亡，或者50人以上100人以下重伤，或者5000万元以上1亿元以下直接经济损失。本题12人死亡达到重大事故标准（≥10人），35人重伤属于较大事故标准，8600万属于重大事故标准，按最严重的判定为重大事故。",
    hint: "口诀：313 151 即 死亡3-10-30，重伤10-50-100，损失1千万-5千万-1亿，分别对应较大、重大、特别重大"
  },

  // ==================== 安全生产管理 ====================
  {
    id: "mgmt_001",
    subject: "安全生产管理",
    knowledgePoint: "安全生产责任制",
    subPoint: "责任体系建设",
    difficulty: 1,
    type: "single",
    question: "安全生产管理的核心是：",
    options: [
      { key: "A", text: "安全技术措施" },
      { key: "B", text: "安全生产责任制" },
      { key: "C", text: "安全教育培训" },
      { key: "D", text: "安全监督检查" }
    ],
    answer: "B",
    explanation: "安全生产责任制是安全生产管理的核心，是所有安全生产规章制度的基础。只有明确各岗位的安全责任，才能实现全员、全过程、全方位的安全管理。",
    hint: "所有安全管理的制度基础都是责任制"
  },
  {
    id: "mgmt_002",
    subject: "安全生产管理",
    knowledgePoint: "安全教育培训",
    subPoint: "三级安全教育",
    difficulty: 2,
    type: "single",
    question: "新上岗的从业人员，岗前安全培训时间不得少于多少学时？",
    options: [
      { key: "A", text: "16学时" },
      { key: "B", text: "24学时" },
      { key: "C", text: "32学时" },
      { key: "D", text: "72学时" }
    ],
    answer: "B",
    explanation: "根据《生产经营单位安全培训规定》，新上岗的从业人员岗前安全培训时间不得少于24学时。煤矿、非煤矿山、危险化学品、烟花爆竹、金属冶炼等生产经营单位新上岗的从业人员安全培训时间不得少于72学时。",
    hint: "一般行业24学时，高危行业72学时，每年再培训分别为8学时和20学时"
  },
  {
    id: "mgmt_003",
    subject: "安全生产管理",
    knowledgePoint: "危险源辨识与风险评估",
    subPoint: "LEC评价法",
    difficulty: 3,
    type: "single",
    question: "采用LEC评价法评估作业条件危险性时，D = L × E × C。其中E代表：",
    options: [
      { key: "A", text: "事故发生的可能性" },
      { key: "B", text: "人员暴露于危险环境的频繁程度" },
      { key: "C", text: "发生事故产生的后果" },
      { key: "D", text: "危险性分值" }
    ],
    answer: "B",
    explanation: "LEC评价法中：L（Likelihood）—事故发生的可能性；E（Exposure）—人员暴露于危险环境的频繁程度；C（Consequence）—发生事故产生的后果；D（Danger）—危险性分值，D=L×E×C。",
    hint: "LEC = 可能性 × 暴露频率 × 后果严重度"
  },
  {
    id: "mgmt_004",
    subject: "安全生产管理",
    knowledgePoint: "事故致因理论",
    subPoint: "海因里希法则",
    difficulty: 2,
    type: "single",
    question: "海因里希法则指出，在330起同类事故中，重伤或死亡、轻伤和无伤害事故的比例约为：",
    options: [
      { key: "A", text: "1:10:100" },
      { key: "B", text: "1:29:300" },
      { key: "C", text: "1:50:500" },
      { key: "D", text: "1:100:1000" }
    ],
    answer: "B",
    explanation: "海因里希通过对55万件事故的统计分析，提出在330起事故中，重伤或死亡1起、轻伤29起、无伤害300起，即1:29:300，这就是著名的海因里希法则。",
    hint: "口诀：1死29伤300无伤（1:29:300）"
  },
  {
    id: "mgmt_005",
    subject: "安全生产管理",
    knowledgePoint: "安全投入与安全生产费用",
    subPoint: "费用提取标准",
    difficulty: 3,
    type: "multi",
    question: "关于企业安全生产费用的提取和使用，下列说法正确的有：（多选）",
    options: [
      { key: "A", text: "安全生产费用按照'企业提取、政府监管、确保需要、规范使用'的原则进行管理" },
      { key: "B", text: "煤矿企业依据开采的原矿产量按月提取" },
      { key: "C", text: "安全生产费用可以用于'三同时'要求的安全设施支出" },
      { key: "D", text: "企业提取的安全生产费用应当专户核算，不得挤占、挪用" }
    ],
    answer: "ABD",
    explanation: "A和D是基本原则和核算要求，B是煤矿企业的提取依据。C选项错误：安全费用不包括新建、改建、扩建项目安全评价以及'三同时'要求初期投入的安全设施。",
    hint: "安全生产费用 ≠ 安全设施三同时费用"
  },

  // ==================== 安全生产技术基础 ====================
  {
    id: "tech_001",
    subject: "安全生产技术基础",
    knowledgePoint: "机械安全技术",
    subPoint: "防护装置",
    difficulty: 2,
    type: "single",
    question: "机械设备的防护装置按使用功能可分为固定式防护装置、活动式防护装置和：",
    options: [
      { key: "A", text: "联锁式防护装置" },
      { key: "B", text: "可调式防护装置" },
      { key: "C", text: "自动式防护装置" },
      { key: "D", text: "距离式防护装置" }
    ],
    answer: "A",
    explanation: "防护装置按使用功能分为：固定式防护装置、活动式防护装置和联锁式防护装置。固定式只有用工具才能打开；活动式不需工具即可打开；联锁式与控制系统互锁。",
    hint: "三种功能类型：固定、活动、联锁"
  },
  {
    id: "tech_002",
    subject: "安全生产技术基础",
    knowledgePoint: "电气安全技术",
    subPoint: "触电防护",
    difficulty: 1,
    type: "single",
    question: "根据电流对人体的伤害程度，感知电流是指：",
    options: [
      { key: "A", text: "能够引起人体感觉的最小电流" },
      { key: "B", text: "能够致人死亡的最小电流" },
      { key: "C", text: "人体能够自主摆脱的最大电流" },
      { key: "D", text: "引起心室纤维性颤动的电流" }
    ],
    answer: "A",
    explanation: "感知电流是指能够引起人体感觉的最小电流值。工频交流电的感知电流约为0.5-1mA。摆脱电流约为10mA，室颤电流约为50mA（1秒内）。",
    hint: "三档电流：感知0.5-1mA → 摆脱~10mA → 室颤~50mA"
  },
  {
    id: "tech_003",
    subject: "安全生产技术基础",
    knowledgePoint: "特种设备安全",
    subPoint: "锅炉安全附件",
    difficulty: 3,
    type: "single",
    question: "锅炉的三大安全附件是：",
    options: [
      { key: "A", text: "安全阀、压力表、温度计" },
      { key: "B", text: "安全阀、压力表、水位表" },
      { key: "C", text: "安全阀、水位表、排污阀" },
      { key: "D", text: "压力表、水位表、给水阀" }
    ],
    answer: "B",
    explanation: "锅炉的三大安全附件是安全阀、压力表和水位表。安全阀防止超压，压力表监测工作压力，水位表显示锅筒内水位。三者共同保障锅炉安全运行。",
    hint: "锅炉三大件：安全阀（防超压）+ 压力表（看压力）+ 水位表（看水位）"
  },
  {
    id: "tech_004",
    subject: "安全生产技术基础",
    knowledgePoint: "防火防爆安全技术",
    subPoint: "爆炸极限",
    difficulty: 2,
    type: "single",
    question: "可燃气体、蒸气或粉尘与空气混合后，遇火源能发生爆炸的浓度范围称为爆炸极限。影响爆炸极限的因素不包括：",
    options: [
      { key: "A", text: "初始温度" },
      { key: "B", text: "初始压力" },
      { key: "C", text: "惰性气体含量" },
      { key: "D", text: "容器颜色" }
    ],
    answer: "D",
    explanation: "影响爆炸极限的因素包括：初始温度（升高→范围变宽）、初始压力（升高→范围变宽）、惰性气体含量（增加→范围变窄甚至不爆炸）、点火源能量、容器尺寸等。容器颜色不影响爆炸极限。",
    hint: "温度↑ 压力↑ → 爆炸范围变宽；惰性气体↑ → 变窄"
  },
  {
    id: "tech_005",
    subject: "安全生产技术基础",
    knowledgePoint: "特种设备安全",
    subPoint: "压力容器分类",
    difficulty: 3,
    type: "multi",
    question: "下列属于《特种设备安全监察条例》监管范围内的压力容器有：（多选）",
    options: [
      { key: "A", text: "最高工作压力0.15MPa、容积30L的压缩空气储罐" },
      { key: "B", text: "最高工作压力0.05MPa、容积50L的氮气储罐" },
      { key: "C", text: "最高工作压力0.3MPa、容积20L的液化气钢瓶" },
      { key: "D", text: "最高工作压力0.1MPa、容积20L的氧气瓶" }
    ],
    answer: "AC",
    explanation: "压力容器监管条件：最高工作压力≥0.1MPa，且压力×容积≥2.5MPa·L。A：0.15×30=4.5≥2.5 ✓；B：0.05×50=2.5，但压力<0.1 ✗；C：0.3×20=6≥2.5 ✓；D：0.1×20=2<2.5 ✗。",
    hint: "双条件：压力≥0.1MPa 且 P×V≥2.5MPa·L"
  },

  // ==================== 安全生产专业实务 ====================
  {
    id: "practice_001",
    subject: "安全生产专业实务",
    knowledgePoint: "案例分析·危险有害因素辨识",
    subPoint: "GB/T 13861分类",
    difficulty: 3,
    type: "case",
    question: "某化工企业储罐区，操作工在切换阀门时未执行双人复核制度，导致物料泄漏并引发火灾。按照GB/T 13861《生产过程危险和有害因素分类与代码》，操作工未执行双人复核属于哪类危险因素？",
    options: [
      { key: "A", text: "人的因素" },
      { key: "B", text: "物的因素" },
      { key: "C", text: "环境因素" },
      { key: "D", text: "管理因素" }
    ],
    answer: "A",
    explanation: "根据GB/T 13861，人的因素包括心理/生理性危险因素和行为性危险因素。未执行双人复核属于行为性危险因素——操作失误/违章操作，归类为人的因素。管理因素主要指安全管理制度不完善等。",
    hint: "行为违章→人的因素；制度缺失→管理因素。注意区分"
  },
  {
    id: "practice_002",
    subject: "安全生产专业实务",
    knowledgePoint: "案例分析·事故应急处置",
    subPoint: "应急响应程序",
    difficulty: 2,
    type: "single",
    question: "发生危险化学品泄漏事故后，现场人员首先应采取的措施是：",
    options: [
      { key: "A", text: "立即进行堵漏操作" },
      { key: "B", text: "报警并报告上级" },
      { key: "C", text: "疏散无关人员并设立警戒区" },
      { key: "D", text: "启动应急预案" }
    ],
    answer: "C",
    explanation: "应急处置的首要原则是'以人为本'。事故发生后，首先应确保人员安全——疏散无关人员并设立警戒区，防止事态扩大。然后才依次报警报告、启动预案、开展处置。",
    hint: "顺序：救人第一 → 报警报告 → 启动预案 → 现场处置"
  },
  {
    id: "practice_003",
    subject: "安全生产专业实务",
    knowledgePoint: "案例分析·安全评价",
    subPoint: "预先危险性分析",
    difficulty: 3,
    type: "single",
    question: "在建设项目可行性研究阶段，通常采用哪种安全评价方法进行初步的危险有害因素辨识？",
    options: [
      { key: "A", text: "HAZOP分析" },
      { key: "B", text: "故障树分析（FTA）" },
      { key: "C", text: "预先危险性分析（PHA）" },
      { key: "D", text: "作业条件危险性评价（LEC）" }
    ],
    answer: "C",
    explanation: "预先危险性分析（PHA）适用于项目开发初期（概念设计/可行性研究阶段），在各项工作开始前对系统存在的危险类别、出现条件、事故后果进行概略分析。HAZOP和FTA需要详细的工艺设计信息，LEC适用于运行阶段的作业活动。",
    hint: "各阶段对应：可行性研究→PHA；详细设计→HAZOP；运行→LEC"
  },
  {
    id: "practice_004",
    subject: "安全生产专业实务",
    knowledgePoint: "案例分析·事故调查报告",
    subPoint: "整改措施建议",
    difficulty: 2,
    type: "multi",
    question: "某建筑施工项目发生高处坠落事故，造成2人死亡。事故调查报告的整改措施建议应包括：（多选）",
    options: [
      { key: "A", text: "修订完善高处作业安全操作规程" },
      { key: "B", text: "对全员进行高处作业专项安全培训" },
      { key: "C", text: "直接关闭该项目施工" },
      { key: "D", text: "对相关责任人进行责任追究" },
      { key: "E", text: "全面排查现场安全防护设施" }
    ],
    answer: "ABDE",
    explanation: "整改措施应从技术、管理、教育、个体防护等方面系统提出。ABDE均为合理措施。C选项'直接关闭项目施工'不是整改措施，而是行政处罚决定，不属于事故调查报告的整改建议范畴。",
    hint: "整改四维度：技术措施 + 管理措施 + 教育培训 + 个体防护"
  },
  {
    id: "practice_005",
    subject: "安全生产专业实务",
    knowledgePoint: "案例分析·综合",
    subPoint: "多知识点融合",
    difficulty: 3,
    type: "case",
    question: "某矿山水泵房发生透水事故。经调查：①水泵房位于矿井-300m水平；②水文地质资料显示该区域存在老空水威胁；③未编制探放水设计；④当班班长发现煤壁出汗仍指挥继续作业；⑤井下避灾路线标识不清。综合来看，本次事故的直接原因是：",
    options: [
      { key: "A", text: "未编制探放水设计" },
      { key: "B", text: "发现透水预兆后未立即撤人" },
      { key: "C", text: "水文地质资料管理不到位" },
      { key: "D", text: "避灾路线标识不清" }
    ],
    answer: "B",
    explanation: "直接原因是指直接导致事故发生的原因，即事故发生的'引爆点'。本题中，发现煤壁出汗（透水预兆）后仍继续作业是导致事故的直接原因。未编制探放水设计是间接原因（管理原因），水文地质资料管理不到位是管理缺陷。",
    hint: "直接原因=最后一环的操作失误；间接原因=前面的管理漏洞"
  }
];

// 前置诊断题
const PRE_DIAGNOSIS_QUESTIONS = [
  {
    id: "pre_1",
    field: "education",
    title: "您的最高学历是？",
    options: [
      { key: "A", text: "中专", value: 10 },
      { key: "B", text: "大专", value: 25 },
      { key: "C", text: "本科", value: 40 },
      { key: "D", text: "硕士及以上", value: 50 }
    ]
  },
  {
    id: "pre_2",
    field: "major",
    title: "您的专业背景是？",
    options: [
      { key: "A", text: "安全工程及相关专业", value: 50 },
      { key: "B", text: "理工科类（非安全专业）", value: 35 },
      { key: "C", text: "文科/经管类", value: 20 },
      { key: "D", text: "其他", value: 15 }
    ]
  },
  {
    id: "pre_3",
    field: "experience",
    title: "您从事安全生产相关工作的年限？",
    options: [
      { key: "A", text: "5年以上", value: 50 },
      { key: "B", text: "3-5年", value: 40 },
      { key: "C", text: "1-3年", value: 25 },
      { key: "D", text: "1年以内 / 未从事", value: 10 }
    ]
  },
  {
    id: "pre_4",
    field: "target",
    title: "您的考试目标是？",
    options: [
      { key: "A", text: "一年内通过全部4科", value: 30 },
      { key: "B", text: "分两年考，先过2-3科", value: 40 },
      { key: "C", text: "今年先试试水", value: 20 },
      { key: "D", text: "还没想好，了解一下", value: 10 }
    ]
  },
  {
    id: "pre_5",
    field: "studyTime",
    title: "您每天可以投入多少学习时间？",
    options: [
      { key: "A", text: "3小时以上", value: 50 },
      { key: "B", text: "2-3小时", value: 40 },
      { key: "C", text: "1-2小时", value: 25 },
      { key: "D", text: "不到1小时 / 不确定", value: 10 }
    ]
  },
  {
    id: "pre_6",
    field: "attempted",
    title: "您之前考过注册安全工程师吗？",
    options: [
      { key: "A", text: "没考过，第一次", value: 20 },
      { key: "B", text: "考过，但没过", value: 30 },
      { key: "C", text: "考过，过了部分科目", value: 40 },
      { key: "D", text: "已持证，增项", value: 50 }
    ]
  },
  {
    id: "pre_7",
    field: "selfWeakness",
    title: "您觉得自己的薄弱环节在？",
    options: [
      { key: "A", text: "法律法规背不下来", value: 25 },
      { key: "B", text: "管理知识太抽象", value: 25 },
      { key: "C", text: "技术计算题搞不定", value: 25 },
      { key: "D", text: "案例分析不会答", value: 25 }
    ]
  }
];

// 报告解读模板
const REPORT_TEMPLATES = {
  levelHigh: {
    label: "优秀",
    color: "#22c55e",
    icon: "🌟",
    description: "基础扎实，通过率高",
    strategy: "保持节奏，查漏补缺，主攻案例分析提升答题技巧"
  },
  levelMedium: {
    label: "中等",
    color: "#f59e0b",
    icon: "📚",
    description: "有一定基础，需要系统加强",
    strategy: "重点突破薄弱科目，建议跟着课程体系走，每天保证2小时以上学习"
  },
  levelLow: {
    label: "需要加强",
    color: "#ef4444",
    icon: "🎯",
    description: "基础薄弱，需要从零系统学习",
    strategy: "建议从法规和管理入手建立知识框架，再攻克技术和实务，强烈建议报班系统学习"
  }
};

// 报考条件判断规则
function checkEligibility(education, experience, major) {
  const eduMap = { "A": "中专", "B": "大专", "C": "本科", "D": "硕士及以上" };
  const expMap = { "A": "5年以上", "B": "3-5年", "C": "1-3年", "D": "1年以内" };
  const majorMap = { "A": "安全相关", "B": "理工科", "C": "文科", "D": "其他" };

  // 简化判断逻辑（实际应根据官方最新政策）
  const eduScore = { "A": 1, "B": 2, "C": 3, "D": 4 };
  const expScore = { "A": 4, "B": 3, "C": 2, "D": 1 };

  const combined = eduScore[education] + expScore[experience];

  if (combined >= 7) return { eligible: true, level: "high", detail: "符合报考条件，建议尽早报名" };
  if (combined >= 4) return { eligible: true, level: "medium", detail: "基本符合条件，建议核实当地具体政策" };
  return { eligible: false, level: "low", detail: "可能暂不满足工作年限要求，建议咨询确认" };
}

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTION_BANK, PRE_DIAGNOSIS_QUESTIONS, REPORT_TEMPLATES, checkEligibility };
}
