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
  const spotMap = minesMap.map((row, y) =>
    row.map((cell, x) => ({
      column: x,
      hasBomb: cell,
      row: y,
      state: 'hidden',
    }))
  ) as SpotMap

  return spotMap.map((row) =>
    row.map((spot) => {
      const newSpot = { ...spot }
      newSpot.nextSpots = getNearSpots(newSpot.column, newSpot.row, spotMap)
      newSpot.nextBombCount = newSpot.nextSpots.filter((spot) => spot.hasBomb).length
      return newSpot
    })
  )
}

function getNearSpots(x: number, y: number, spotMap: SpotMap): SpotData[] {
  const findByCoordinates = (x: number, y: number) => {
    if (x < 0 || x > spotMap[0].length - 1) return null
    if (y < 0 || y > spotMap.length - 1) return null
    return spotMap[y][x]
  }
  return [
    findByCoordinates(x - 1, y - 1),
    findByCoordinates(x, y - 1),
    findByCoordinates(x + 1, y - 1),
    findByCoordinates(x - 1, y),
    findByCoordinates(x + 1, y),
    findByCoordinates(x - 1, y + 1),
    findByCoordinates(x, y + 1),
    findByCoordinates(x + 1, y + 1),
  ].filter((spot) => spot != null) as SpotData[]
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

export function markSpotClicked(payload: SpotData, originalSpotMap: SpotMap) {
  const spotMap = [...originalSpotMap]
  const spot = { ...spotMap[payload.row][payload.column] }
  spot.state = 'clicked'

  const spotRow = [...spotMap[payload.row]]
  spotRow.splice(payload.column, 1, spot)
  spotMap.splice(payload.row, 1, spotRow)

  return spotMap
}

export function toggleSpotFlag(payload: SpotData, originalSpotMap: SpotMap) {
  const spotMap = [...originalSpotMap]
  const spot = { ...spotMap[payload.row][payload.column] }
  spot.state = spot.state === 'flagged' ? 'hidden' : 'flagged'
  console.log(spot.state)
  const spotRow = [...spotMap[payload.row]]
  spotRow.splice(payload.column, 1, spot)
  spotMap.splice(payload.row, 1, spotRow)

  return spotMap
}

export function clearNearbySpots(payload: SpotData, spotMap: SpotMap) {
  payload.nextSpots.forEach((spotData) => {
    const spot = spotMap[spotData.row][spotData.column]
    if (!spot.hasBomb && spot.state === 'hidden') {
      spotMap = markSpotClicked(spot, spotMap)
      if (spot.nextBombCount === 0) {
        spotMap = clearNearbySpots(spot, spotMap)
      }
    }
  })

  return spotMap
}

export type SpotMap = SpotData[][]

export interface SpotData {
  column: number
  hasBomb: boolean
  nextBombCount: number
  nextSpots: SpotData[]
  row: number
  state: SpotState
}

export type SpotState = 'hidden' | 'clicked' | 'flagged'
export type GameState = 'running' | 'suspended' | 'ended' | 'reset'
