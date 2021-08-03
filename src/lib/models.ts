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
