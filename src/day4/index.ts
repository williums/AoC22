import { readFile } from 'node:fs/promises'

export interface AssignmentPair {
  a: [number, number]
  b: [number, number]
}

export const parseFile = (input: string): AssignmentPair[] => {
  return input
    .trim()
    .split('\n')
    .map(pair => {
      const [a, b] = pair.split(',').map(elem => elem.split('-'))
      return {
        a: [Number.parseInt(a[0], 10), Number.parseInt(a[1], 10)],
        b: [Number.parseInt(b[0], 10), Number.parseInt(b[1], 10)],
      } as AssignmentPair
    })
}

export const fullyContains = (pair: AssignmentPair) => {
  return (
    (pair.a[0] <= pair.b[0] && pair.b[1] <= pair.a[1]) ||
    (pair.b[0] <= pair.a[0] && pair.a[1] <= pair.b[1])
  )
}

export const partialContains = (pair: AssignmentPair) => {
  return pair.a[1] >= pair.b[0] && pair.a[0] <= pair.b[1]
}

const partOne = (pairs: AssignmentPair[]) => {
  return pairs.filter(pair => fullyContains(pair)).length
}

const partTwo = (pairs: AssignmentPair[]) => {
  return pairs.filter(pair => partialContains(pair)).length
}

export const main = async () => {
  const input = await readFile(`./input/day${new Date().getDate()}.txt`, {
    encoding: 'utf8',
  })
  const assignments = parseFile(input)

  console.log(`Part One Answer: ${partOne(assignments)}`)
  console.log(`Part Two Answer: ${partTwo(assignments)}`)
}
