import { range } from 'lodash'

export function createGame(columns: number, rows: number, mines: number) {
  let minesMap = range(0, rows).map((row) => range(0, columns).map((col) => false))

  for (let i = 0; i < mines; i++) {
    const x = Math.round(Math.random() * (columns - 1))
    const y = Math.round(Math.random() * (rows - 1))

    // console.log(`x: ${x}, y: ${y}, rows: ${rows}, columns: ${columns}`)

    if (!minesMap[y][x]) {
      minesMap[y][x] = true
    } else {
      i--
    }
  }
  return minesMap
}

export function countMines(minesMap: boolean[][], x: number, y: number, columns: number, rows: number) {
  if (!minesMap) return 0
  let n = 0
  if (y > 0) {
    if (x > 0) {
      n += minesMap[y - 1][x - 1] ? 1 : 0
    }
    n += minesMap[y - 1][x] ? 1 : 0
    if (x < columns - 1) {
      n += minesMap[y - 1][x + 1] ? 1 : 0
    }
  }
  if (x > 0) {
    n += minesMap[y][x - 1] ? 1 : 0
  }
  if (x < columns - 1) {
    n += minesMap[y][x + 1] ? 1 : 0
  }
  if (y < rows - 1) {
    if (x > 0) {
      n += minesMap[y + 1][x - 1] ? 1 : 0
    }
    n += minesMap[y + 1][x] ? 1 : 0
    if (x < columns - 1) {
      n += minesMap[y + 1][x + 1] ? 1 : 0
    }
  }
  return n
}
