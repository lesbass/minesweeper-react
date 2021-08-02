import { range } from 'lodash'

export function createNewGame(columns: number, rows: number, mines: number) {
  let minesMap = range(0, rows).map(() => range(0, columns).map(() => false))

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
  return minesMap.map((row, y) =>
    row.map((cell, x) => {
      return {
        column: x,
        hasBomb: cell,
        row: y,
        state: 'hidden',
      }
    })
  ) as SpotMap
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

export type SpotMap = SpotData[][]
export interface SpotData {
  column: number
  hasBomb: boolean
  row: number
  state: SpotState
}
export type SpotState = 'hidden' | 'empty' | 'showBomb' | 'firedBomb' | 'flag'
export type GameState = 'running' | 'suspended' | 'ended' | 'reset'
