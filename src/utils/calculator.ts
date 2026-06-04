import type { Answer, MBTIType, Dimension } from '@/types'
import { questions } from '@/data/questions'

export const calculator = {
  calculateDimensions(answers: Answer[]): Record<Dimension, number> {
    const dimensions: Record<Dimension, number> = {
      E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
    }

    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId)
      if (question) {
        const opposite: Record<Dimension, Dimension> = {
          E: 'I', I: 'E', S: 'N', N: 'S', T: 'F', F: 'T', J: 'P', P: 'J'
        }
        if (answer.answer === question.dimension) {
          dimensions[answer.answer] += 1
        } else {
          dimensions[opposite[question.dimension]] += 1
        }
      }
    })

    return dimensions
  },

  determineType(dimensions: Record<Dimension, number>): MBTIType {
    const eOrI = dimensions.E >= dimensions.I ? 'E' : 'I'
    const sOrN = dimensions.S >= dimensions.N ? 'S' : 'N'
    const tOrF = dimensions.T >= dimensions.F ? 'T' : 'F'
    const jOrP = dimensions.J >= dimensions.P ? 'J' : 'P'

    return `${eOrI}${sOrN}${tOrF}${jOrP}` as MBTIType
  },

  generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
}
