import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { GameState, SpotMap } from 'lib/utils'

export const GameStore = createSlice({
  initialState: {
    gameState: 'ended' as GameState,
    spotMap: [] as SpotMap,
  },
  name: 'client',
  reducers: {
    setGameStateSuccess(state, action: PayloadAction<GameState>) {
      state.gameState = action.payload
    },
    setSpotMapSuccess(state, action: PayloadAction<SpotMap>) {
      state.spotMap = action.payload
    },
  },
})

export const { setGameStateSuccess, setSpotMapSuccess } = GameStore.actions
