import type { Question } from '@/types'

export const questions: Question[] = [
  {
    id: 1,
    text: '当你需要做出重要决定时，你更倾向于：',
    dimension: 'T',
    options: [
      { text: '理性分析，权衡利弊', value: 'T' },
      { text: '考虑他人感受，寻求和谐', value: 'F' }
    ]
  },
  {
    id: 2,
    text: '你更喜欢哪种工作环境？',
    dimension: 'E',
    options: [
      { text: '充满活力，与人互动', value: 'E' },
      { text: '安静独立，专注思考', value: 'I' }
    ]
  },
  {
    id: 3,
    text: '你通常如何获取新信息？',
    dimension: 'S',
    options: [
      { text: '通过实际经验和具体事实', value: 'S' },
      { text: '通过直觉和可能性', value: 'N' }
    ]
  },
  {
    id: 4,
    text: '你更喜欢制定计划还是顺其自然？',
    dimension: 'J',
    options: [
      { text: '制定详细计划并遵守', value: 'J' },
      { text: '灵活应变，顺其自然', value: 'P' }
    ]
  },
  {
    id: 5,
    text: '当你遇到问题时，你通常：',
    dimension: 'T',
    options: [
      { text: '直接分析问题并解决', value: 'T' },
      { text: '先考虑相关人员的感受', value: 'F' }
    ]
  },
  {
    id: 6,
    text: '社交活动后，你通常感觉：',
    dimension: 'E',
    options: [
      { text: '精力充沛，充满活力', value: 'E' },
      { text: '需要独处恢复精力', value: 'I' }
    ]
  },
  {
    id: 7,
    text: '你更关注：',
    dimension: 'S',
    options: [
      { text: '事物的实际细节', value: 'S' },
      { text: '事物的整体概念和可能性', value: 'N' }
    ]
  },
  {
    id: 8,
    text: '你对时间的态度是：',
    dimension: 'J',
    options: [
      { text: '喜欢提前安排，按时完成', value: 'J' },
      { text: '喜欢灵活安排，截止日前完成', value: 'P' }
    ]
  },
  {
    id: 9,
    text: '在团队中，你更擅长：',
    dimension: 'F',
    options: [
      { text: '协调人际关系，促进合作', value: 'F' },
      { text: '分析问题，提出解决方案', value: 'T' }
    ]
  },
  {
    id: 10,
    text: '你更喜欢：',
    dimension: 'I',
    options: [
      { text: '与少数亲密朋友深入交流', value: 'I' },
      { text: '参与大型社交聚会', value: 'E' }
    ]
  },
  {
    id: 11,
    text: '学习新知识时，你更倾向于：',
    dimension: 'N',
    options: [
      { text: '先理解整体框架再深入细节', value: 'N' },
      { text: '从具体实例开始逐步理解', value: 'S' }
    ]
  },
  {
    id: 12,
    text: '你处理任务的方式是：',
    dimension: 'P',
    options: [
      { text: '保持开放，随时调整', value: 'P' },
      { text: '按部就班，遵循计划', value: 'J' }
    ]
  },
  {
    id: 13,
    text: '你更看重：',
    dimension: 'T',
    options: [
      { text: '公正和逻辑', value: 'T' },
      { text: '同情和体谅', value: 'F' }
    ]
  },
  {
    id: 14,
    text: '你获得能量的方式是：',
    dimension: 'E',
    options: [
      { text: '与他人交往', value: 'E' },
      { text: '独自思考', value: 'I' }
    ]
  },
  {
    id: 15,
    text: '你看待世界的方式更倾向于：',
    dimension: 'S',
    options: [
      { text: '务实和现实', value: 'S' },
      { text: '想象和创新', value: 'N' }
    ]
  },
  {
    id: 16,
    text: '你对生活的态度是：',
    dimension: 'J',
    options: [
      { text: '有组织、有计划', value: 'J' },
      { text: '自由、灵活', value: 'P' }
    ]
  },
  {
    id: 17,
    text: '你做决定时主要依据：',
    dimension: 'F',
    options: [
      { text: '个人价值观和他人感受', value: 'F' },
      { text: '客观事实和逻辑推理', value: 'T' }
    ]
  },
  {
    id: 18,
    text: '你更享受：',
    dimension: 'I',
    options: [
      { text: '安静的夜晚阅读', value: 'I' },
      { text: '热闹的派对聚会', value: 'E' }
    ]
  },
  {
    id: 19,
    text: '你更喜欢的学习方式是：',
    dimension: 'N',
    options: [
      { text: '理论和概念', value: 'N' },
      { text: '实践和经验', value: 'S' }
    ]
  },
  {
    id: 20,
    text: '面对最后期限，你通常：',
    dimension: 'P',
    options: [
      { text: '在压力下高效工作', value: 'P' },
      { text: '提前完成，避免压力', value: 'J' }
    ]
  },
  {
    id: 21,
    text: '在争论中，你更关注：',
    dimension: 'T',
    options: [
      { text: '观点的正确性', value: 'T' },
      { text: '维护关系和谐', value: 'F' }
    ]
  },
  {
    id: 22,
    text: '你更愿意：',
    dimension: 'E',
    options: [
      { text: '主动与人交往', value: 'E' },
      { text: '等待他人主动', value: 'I' }
    ]
  },
  {
    id: 23,
    text: '你相信：',
    dimension: 'S',
    options: [
      { text: '已知的事实', value: 'S' },
      { text: '直觉的预感', value: 'N' }
    ]
  },
  {
    id: 24,
    text: '你喜欢的生活状态是：',
    dimension: 'J',
    options: [
      { text: '井然有序', value: 'J' },
      { text: '顺其自然', value: 'P' }
    ]
  },
  {
    id: 25,
    text: '你更倾向于：',
    dimension: 'E',
    options: [
      { text: '与人讨论后再做决定', value: 'E' },
      { text: '独自思考后再做决定', value: 'I' }
    ]
  },
  {
    id: 26,
    text: '你更喜欢的娱乐方式：',
    dimension: 'I',
    options: [
      { text: '在家看书或看电影', value: 'I' },
      { text: '和朋友外出聚会', value: 'E' }
    ]
  },
  {
    id: 27,
    text: '你更相信：',
    dimension: 'S',
    options: [
      { text: '自己的五感体验', value: 'S' },
      { text: '自己的直觉判断', value: 'N' }
    ]
  },
  {
    id: 28,
    text: '你看待未来更倾向于：',
    dimension: 'N',
    options: [
      { text: '设想各种可能性', value: 'N' },
      { text: '关注现实情况', value: 'S' }
    ]
  },
  {
    id: 29,
    text: '你评价他人时更看重：',
    dimension: 'T',
    options: [
      { text: '能力和效率', value: 'T' },
      { text: '善良和真诚', value: 'F' }
    ]
  },
  {
    id: 30,
    text: '团队合作中，你更关注：',
    dimension: 'F',
    options: [
      { text: '团队成员的感受', value: 'F' },
      { text: '任务的完成质量', value: 'T' }
    ]
  },
  {
    id: 31,
    text: '你更喜欢的工作方式：',
    dimension: 'J',
    options: [
      { text: '按计划逐步推进', value: 'J' },
      { text: '灵活调整随时变化', value: 'P' }
    ]
  },
  {
    id: 32,
    text: '你如何应对意外情况：',
    dimension: 'P',
    options: [
      { text: '随机应变，即兴发挥', value: 'P' },
      { text: '迅速制定新计划', value: 'J' }
    ]
  }
]
