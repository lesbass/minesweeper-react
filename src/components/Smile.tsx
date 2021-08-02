import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from 'index'
import { createGame } from 'store/game.actions'
import { getGameStateSelector } from 'store/game.selectors'

const Smile: React.VFC = () => {
  const dispatch = useDispatch() as AppDispatch

  const gameState = useSelector(getGameStateSelector)

  const [className, setClassName] = useState('')
  console.log(gameState, className)
  useEffect(() => {
    switch (gameState) {
      case 'suspended':
        setClassName('smile_o')
        break
      case 'ended':
        setClassName('smile_x')
        break
      default:
        setClassName('')
        break
    }
    console.log('useEffect')
  }, [gameState])

  return (
    <div
      className={className}
      id={'smile'}
      onClick={() => dispatch(createGame())}
      onMouseDown={() => setClassName('smileDown')}
      onMouseOut={() => setClassName('')}
      onMouseUp={() => setClassName('')}
    />
  )
}

export default Smile
