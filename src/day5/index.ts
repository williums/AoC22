import { readFile } from 'node:fs/promises'

export type Stacks = Record<number, string[]>
export type Move = [number, number, number]

export const parseStacks = (input: string) => {
  const crates: string[] = []
  let index = 0
  while (!/\d/g.test(input.slice(index, index + 4))) {
    crates.push(input.slice(index, index + 4).replaceAll(/[\n [\]]/g, ''))
    index += 4
  }

  const stacks: Stacks = {}
  const numStacks = Number(input.slice(-3))
  const cratesPerStack = Math.floor(crates.length / numStacks)
  for (let stackNum = 0; stackNum < numStacks; stackNum++) {
    stacks[stackNum + 1] = Array.from({ length: cratesPerStack })
      .map((_el, index) => crates[index * numStacks + stackNum])
      .filter(item => item.length > 0)
  }

  return stacks
}

export const parseMoves = (input: string) => {
  return input
    .trim()
    .split('\n')
    .map(elem =>
      elem
        .split(' ')
        .map(Number)
        .filter(item => !Number.isNaN(item)),
    ) as Move[]
}

export const applyMove = (stacks: Stacks, move: Move) => {
  const [cratesToMove, target, destination] = [...move]
  stacks[destination] = [
    ...stacks[target].slice(0, cratesToMove).reverse(),
    ...stacks[destination],
  ]
  stacks[target].splice(0, cratesToMove)
}

export const applyMove2 = (stacks: Stacks, move: Move) => {
  const [cratesToMove, target, destination] = [...move]
  stacks[destination] = [
    ...stacks[target].slice(0, cratesToMove),
    ...stacks[destination],
  ]
  stacks[target].splice(0, cratesToMove)
}

const partOne = (stacks: Stacks, moves: Move[]) => {
  for (const move of moves) {
    applyMove(stacks, move)
  }

  return Object.values(stacks)
    .map(crates => crates[0])
    .join('')
}

const partTwo = (stacks: Stacks, moves: Move[]) => {
  for (const move of moves) {
    applyMove2(stacks, move)
  }

  return Object.values(stacks)
    .map(crates => crates[0])
    .join('')
}

export const main = async () => {
  const input = await readFile(`./input/day${new Date().getDate()}.txt`, {
    encoding: 'utf8',
  })
  const [a, b] = input.split('\n\n')

  const stacks = parseStacks(a)
  const stacks2 = parseStacks(a)
  const moves = parseMoves(b)

  console.log(`Part One Answer: ${partOne(stacks, moves)}`)
  console.log(`Part Two Answer: ${partTwo(stacks2, moves)}`)
}
