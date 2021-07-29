import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGameStateSelector } from '../store/game.selectors'
import { AppDispatch } from '../index'
import { createGame } from '../store/game.actions'

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
      id={'smile'}
      className={className}
      onMouseDown={() => setClassName('smileDown')}
      onMouseUp={() => setClassName('')}
      onMouseOut={() => setClassName('')}
      onClick={() => dispatch(createGame())}
    />
  )
}

export default Smile
