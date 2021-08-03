import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { getSpotMapSelector } from 'store/game.selectors'

import Spot from './Spot'

const Field: React.VFC = () => {
  const spotMap = useSelector(getSpotMapSelector)

  return useMemo(
    () =>
      !spotMap.length ? (
        <div style={{ padding: '100px', textAlign: 'center' }}>Avvio in corso... </div>
      ) : (
        <table cellPadding="0" cellSpacing="0" id="mines">
          <tbody>
            {spotMap.map((row, i) => (
              <tr key={i}>
                {row.map((spot, j) => {
                  return <Spot key={`spot-${j}`} {...spot} />
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ),
    [spotMap]
  )
}

export default Field
