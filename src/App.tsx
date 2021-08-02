import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Field from 'components/Field'
import Smile from 'components/Smile'
import { AppDispatch } from 'index'
import { createGame, setGameState } from 'store/game.actions'

const App: React.VFC = () => {
  const dispatch = useDispatch() as AppDispatch
  useEffect(() => {
    dispatch(createGame())
    dispatch(setGameState('running'))
  }, [dispatch])

  return (
    <>
      <div id="console">
        <div id="menu">
          <Smile />
        </div>
        <Field />
      </div>
    </>
  )
}

export default App
