import { calculateMove, calculateScore, type Round } from './index'

const matches: Round[] = [
  [1, 2],
  [2, 1],
  [3, 3],

  [2, 2],
  [1, 1],
  [1, 3],

  [3, 2],
  [3, 1],
  [2, 3],
]

describe('Given two inputs 1-3', () => {
  describe('When calculating the match result', () => {
    test('Then it should return the correct score', () => {
      expect(calculateScore(matches[0])).toEqual(8)
      expect(calculateScore(matches[1])).toEqual(1)
      expect(calculateScore(matches[2])).toEqual(6)
    })
  })
  describe('When calculating your own move', () => {
    test('Then you should choose the correct move', () => {
      expect(calculateMove(matches[0])).toEqual(1)
      expect(calculateMove(matches[1])).toEqual(1)
      expect(calculateMove(matches[2])).toEqual(1)
      expect(calculateMove(matches[3])).toEqual(2)
      expect(calculateMove(matches[4])).toEqual(3)
      expect(calculateMove(matches[5])).toEqual(2)
      expect(calculateMove(matches[6])).toEqual(3)
      expect(calculateMove(matches[7])).toEqual(2)
      expect(calculateMove(matches[8])).toEqual(3)
    })
  })
})
