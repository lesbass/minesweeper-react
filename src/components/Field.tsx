import React, { useMemo } from 'react'
import Spot from './Spot'
import { useSelector } from 'react-redux'
import { getSpotMapSelector } from 'store/game.selectors'

const Field: React.VFC = () => {
  const spotMap = useSelector(getSpotMapSelector)

  return useMemo(
    () =>
      !spotMap.length ? (
        <div style={{ padding: '100px', textAlign: 'center' }}>{'Avvio in corso...'}</div>
      ) : (
        <table id="mines" cellSpacing="0" cellPadding="0">
          <tbody>
            {spotMap.map((row, i) => (
              <tr key={i}>
                {row.map((spot, j) => {
                  return <Spot key={`spot-${j}`} data={spot} />
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
