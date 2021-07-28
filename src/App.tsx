import React, { useCallback, useEffect, useState } from 'react'
import Field from './components/Field'
import Smile from './components/Smile'
import { createGame } from './lib/utils'
import useStatePromise from 'use-state-promise'

export type GameState = 'running' | 'suspended' | 'ended' | 'reset'

const App: React.VFC = () => {
  const [rows, setRows] = useState(16)
  const [columns, setColumns] = useState(30)
  const [mines, setMines] = useState(90)
  const [minesMap, setMinesMapPromise, setMinesMap] = useStatePromise<boolean[][]>()
  const [gameState, setGameStatePromise, setGameState] = useStatePromise<GameState>('running')

  const newGame = useCallback(() => {
    setGameStatePromise('reset')
      .then(() => {
        return setMinesMapPromise(createGame(columns, rows, mines))
      })
      .then(() => {
        setGameState('running')
      })
  }, [columns, mines, rows, setGameState, setGameStatePromise, setMinesMapPromise])

  useEffect(() => {
    setMinesMap(createGame(columns, rows, mines))
  }, [columns, mines, rows, setMinesMap])

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
