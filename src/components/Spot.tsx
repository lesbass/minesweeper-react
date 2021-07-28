import React, { useEffect, useMemo, useState } from 'react'
import { GameState } from '../App'

interface SpotProps {
  hasBomb: boolean
  setGameState: (gameState: GameState) => void
  gameState: GameState
  minesCount: number
}

const Spot: React.VFC<SpotProps> = ({ hasBomb, setGameState, gameState, minesCount }) => {
  const [className, setClassName] = useState<string[]>([])
  const [isValid, setIsValid] = useState(true)
  const isRunning = gameState === 'running' || gameState === 'suspended'

  useEffect(() => {
    switch (gameState) {
      case 'ended':
        if (!isValid) return
        if (
          !className.filter((cn) => cn === 'clicked').length &&
          !className.filter((cn) => cn === 'flag').length &&
          hasBomb
        ) {
          setClassName(['flower'])
          setIsValid(false)
        }
        if (!!className.filter((cn) => cn === 'flag').length && !hasBomb) {
          setClassName(['flower_no'])
          setIsValid(false)
        }
        break
      case 'reset':
        setClassName([])
        setIsValid(true)
        break
    }
  }, [className, hasBomb, isRunning, isValid])

  const leftSuspendStart = () => {
    if (gameState === 'ended' || !isValid) return
    if (!!className.filter((cn) => cn === 'clicked' || cn === 'flag').length) return
    setGameState('suspended')
    setClassName(['empty'])
  }

  const leftSuspendEnd = () => {
    if (gameState === 'ended' || !isValid) return
    if (!!className.filter((cn) => cn === 'clicked' || cn === 'flag').length) return
    setGameState('running')
    setClassName([])
  }

  const onClick = () => {
    if (gameState === 'ended' || !isValid) return
    if (gameState !== 'running') setGameState('running')
    setClassName(['clicked'])
    if (hasBomb) {
      setIsValid(false)
      setClassName([...className, 'flower_red'])
      setGameState('ended')
    } else {
      setIsValid(false)
      const newClasses = ['empty']
      minesCount > 0 && newClasses.push(`count_${minesCount}`)
      setClassName([...className, ...newClasses])
    }
  }
  return useMemo(() => {
    console.log('render')
    return (
      <td
        className={className.join(' ')}
        onMouseDown={leftSuspendStart}
        onMouseUp={leftSuspendEnd}
        onMouseOut={leftSuspendEnd}
        onClick={onClick}
      />
    )
  }, [className])
}

export default Spot
