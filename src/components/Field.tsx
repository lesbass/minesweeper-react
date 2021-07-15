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
    if (!minesMap) return <div>Preparazione in corso...</div>
    return (
        <table id="mines" cellSpacing="0" cellPadding="0">
            <tbody>
            {range(0, rows).map((row, i) => (
                <tr key={i}>
                    {range(0, columns).map((col, j) => (
                        <Spot key={j} hasBomb={minesMap ? minesMap[row][col] : false}
                              setGameState={setGameState} gameState={gameState}/>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Field
