import fs from 'node:fs/promises'

export const parseFile = (input: string) => {
  return input
    .trim()
    .split('\n\n')
    .map(line =>
      line.split('\n').map(elem => {
        return Number.parseInt(elem, 10)
      }),
    )
}

const partOne = (elves: number[][]) => {
  return elves.reduce((acc, elf) => {
    return Math.max(
      elf.reduce((acc, cals) => acc + cals, 0),
      acc,
    )
  }, 0)
}

const partTwo = (elves: number[][]) => {
  return elves
    .reduce((acc: number[], elf) => {
      const sum = elf.reduce((acc, cals) => acc + cals, 0)
      if (acc.length < 3) return [...acc, sum].sort((a, b) => a - b)
      if (acc[0] < sum) return [sum, acc[1], acc[2]].sort((a, b) => a - b)
      return acc
    }, [])
    .reduce((acc, current) => acc + current)
}

export const main = async () => {
  const input = await fs.readFile('./input/day1.txt', { encoding: 'utf8' })
  const elves = parseFile(input)

  console.log(partOne(elves))
  console.log(partTwo(elves))
}
