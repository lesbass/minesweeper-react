import React from 'react'
import {range} from 'lodash'
import Spot from './Spot'
import {GameState} from "../App";

interface FieldProps {
    rows: number
    columns: number
    minesMap: boolean[][] | undefined
    setGameState: (gameState: GameState) => void
    gameState: GameState
}

const Field: React.VFC<FieldProps> = ({rows, columns, minesMap, setGameState, gameState}) => {

    const countMines = (x: number, y: number, columns: number, rows: number) => {
        if (!minesMap) return 0
        let n = 0;
        if (y > 0) {
            if (x > 0) {
                n += minesMap[y - 1][x - 1] ? 1 : 0;
            }
            n += minesMap[y - 1][x] ? 1 : 0;
            if (x < columns - 1) {
                n += minesMap[y - 1][x + 1] ? 1 : 0;
            }
        }
        if (x > 0) {
            n += minesMap[y][x - 1] ? 1 : 0;
        }
        if (x < columns - 1) {
            n += minesMap[y][x + 1] ? 1 : 0;
        }
        if (y < rows - 1) {
            if (x > 0) {
                n += minesMap[y + 1][x - 1] ? 1 : 0;
            }
            n += minesMap[y + 1][x] ? 1 : 0;
            if (x < columns - 1) {
                n += minesMap[y + 1][x + 1] ? 1 : 0;
            }
        }
        return n;
    }

    if (!minesMap) return <div>Preparazione in corso...</div>
    return (
        <table id="mines" cellSpacing="0" cellPadding="0">
            <tbody>
            {range(0, rows).map((row, i) => (
                <tr key={i}>
                    {range(0, columns).map((col, j) => {
                        const hasBomb = minesMap ? minesMap[row][col] : false
                        const minesCount = (!hasBomb && minesMap) ? countMines(col, row, columns, rows) : 0
                        return <Spot key={j}
                              hasBomb={minesMap ? minesMap[row][col] : false}
                              setGameState={setGameState}
                              gameState={gameState}
                                     minesCount={minesCount}
                        />
                    })}
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default React.memo(Field)
