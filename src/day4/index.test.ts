import type { AssignmentPair } from './index'
import { partialContains, fullyContains } from './index'

describe('Day 4 test suite', () => {
  describe('Given pairs of assignments', () => {
    const assignments: AssignmentPair[] = [
      { a: [2, 4], b: [6, 8] },
      { a: [2, 3], b: [4, 5] },
      { a: [5, 7], b: [7, 9] },
      { a: [2, 8], b: [3, 7] },
      { a: [6, 6], b: [4, 6] },
      { a: [2, 6], b: [4, 8] },
    ]
    describe('When evaluating each pair', () => {
      test('Then it should tell which pairs fully contain the other', () => {
        const contains = assignments.map(pair => fullyContains(pair))
        const containedPairs = contains.filter(elem => elem === true).length
        expect(contains[3]).toBeTruthy()
        expect(contains[4]).toBeTruthy()
        expect(containedPairs).toEqual(2)
      })
      test('Then it should tell which pairs partially contain the other', () => {
        const partials = assignments.map(pair => partialContains(pair))
        const partialPairs = partials.filter(elem => elem === true).length
        expect(partials[2]).toBeTruthy()
        expect(partials[3]).toBeTruthy()
        expect(partials[4]).toBeTruthy()
        expect(partials[5]).toBeTruthy()
        expect(partialPairs).toEqual(4)
      })
    })
  })
})
