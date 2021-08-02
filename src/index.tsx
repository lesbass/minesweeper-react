import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from 'App'
import 'scss/app.scss'
import { GameStore } from 'store/game.store'

const rootReducer = combineReducers({
  game: GameStore.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk = ThunkAction<void, RootState, null, Action<string>> // nel 99% dei casi la dichiarazione di appThunk sarà sempre cosi

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: rootReducer, // se è in produzione non include i devtools
})

export type AppDispatch = typeof store.dispatch // server per fare THEN e CATCH quando si fa la dispatch vedi addProduct

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
