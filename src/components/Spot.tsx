import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch } from 'index'
import { SpotData } from 'lib/utils'
import { setGameState } from 'store/game.actions'
import { getGameStateSelector } from 'store/game.selectors'

const Spot: React.VFC<SpotData> = (data) => {
  const dispatch = useDispatch() as AppDispatch

  const gameState = useSelector(getGameStateSelector)
  const [className, setClassName] = useState<string[]>([])
  //const isRunning = gameState === 'running' || gameState === 'suspended'

  /*useEffect(() => {
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
  }, [className, hasBomb, isRunning, isValid])*/

  const { leftSuspendEnd, leftSuspendStart } = useCallback(
    () =>
      gameState !== 'ended'
        ? {
            leftSuspendEnd: (onlyIfSuspended: boolean) => {
              if (onlyIfSuspended && gameState !== 'suspended') return
              if (!!className.filter((cn) => cn === 'clicked' || cn === 'flag').length) return
              dispatch(setGameState('running'))
              setClassName([])
            },
            leftSuspendStart: () => {
              if (!!className.filter((cn) => cn === 'clicked' || cn === 'flag').length) return
              dispatch(setGameState('suspended'))
              setClassName(['empty'])
            },
            onClick: () => {
              if (gameState !== 'running') dispatch(setGameState('running'))
              setClassName(['clicked'])
            },
            /*if (hasBomb) {
            setIsValid(false)
            setClassName([...className, 'flower_red'])
            setGameState('ended')
          } else {
            setIsValid(false)
            const newClasses = ['empty']
            minesCount > 0 && newClasses.push(`count_${minesCount}`)
            setClassName([...className, ...newClasses])
          }*/
          }
        : {
            leftSuspendEnd: () => {},
            leftSuspendStart: () => {},
            onClick: () => {},
          },
    [className, dispatch, gameState]
  )()

  return useMemo(() => {
    console.log('render')
    return (
      <td
        className={className.join(' ')}
        onMouseDown={leftSuspendStart}
        onMouseOut={() => leftSuspendEnd(true)}
        onMouseUp={() => leftSuspendEnd(false)}
        //onClick={onClick}
      />
    )
  }, [className, leftSuspendStart, leftSuspendEnd])
}

export default Spot
