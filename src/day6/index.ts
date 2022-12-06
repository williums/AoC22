import { readFile } from 'node:fs/promises'

export const isUnique = (str: string) => {
  return new Set(str).size === str.length
}

export const findMarker = (str: string, distinctLen: number) => {
  for (let index = 0; index < str.length; index++) {
    const slice = str.slice(index, index + distinctLen)
    if (isUnique(slice)) return index + distinctLen
  }

  return -1
}

export const main = async () => {
  const input = await readFile(`./input/day${new Date().getDate()}.txt`, {
    encoding: 'utf8',
  })

  const partOne = findMarker(input, 4)
  const partTwo = findMarker(input, 14)

  console.log(`Part One Answer: ${partOne}`)
  console.log(`Part Two Answer: ${partTwo}`)
}
