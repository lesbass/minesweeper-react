import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from 'index'
import { createGame } from 'store/game.actions'
import { getGameStateSelector } from 'store/game.selectors'

const Smile: React.VFC = () => {
  const dispatch = useDispatch() as AppDispatch

  const gameState = useSelector(getGameStateSelector)

  const [className, setClassName] = useState('')

  const getClassName = () => {
    switch (gameState) {
      case 'suspended':
        return 'smile_o'
      case 'ended':
        return 'smile_x'
      default:
        return ''
    }
  }

  const smileClassName = [getClassName(), className].join(' ')

  return (
    <div
      className={smileClassName}
      id={'smile'}
      onClick={() => dispatch(createGame())}
      onMouseDown={() => setClassName('smileDown')}
      onMouseOut={() => setClassName('')}
      onMouseUp={() => setClassName('')}
    />
  )
}

export default Smile
