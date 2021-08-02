import { RootState } from 'index'

export const getSpotMapSelector = (state: RootState) => {
  return state.game.spotMap
}

export const getGameStateSelector = (state: RootState) => {
  return state.game.gameState
}
