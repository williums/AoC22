import { parseFile } from './index'

const mockInput = `
1000
2000

3000

1000
5000

`

describe('AoC day 1 test suite', () => {
  describe('Given an input file separated by blank lines', () => {
    describe('When parsing the input file', () => {
      const elves = parseFile(mockInput)
      test('Then the result array elements should equal the number of blank lines + 1', () => {
        expect(elves).toHaveLength(3)
      })
      test('Then the result array should only have numerical elements', () => {
        const nonNumbers = elves.some(elf =>
          elf.some(food => Number.isNaN(food)),
        )
        expect(nonNumbers).toBeFalsy()
      })
    })
  })
})
