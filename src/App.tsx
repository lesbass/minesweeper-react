import { range } from 'lodash'
import React, { useEffect, useState } from 'react'
import Field from './components/Field'
import Smile from './components/Smile'

function createGame(columns: number, rows: number, mines: number) {
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

export type GameState = 'running' | 'suspended' | 'ended' | 'reset'

const App: React.VFC = () => {
  const [rows, setRows] = useState(16)
  const [columns, setColumns] = useState(30)
  const [mines, setMines] = useState(90)
  const [minesMap, setMinesMap] = useState<boolean[][]>()
  const [gameState, setGameState] = useState<GameState>('running')

  const newGame = () => {
    setGameState('reset')
    setMinesMap(createGame(columns, rows, mines))
    setGameState('running')
  }

  useEffect(() => {
    setMinesMap(createGame(columns, rows, mines))
  }, [columns, mines, rows])

  return (
    <>
      <div id="console">
        <div id="menu">
          <Smile onClick={newGame} gameState={gameState} />
        </div>
        <Field rows={rows} columns={columns} minesMap={minesMap} setGameState={setGameState} gameState={gameState} />
      </div>
    </>
  )
}

export default App
