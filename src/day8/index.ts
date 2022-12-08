import { readFile } from 'node:fs/promises'

export const isVisible = (map: number[][], row: number, col: number) => {
  if (
    row === 0 ||
    row === map.length - 1 ||
    col === map[0].length - 1 ||
    col === 0
  )
    return true
  const target = map[row][col]
  const left = map[row].slice(0, col).every(tree => tree < target)
  const right = map[row].slice(col + 1).every(tree => tree < target)
  const up = map
    .slice(0, row)
    .map(row => row[col])
    .every(tree => tree < target)
  const down = map
    .slice(row + 1)
    .map(row => row[col])
    .every(tree => tree < target)
  return left || right || up || down
}

export const countVisibleTrees = (map: number[][]) => {
  let count = 0
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (isVisible(map, row, col)) count++
    }
  }

  return count
}

const calculateDistance = (target: number, view: number[]) => {
  return (
    view.findIndex(
      (tree, index) => tree >= target || index === view.length - 1,
    ) + 1
  )
}

export const calculateScore = (map: number[][], row: number, col: number) => {
  if (
    row === 0 ||
    row === map.length - 1 ||
    col === map[0].length - 1 ||
    col === 0
  )
    return 0

  const target = map[row][col]
  const left = calculateDistance(target, map[row].slice(0, col).reverse())
  const right = calculateDistance(target, map[row].slice(col + 1))
  const up = calculateDistance(
    target,
    map
      .slice(0, row)
      .map(row => row[col])
      .reverse(),
  )
  const down = calculateDistance(
    target,
    map.slice(row + 1).map(row => row[col]),
  )
  return left * right * up * down
}

const partOne = (trees: number[][]) => {
  return countVisibleTrees(trees)
}

const partTwo = (trees: number[][]) => {
  let maxScore = 0
  for (let row = 0; row < trees.length; row++) {
    for (let col = 0; col < trees[row].length; col++) {
      maxScore = Math.max(calculateScore(trees, row, col), maxScore)
    }
  }

  return maxScore
}

export const main = async () => {
  const input = await readFile(`./input/day${new Date().getDate()}.txt`, {
    encoding: 'utf8',
  })

  const trees = input
    .trim()
    .split('\n')
    .map(row => row.split('').map(item => Number.parseInt(item, 10)))

  console.log(`Part One Answer: ${partOne(trees)}`)
  console.log(`Part Two Answer: ${partTwo(trees)}`)
}
