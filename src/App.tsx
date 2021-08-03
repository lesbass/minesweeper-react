import React, { useEffect } from 'react'

import Field from 'components/Field'
import Smile from 'components/Smile'
import { useAppDispatch } from 'lib/useAppDispatch'
import { createGame } from 'store/game.actions'

const App: React.VFC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(createGame())
  }, [])

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
