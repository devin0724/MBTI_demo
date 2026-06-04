export type Dimension = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export type MBTIType = 
  | 'ISTJ' | 'ISFJ' | 'INFJ' | 'INTJ'
  | 'ISTP' | 'ISFP' | 'INFP' | 'INTP'
  | 'ESTP' | 'ESFP' | 'ENFP' | 'ENTP'
  | 'ESTJ' | 'ESFJ' | 'ENFJ' | 'ENTJ'

export interface Question {
  id: number
  text: string
  dimension: Dimension
  options: {
    text: string
    value: Dimension
  }[]
}

export interface Answer {
  questionId: number
  answer: Dimension
}

export interface TestResult {
  id: string
  type: MBTIType
  dimensions: {
    E: number
    I: number
    S: number
    N: number
    T: number
    F: number
    J: number
    P: number
  }
  answers: Answer[]
  createdAt: string
}

export interface AnalysisReport {
  type: MBTIType
  typeName: string
  description: string
  strengths: string[]
  weaknesses: string[]
  suitableCareers: string[]
}
