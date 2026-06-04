import type { MBTIType, AnalysisReport } from '@/types'

export const analyses: Record<MBTIType, AnalysisReport> = {
  ISTJ: {
    type: 'ISTJ',
    typeName: '检查员型',
    description: 'ISTJ型的人是严肃的、有责任心的和通情达理的社会坚定分子。他们值得信赖，重视承诺，对他们来说，言语就是庄严的宣誓。',
    strengths: ['可靠', '负责', '务实', '有逻辑', '组织能力强'],
    weaknesses: ['过于保守', '不擅长表达情感', '对变化适应较慢'],
    suitableCareers: ['会计', '审计师', '项目经理', '工程师', '警察', '教师']
  },
  ISFJ: {
    type: 'ISFJ',
    typeName: '守护者型',
    description: 'ISFJ型的人忠诚、有奉献精神和同情心，理解别人的感受。他们意志清醒而有责任心，乐于为人所需。',
    strengths: ['有同情心', '可靠', '细心', '有耐心', '乐于助人'],
    weaknesses: ['过于无私', '害怕冲突', '难以拒绝他人'],
    suitableCareers: ['护士', '教师', '社会工作者', '行政助理', '图书管理员']
  },
  INFJ: {
    type: 'INFJ',
    typeName: '咨询师型',
    description: 'INFJ型的人生活在思想的世界里。他们是独立的、有独创性的思想家，具有强烈的感情、坚定的原则和正直的人性。',
    strengths: ['洞察力强', '有创造力', '有远见', '有同情心', '坚定'],
    weaknesses: ['过于理想主义', '容易感到疲惫', '对批评敏感'],
    suitableCareers: ['心理咨询师', '作家', '艺术家', '教师', '神职人员']
  },
  INTJ: {
    type: 'INTJ',
    typeName: '战略家型',
    description: 'INTJ型的人是完美主义者。他们强烈地要求个人自由和能力，同时在他们独创的思想中，不可动摇的信仰促使他们达到目标。',
    strengths: ['有远见', '独立', '逻辑思维强', '果断', '有创造力'],
    weaknesses: ['过于独立', '缺乏耐心', '对他人要求过高'],
    suitableCareers: ['科学家', '工程师', '企业家', '战略规划师', '设计师']
  },
  ISTP: {
    type: 'ISTP',
    typeName: '手艺人型',
    description: 'ISTP型的人坦率、诚实、讲求实效，他们喜欢行动而非空谈。他们很谦逊，对于完成工作的方法有很好的理解力。',
    strengths: ['务实', '灵活', '善于分析', '动手能力强', '冷静'],
    weaknesses: ['过于冒险', '不擅长表达情感', '对计划缺乏耐心'],
    suitableCareers: ['工程师', '程序员', '运动员', '警察', '机械师']
  },
  ISFP: {
    type: 'ISFP',
    typeName: '艺术家型',
    description: 'ISFP型的人平和、敏感，他们保持着许多强烈的个人理想和自己的价值观念。他们更多地是通过行为而不是言辞表达自己深沉的情感。',
    strengths: ['敏感', '有艺术天赋', '温和', '灵活', '实际'],
    weaknesses: ['过于敏感', '难以做决定', '不喜欢冲突'],
    suitableCareers: ['艺术家', '设计师', '音乐家', '护士', '兽医']
  },
  INFP: {
    type: 'INFP',
    typeName: '治愈者型',
    description: 'INFP型的人珍视内在和谐胜过一切。他们敏感、理想化、忠诚，对于个人价值具有一种强烈的荣誉感。',
    strengths: ['理想主义', '有创造力', '忠诚', '有同情心', '洞察力强'],
    weaknesses: ['过于理想主义', '容易受伤', '难以拒绝他人'],
    suitableCareers: ['作家', '艺术家', '心理咨询师', '教师', '社会工作者']
  },
  INTP: {
    type: 'INTP',
    typeName: '建筑师型',
    description: 'INTP型的人是解决理性问题者。他们很有才智和创造力，对发现可能性感兴趣，他们对发明新的解决方法比把它们付诸实践更感兴趣。',
    strengths: ['聪明', '有创造力', '独立', '逻辑思维强', '好奇心强'],
    weaknesses: ['过于理论化', '缺乏耐心', '社交能力较弱'],
    suitableCareers: ['科学家', '程序员', '研究员', '数学家', '哲学家']
  },
  ESTP: {
    type: 'ESTP',
    typeName: '创业者型',
    description: 'ESTP型的人不会焦虑，因为他们是快乐的。他们活跃、随遇而安、天真率直。他们乐于享受现在的一切而不是为将来计划什么。',
    strengths: ['精力充沛', '务实', '善于交际', '适应力强', '勇敢'],
    weaknesses: ['缺乏耐心', '冲动', '缺乏计划性'],
    suitableCareers: ['销售', '企业家', '运动员', '警察', '消防员']
  },
  ESFP: {
    type: 'ESFP',
    typeName: '表演者型',
    description: 'ESFP型的人乐意与人相处，有一种真正的生活热情。他们活泼、随和、友善，喜欢一切并使事物由于他们的喜爱而变得更有情趣。',
    strengths: ['热情', '善于交际', '有活力', '乐观', '实际'],
    weaknesses: ['注意力不集中', '冲动', '难以坚持'],
    suitableCareers: ['演员', '销售', '活动策划', '导游', '客服']
  },
  ENFP: {
    type: 'ENFP',
    typeName: '追梦人型',
    description: 'ENFP型的人充满热情和新思想。他们乐观、自然、富有创造性和自信，具有独创性的思想和对可能性的强烈感受。',
    strengths: ['有创造力', '热情', '善于交际', '乐观', '有远见'],
    weaknesses: ['不切实际', '注意力不集中', '难以做决定'],
    suitableCareers: ['作家', '广告创意', '公关', '教师', '创业家']
  },
  ENTP: {
    type: 'ENTP',
    typeName: '辩论家型',
    description: 'ENTP型的人喜欢兴奋与挑战。他们热情开放、足智多谋、健谈而聪明，擅长于许多事情，不断追求增加能力和个人权力。',
    strengths: ['聪明', '有创造力', '善于辩论', '适应力强', '有远见'],
    weaknesses: ['缺乏耐心', '喜欢争论', '难以专注'],
    suitableCareers: ['律师', '企业家', '市场营销', '产品经理', '记者']
  },
  ESTJ: {
    type: 'ESTJ',
    typeName: '管家型',
    description: 'ESTJ型的人高效率地工作，自我负责，监督他人工作，合理分配和处置资源，主次分明，井井有条。',
    strengths: ['负责', '有组织', '可靠', '务实', '果断'],
    weaknesses: ['过于传统', '缺乏耐心', '对变化抗拒'],
    suitableCareers: ['管理者', '行政主管', '会计师', '军官', '教师']
  },
  ESFJ: {
    type: 'ESFJ',
    typeName: '执政官型',
    description: 'ESFJ型的人通过直接的行动和合作积极地以真实、实际的方法帮助别人。他们友好、富有同情心和责任感。',
    strengths: ['友善', '有同情心', '负责', '善于交际', '有组织'],
    weaknesses: ['过于热心', '害怕冲突', '难以拒绝'],
    suitableCareers: ['教师', '护士', '人力资源', '客服', '行政主管']
  },
  ENFJ: {
    type: 'ENFJ',
    typeName: '教育家型',
    description: 'ENFJ型的人热爱人，他们认为帮助别人是自己生活的使命。他们为人热情，富有责任感，关心他人的感受。',
    strengths: ['有魅力', '有同情心', '善于领导', '热情', '有远见'],
    weaknesses: ['过于理想化', '容易疲惫', '难以说不'],
    suitableCareers: ['教师', '心理咨询师', '管理者', '培训师', '神职人员']
  },
  ENTJ: {
    type: 'ENTJ',
    typeName: '指挥官型',
    description: 'ENTJ型的人是伟大的领导者和决策人。他们能轻易地看出事物的可能性，并愿意接受挑战去实现他们的想法。',
    strengths: ['果断', '有远见', '善于领导', '自信', '有组织'],
    weaknesses: ['过于强势', '缺乏耐心', '对他人要求过高'],
    suitableCareers: ['CEO', '企业家', '政治家', '军事领袖', '工程师']
  }
}
