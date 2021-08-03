import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from 'lib/useAppDispatch'
import { SpotData } from 'lib/models'
import { clickSpot, endSuspend, startSuspend, toggleFlag } from 'store/game.actions'
import { getGameStateSelector } from 'store/game.selectors'

const Spot: React.VFC<SpotData> = (data) => {
  const dispatch = useAppDispatch()

  const gameState = useSelector(getGameStateSelector)
  const [className, setClassName] = useState<string[]>([])

  useEffect(() => {
    setClassName([])
  }, [gameState === 'ended'])

  const getClassName = () => {
    const getClassNameArray = () => {
      if (data.state === 'clicked') {
        if (data.hasBomb) {
          return [...className, 'flower_red']
        } else {
          const cn = ['empty']
          if (data.nextBombCount > 0) {
            cn.push('count_' + data.nextBombCount)
          }
          return [...className, ...cn]
        }
      } else {
        if (gameState === 'ended') {
          switch (data.state) {
            case 'flagged':
              return [data.hasBomb ? 'flag' : 'flag_no']
            default:
              return [data.hasBomb ? 'flower' : '']
          }
        }
        if (data.state === 'flagged') {
          return ['flag']
        }
        return className
      }
    }
    return getClassNameArray().join(' ')
  }

  const { leftClick, leftSuspendEnd, leftSuspendStart, rightClick } = useCallback(
    () => ({
      leftClick: () => {
        dispatch(clickSpot(data))
      },
      leftSuspendEnd: () => {
        if (gameState !== 'suspended') return
        dispatch(endSuspend(data)).then((item) => item.payload && setClassName([]))
      },
      leftSuspendStart: (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
        if (e.button === 2) return
        dispatch(startSuspend(data)).then((item) => item.payload && setClassName(['empty']))
      },
      rightClick: (e: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) => {
        e.preventDefault()
        dispatch(toggleFlag(data))
      },
    }),
    [data, dispatch, gameState]
  )()

  const tdClassName = getClassName()

  return useMemo(() => {
    return (
      <td
        className={tdClassName}
        onClick={leftClick}
        onContextMenu={rightClick}
        onMouseDown={leftSuspendStart}
        onMouseOut={leftSuspendEnd}
        onMouseUp={leftSuspendEnd}
      />
    )
  }, [tdClassName, leftClick, rightClick, leftSuspendStart, leftSuspendEnd])
}

export default Spot
