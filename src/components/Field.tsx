import React, { useMemo } from 'react'
import { range } from 'lodash'
import Spot from './Spot'
import { GameState } from '../App'
import { countMines } from '../lib/utils'

interface FieldProps {
  rows: number
  columns: number
  minesMap: boolean[][] | undefined
  setGameState: (gameState: GameState) => void
  gameState: GameState
}

const Field: React.VFC<FieldProps> = ({ rows, columns, minesMap, setGameState, gameState }) => {
  const cleanGameState = (gs: GameState) => {
    return gs === 'suspended' ? 'running' : gs
  }

  return useMemo(
    () =>
      !minesMap ? (
        <div style={{ height: '100px' }}> </div>
      ) : (
        <table id="mines" cellSpacing="0" cellPadding="0">
          <tbody>
            {range(0, rows).map((row, i) => (
              <tr key={i}>
                {range(0, columns).map((col, j) => {
                  const hasBomb = minesMap ? minesMap[row][col] : false
                  const minesCount = !hasBomb && minesMap ? countMines(minesMap, col, row, columns, rows) : 0
                  return (
                    <Spot
                      key={`spot-${j}`}
                      hasBomb={hasBomb}
                      setGameState={setGameState}
                      gameState={cleanGameState(gameState)}
                      minesCount={minesCount}
                    />
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ),
    [gameState, minesMap]
  )
}

export default Field
