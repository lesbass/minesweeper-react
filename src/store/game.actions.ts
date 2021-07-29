import { createAsyncThunk } from '@reduxjs/toolkit'
import { createNewGame, GameState } from '../lib/utils'
import { setGameStateSuccess, setSpotMapSuccess } from './game.store'

export const createGame = createAsyncThunk('game/createGame', async (payload, { dispatch }) => {
  const rows = 16
  const columns = 30
  const mines = 90
  const game = createNewGame(columns, rows, mines)

  dispatch(setSpotMapSuccess(game))
})

export const setGameState = createAsyncThunk<GameState, Partial<GameState>>(
  'game/setState',
  async (payload, { dispatch }) => {
    dispatch(setGameStateSuccess(payload))

    return payload
  }
)
