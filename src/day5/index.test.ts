import { parseStacks, parseMoves, applyMove, applyMove2 } from './index'

const mockStacks = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 
`

const mockMoves = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`

describe('Day 5 test suite', () => {
  describe('Given a string representing the stacks of crates', () => {
    describe('When arranging a crate into its stack structure', () => {
      const stacks = parseStacks(mockStacks)
      test('Then it should end up in the correct stack number', () => {
        expect(stacks[1]).toEqual(['N', 'Z'])
        expect(stacks[2]).toEqual(['D', 'C', 'M'])
        expect(stacks[3]).toEqual(['P'])
      })
    })
  })
  describe('Given a string representing the rearrangement procedure', () => {
    const moves = parseMoves(mockMoves)
    describe('When parsing the moves', () => {
      test('Then it parse the move directions correctly', () => {
        expect(moves.some(item => item.length !== 3))
        expect(moves[0]).toEqual([1, 2, 1])
        expect(moves[1]).toEqual([3, 1, 3])
        expect(moves[2]).toEqual([2, 2, 1])
        expect(moves[3]).toEqual([1, 1, 2])
      })
    })
    describe('When applying a move', () => {
      const stacks = parseStacks(mockStacks)
      test('Then it should move a crate to the correct stack number', () => {
        applyMove(stacks, moves[0])
        expect(stacks[1]).toEqual(['D', 'N', 'Z'])
        expect(stacks[2]).toEqual(['C', 'M'])
        expect(stacks[3]).toEqual(['P'])

        applyMove(stacks, moves[1])
        expect(stacks[1]).toEqual([])
        expect(stacks[2]).toEqual(['C', 'M'])
        expect(stacks[3]).toEqual(['Z', 'N', 'D', 'P'])
      })
    })
    describe('When applying a move for part two', () => {
      const stacks = parseStacks(mockStacks)
      test('Then it should move a crate to the correct stack number', () => {
        applyMove2(stacks, moves[0])
        applyMove2(stacks, moves[1])
        expect(stacks[1]).toEqual([])
        expect(stacks[2]).toEqual(['C', 'M'])
        expect(stacks[3]).toEqual(['D', 'N', 'Z', 'P'])

        applyMove2(stacks, moves[2])
        expect(stacks[1]).toEqual(['C', 'M'])
        expect(stacks[2]).toEqual([])
        expect(stacks[3]).toEqual(['D', 'N', 'Z', 'P'])

        applyMove2(stacks, moves[3])
        expect(stacks[1]).toEqual(['M'])
        expect(stacks[2]).toEqual(['C'])
        expect(stacks[3]).toEqual(['D', 'N', 'Z', 'P'])
      })
    })
  })
})
