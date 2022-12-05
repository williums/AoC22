/* eslint-disable id-length */
import fs from 'node:fs/promises'

export const Plays = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
} as const
export type Round = [number, number]

export const parseFile = (input: string) => {
  return input
    .trim()
    .split('\n')
    .map(line => {
      const split = line.split(' ')
      return split.map(move => Plays[move as keyof typeof Plays]) as Round
    })
}

export const calculateScore = (moves: Round) => {
  const result = moves[1] - moves[0]
  if (result === 1 || result === -2) return 6 + moves[1]
  if (result === 0) return 3 + moves[1]
  return 0 + moves[1]
}

export const calculateMove = (round: Round) => {
  if (round[1] === 1) {
    const move = round[0] - 1
    return move > 0 ? move : 3
  }

  if (round[1] === 2) return round[0]

  const move = round[0] + 1
  return move < 4 ? move : 1
}

export const partOne = (rounds: Round[]) => {
  return rounds.reduce((acc, round) => acc + calculateScore(round), 0)
}

export const partTwo = (rounds: Round[]) => {
  return rounds.reduce((acc, round) => {
    return acc + calculateScore([round[0], calculateMove(round)])
  }, 0)
}

export const main = async () => {
  const input = await fs.readFile('./input/day2.txt', { encoding: 'utf8' })
  const rounds = parseFile(input)

  console.log(partOne(rounds))
  console.log(partTwo(rounds))
}
