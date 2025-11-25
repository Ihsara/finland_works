
import { TranslationResource } from "./types";

export const zh: TranslationResource = {
  ui: {
    landing_welcome: "欢迎！", landing_subtitle: "寻找你在芬兰的职业道路", landing_btn_quiz: "介绍你自己", landing_btn_continue: "打开我的指南", landing_btn_ask: "开始对话", landing_btn_browse: "浏览指南", landing_load_sample: "加载示例", landing_erase: "清除数据", landing_add_key: "添加 API 密钥", landing_choose_lang: "语言",
    dash_greeting: "你好, {name}!", dash_greeting_guest: "你好!", dash_subtitle: "欢迎回到你的芬兰个人指南。", dash_subtitle_guest: "让我们创建档案开始吧。", dash_btn_guide: "打开指南", dash_btn_browse: "浏览", dash_btn_ask: "询问 AI", dash_btn_history: "历史记录", dash_btn_cv: "导入简历", dash_switch_profile: "切换", dash_new_profile: "新建", dash_edit_profile: "编辑", dash_profile_overview: "个人资料",
    dash_education: "教育", dash_profession: "职业", dash_languages: "语言", dash_narrative_aspirations: "目标", dash_narrative_challenges: "挑战",
    chat_placeholder: "问点什么...", chat_end_session: "结束", chat_header_assistant: "助手", chat_prompt_context_inquiry: "详细告诉我关于 \"{sentence}\"", chat_ask_length: "简短还是详细回答？",
    btn_back_dashboard: "返回", btn_save: "保存",
    profile_btn_guide: "我的指南", profile_btn_guide_desc: "推荐文章", profile_btn_plan: "我的计划", profile_btn_plan_desc: "即将推出", profile_sect_languages: "语言能力", profile_sect_skills: "技能", profile_sect_narrative: "个人故事", profile_label_aspirations: "愿望", profile_label_challenges: "担忧", profile_label_education: "学历", profile_label_profession: "职业", profile_completeness: "{percentage}% 完成", profile_completeness_hint: "再回答几个问题", profile_btn_update: "更新资料", profile_btn_continue: "继续",
    wiki_header_title: "Finland Works!", wiki_header_subtitle: "专为 {name} 打造", wiki_explore_cats: "浏览分类", wiki_explore_subtitle: "选择主题查看详情。", wiki_full_index: "索引", wiki_full_index_subtitle: "所有主题。", wiki_nav_list: "列表", wiki_nav_icons: "图标", wiki_section_chapters: "章节", wiki_btn_mark_done: "完成", wiki_btn_later: "稍后", wiki_btn_saved: "已保存", wiki_btn_completed: "已完成", wiki_ctx_ask: "询问此内容", wiki_topic_label: "主题: {tag}", wiki_topic_desc: "概览与文章", wiki_guide_prefix: "指南", wiki_stat_articles: "文章", wiki_stat_complete: "完成", wiki_section_prefix: "部分",
    wizard_header_quiz: "问卷", wizard_greeting_short: "你好, {name}!", wizard_title_init: "创建资料", wizard_title_custom: "{name} 角色创建", wizard_phase_identity: "第一阶段：身份", wizard_phase_demo: "第二阶段：背景", wizard_phase_status: "第三阶段：状态", wizard_phase_skills: "第四阶段：技能", wizard_phase_mindset: "第五阶段：心态", wizard_phase_vision: "第六阶段：愿景", wizard_nickname_hint: "* 你可以使用昵称。", wizard_btn_ask: "提问", wizard_btn_next: "下一步", wizard_btn_prev: "上一步", wizard_btn_submit: "提交", wizard_btn_finish_early: "保存并结束", wizard_btn_generate_name: "生成昵称", wizard_ribbon_greeting: "很高兴认识你, {name}!", wizard_title_name: "你叫什么名字？", wizard_desc_name: "输入名字或选择", wizard_placeholder_name: "你的名字",
    wizard_step2_title: "你多大了？", wizard_step2_desc: "选择年龄段", wizard_step2_placeholder: "年龄",
    wizard_step3_title: "婚姻状况？",
    wizard_marital_solo_title: "单身", wizard_marital_solo_desc: "无伴侣或子女同行", wizard_marital_pair_title: "有家庭", wizard_marital_pair_desc: "有配偶或子女", wizard_marital_secret_title: "保密", wizard_marital_secret_desc: "不想说",
    wizard_children_title: "有孩子吗？", wizard_children_desc: "这有助于我们提供关于学校的建议。", wizard_children_yes: "有", wizard_children_no: "没有", wizard_family_details_title: "家庭详情", wizard_family_count_label: "几个孩子？", wizard_family_ages_label: "年龄？", wizard_family_ages_hint: "选择所有适用项。", wizard_age_group_0_6: "幼儿园 (0-6)", wizard_age_group_7_12: "小学 (7-12)", wizard_age_group_13_17: "青少年 (13-17)", wizard_age_group_18: "成年 (18+)",
    wizard_step4_title: "你来自哪里？", wizard_step4_desc: "原籍国", wizard_step4_placeholder: "输入国家名称...", wizard_step4_no_match: "未找到", wizard_btn_search_country: "搜索国家", wizard_btn_select_region: "选择地区", wizard_region_europe: "欧洲", wizard_region_americas: "美洲", wizard_region_asia: "亚洲", wizard_region_africa: "非洲", wizard_region_oceania: "大洋洲", wizard_region_middle_east: "中东", wizard_eu_question: "欧盟公民？", wizard_eu_yes: "是", wizard_eu_no: "否",
    wizard_step5_title: "工作权利", wizard_permit_full_title: "无限制", wizard_permit_full_desc: "永居, 家庭, 欧盟", wizard_permit_restricted_title: "受限", wizard_permit_restricted_desc: "工作许可绑定雇主", wizard_permit_student_title: "学生", wizard_permit_student_desc: "工作时间受限",
    wizard_step6_title: "最高学历", wizard_step6_desc: "哪个最符合？", wizard_step6_field_label: "专业 (可选)", wizard_step6_field_placeholder: "例如 工程", wizard_edu_general_title: "普通教育", wizard_edu_general_desc: "高中。", wizard_edu_applied_title: "职业教育", wizard_edu_applied_desc: "职业学校或应用科技大学。", wizard_edu_uni_title: "大学", wizard_edu_uni_desc: "学术学位。",
    wizard_step7_title: "你的职业？", wizard_step7_desc: "或者你在找什么工作？", wizard_step7_placeholder: "例如 护士, 程序员",
    wizard_step8_title: "芬兰语", wizard_lbl_finnish_level: "当前水平", wizard_lbl_finnish_motivation: "动力", wizard_opt_lang_none: "无", wizard_opt_lang_basics: "基础 (A1)", wizard_opt_lang_inter: "中级 (A2-B1)", wizard_opt_lang_fluent: "流利 (B2+)", wizard_scale_1_motivation: "好奇", wizard_scale_5_motivation: "势不可挡",
    wizard_step9_title: "英语", wizard_opt_lang_en_none: "无", wizard_opt_lang_en_basic: "基础", wizard_opt_lang_en_working: "工作水平", wizard_opt_lang_en_fluent: "流利",
    wizard_step10_title: "愿景", wizard_step10_aspirations_label: "目标", wizard_step10_aspirations_placeholder: "你想实现什么？", wizard_step10_challenges_label: "挑战", wizard_step10_challenges_placeholder: "有什么担心的？",
    wizard_step12_title: "对文化的感受？", wizard_opt_cult_low: "神秘", wizard_opt_cult_med: "观察中", wizard_opt_cult_high: "深度融入",
    wizard_step13_title: "生活节奏？", wizard_scale_1_life: "陌生", wizard_scale_5_life: "像家一样",
    wizard_step14_title: "找工作的信心？", wizard_scale_1_career: "需要指导", wizard_scale_5_career: "有计划",
    wizard_step15_title: "前路清晰吗？", wizard_opt_info_none: "迷茫", wizard_opt_info_some: "逐渐清晰", wizard_opt_info_high: "非常清晰",
    wizard_step16_title: "什么让你快乐？", wizard_opt_excite_career: "事业", wizard_opt_excite_life: "安全感", wizard_opt_excite_nature: "自然", wizard_opt_excite_adventure: "冒险",
    wizard_rating_winter: "冬", wizard_rating_thaw: "融化", wizard_rating_growth: "生长", wizard_rating_bloom: "绽放", wizard_rating_summer: "夏",
    history_title: "历史记录", history_empty: "暂无对话。", history_tab_summary: "摘要", history_tab_transcript: "记录", history_no_summary: "无摘要。", history_generating: "生成中...", history_generating_desc: "后台运行。",
    cv_title: "分析简历", cv_subtitle: "粘贴简历文本以自动填写。", cv_placeholder: "文本...", cv_btn_analyze: "分析", cv_btn_processing: "处理中...", cv_warning_key: "需要 API 密钥。", cv_key_update: "更新密钥", cv_key_required: "需要密钥", cv_key_desc: "为了安全，请使用自己的密钥。", cv_key_placeholder: "密钥...", cv_key_save: "保存", cv_alert_success: "已保存。", cv_alert_error: "错误。", cv_btn_manage_key: "API 密钥",
    settings_title: "设置", settings_sect_general: "常规", settings_sect_appearance: "外观", settings_sect_data: "数据", settings_length_label: "回答长度", settings_theme_label: "主题", settings_theme_system: "系统", settings_theme_light: "浅色", settings_theme_dark: "深色", settings_opt_ask: "询问", settings_opt_short: "简短", settings_opt_long: "详细", settings_clear_data: "清除数据", settings_clear_data_desc: "删除所有内容。", settings_btn_clear: "全部清除"
  },
  wiki: {
    titles: {
      foundation: '基础', job_strategy: '求职策略', workplace: '职场文化', industries: '行业', life: '生活',
      identity: '身份与许可', security: '社保', market: '市场', tools: '工具', rights: '权利',
      social: '社交', norms: '规范', specialist: '专家', hands_on: '蓝领', housing: '住房',
      family: '家庭', language: '语言',
      social_unemployment: '失业金', social_housing: '住房补贴', social_pension: '养老金',
      bureaucracy_dvv: 'DVV 与个人ID', bureaucracy_migri: '移民局 (Migri)', bureaucracy_tax: '税卡',
      job_te_office: 'TE 办公室', job_portals: '招聘网站', job_entrepreneurship: '创业',
      job_cover_letter: '求职信', job_interview: '面试', job_linkedin: 'LinkedIn', job_recognition: '学历认证',
      work_contract: '合同', work_hours: '工时', work_holidays: '假期',
      culture_meetings: '会议', culture_feedback: '反馈', culture_names: '称呼',
      prof_engineering: '工程', prof_business: '商业',
      housing_contracts: '租赁合同', family_school: '学校'
    },
    articles: {
      'guide_start': { title: '欢迎来到芬兰！🇫🇮', content: `# 生存指南\n\n**哲学：**\n芬兰依靠信任、沉默和咖啡运作。\n\n### 使用方法\n1. **阅读：** 浏览指南。\n2. **聊天：** 询问 AI。\n3. **档案：** 保持更新。` },
      'bureaucracy_dvv': { title: 'DVV 与个人 ID', content: `# DVV 🆔\n\n**优先级：立即**\n\n### 任务\n合法存在。获取 **个人身份证号**。\n\n### 为什么需要？\n银行，电话，税卡。` },
      'bureaucracy_migri': { title: '移民局 (Migri)', content: `# Migri 🛂\n\n### 任务\n居留许可。\n\n### 提示\n* **尽早预约：** 队伍很长。\n* **快速通道：** 针对专家。` },
      'bureaucracy_tax': { title: '税卡', content: `# Verokortti 💳\n\n**规则：** 没卡 = 60% 税。\n\n### 流程\n1. 登录 **OmaVero**。\n2. 估算收入。\n3. 获取 PDF。\n4. 发给雇主。` },
      'social_unemployment': { title: '失业金', content: `# 失业了？📉\n\n### 1. 立即注册\n第一天就在 **TE Office** 注册。\n\n### 2. 支付方\n* **Kela:** 基础金。\n* **基金会:** 与收入挂钩（如果是会员）。` },
      'job_market_overview': { title: '就业市场', content: `# 隐形市场 📉\n\n**70-80% 的工作不公开招聘。**\n\n### 策略\n* **人脉：** 朋友介绍。\n* **直接联系：** 给公司发邮件。` },
      'culture_meetings': { title: '会议', content: `# 会议 📅\n\n**高效且准时。**\n\n* **开始：** 准点。\n* **议程：** 严格遵守。\n* **无废话。**` },
      'culture_essentials': { title: '价值观', content: `# 信任与沉默 🤫\n\n1. **信任：** 说到做到。\n2. **沉默：** 别用废话填补沉默。` }
    }
  }
};
