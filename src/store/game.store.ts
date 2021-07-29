import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameState, SpotMap } from '../lib/utils'

export const GameStore = createSlice({
  name: 'client',
  initialState: {
    spotMap: [] as SpotMap,
    gameState: 'ended' as GameState,
  },
  reducers: {
    setSpotMapSuccess(state, action: PayloadAction<SpotMap>) {
      state.spotMap = action.payload
    },
    setGameStateSuccess(state, action: PayloadAction<GameState>) {
      state.gameState = action.payload
    },
  },
})

export const { setSpotMapSuccess, setGameStateSuccess } = GameStore.actions
