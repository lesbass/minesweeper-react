import { createAsyncThunk } from '@reduxjs/toolkit'

import { store } from 'index'
import { GameState, SpotData } from 'lib/models'
import { clearNearbySpots, createNewGame, markSpotClicked, toggleSpotFlag } from 'lib/utils'

import { setGameStateSuccess, setSpotMapSuccess, setStartGameSuccess } from './game.store'

const gameStore = () => store.getState().game

export const createGame = createAsyncThunk('game/createGame', async (payload, { dispatch }) => {
  const rows = 16
  const columns = 30
  const mines = 90
  const game = createNewGame(columns, rows, mines)

  dispatch(setStartGameSuccess(game))
})

export const setGameState = createAsyncThunk<GameState, Partial<GameState>>(
  'game/setState',
  async (payload, { dispatch }) => {
    dispatch(setGameStateSuccess(payload))

    return payload
  }
)

export const startSuspend = createAsyncThunk<boolean, SpotData>('game/startSuspend', async (payload, { dispatch }) => {
  const gameState = gameStore().gameState
  if (payload.state === 'hidden' && gameState === 'running') {
    dispatch(setGameStateSuccess('suspended'))
    return true
  }
  return false
})

export const endSuspend = createAsyncThunk<boolean, SpotData>('game/endSuspend', async (payload, { dispatch }) => {
  const gameState = gameStore().gameState
  if (payload.state === 'hidden' && gameState === 'suspended') {
    dispatch(setGameStateSuccess('running'))
    return true
  }
  return false
})

export const toggleFlag = createAsyncThunk<void, SpotData>('game/toggleFlag', async (payload, { dispatch }) => {
  const gameState = gameStore().gameState
  if ((payload.state === 'hidden' || payload.state === 'flagged') && gameState !== 'ended') {
    const spotMap = toggleSpotFlag(payload, gameStore().spotMap)
    dispatch(setSpotMapSuccess(spotMap))
  }
})

export const clearNextSpots = createAsyncThunk<void, SpotData>('game/clearNextSpots', async (payload, { dispatch }) => {
  const gameState = gameStore().gameState
  if (gameState === 'running' && payload.nextBombCount === 0) {
    const spotMap = clearNearbySpots(payload, [...gameStore().spotMap])
    dispatch(setSpotMapSuccess(spotMap))
  }
})

export const clickSpot = createAsyncThunk<void, SpotData>('game/clickSpot', async (payload, { dispatch }) => {
  const gameState = gameStore().gameState
  if (payload.state === 'hidden' && gameState === 'running') {
    const spotMap = markSpotClicked(payload, gameStore().spotMap)
    dispatch(setSpotMapSuccess(spotMap))

    if (payload.hasBomb) {
      dispatch(setGameStateSuccess('ended'))
    } else {
      dispatch(clearNextSpots(payload))
    }
  }
})
