import { calculateScore, countVisibleTrees, isVisible } from './index'

const mockTreeMap = `30373
25512
65332
33549
35390`
  .split('\n')
  .map(row => row.split('').map(item => Number.parseInt(item, 10)))

describe('Day 4 test suite', () => {
  describe('Given the position of a tree', () => {
    describe('When determining if an inner tree is visible or not', () => {
      test('Then it should consider the height of trees in the same row and column', () => {
        expect(isVisible(mockTreeMap, 1, 1)).toBeTruthy()
        expect(isVisible(mockTreeMap, 1, 2)).toBeTruthy()
        expect(isVisible(mockTreeMap, 1, 3)).toBeFalsy()
        expect(isVisible(mockTreeMap, 2, 1)).toBeTruthy()
        expect(isVisible(mockTreeMap, 2, 2)).toBeFalsy()
        expect(isVisible(mockTreeMap, 2, 3)).toBeTruthy()
        expect(isVisible(mockTreeMap, 3, 1)).toBeFalsy()
        expect(isVisible(mockTreeMap, 3, 2)).toBeTruthy()
        expect(isVisible(mockTreeMap, 3, 3)).toBeFalsy()
      })
    })
    describe('When determining the visibility of an outside tree', () => {
      test('Then it should always be visible', () => {
        expect(isVisible(mockTreeMap, 0, 0)).toBeTruthy()
        expect(isVisible(mockTreeMap, 0, 2)).toBeTruthy()
        expect(isVisible(mockTreeMap, 1, 4)).toBeTruthy()
        expect(isVisible(mockTreeMap, 4, 3)).toBeTruthy()
      })
    })
    describe('When determining the tree score', () => {
      test('Then it should return the correct score', () => {
        expect(calculateScore(mockTreeMap, 1, 2)).toEqual(4)
        expect(calculateScore(mockTreeMap, 3, 2)).toEqual(8)
      })
    })
  })
  describe('Given a map of trees', () => {
    describe('When counting visible trees', () => {
      test('Then it should be at least the count of perimeter trees', () => {
        expect(countVisibleTrees(mockTreeMap)).toBeGreaterThanOrEqual(
          (mockTreeMap.length - 1) * (mockTreeMap[0].length - 1),
        )
      })
      test('Then it should return the correct count of all visible trees', () => {
        expect(countVisibleTrees(mockTreeMap)).toEqual(21)
      })
    })
  })
})
