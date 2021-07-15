import React, {useEffect, useState} from 'react'
import {GameState} from "../App";

interface SpotProps {
    hasBomb: boolean
    setGameState: (gameState: GameState) => void
    gameState: GameState
}

const Spot: React.VFC<SpotProps> = ({hasBomb, setGameState, gameState}) => {
    const [className, setClassName] = useState<string[]>([])

    useEffect(() => {
        switch (gameState) {
            case 'ended':
                if (!className.filter(cn => cn === 'clicked').length && !className.filter(cn => cn === 'flag').length && hasBomb) {
                    setClassName(['flower'])
                }
                if (!!className.filter(cn => cn === 'flag').length && !hasBomb) {
                    setClassName(['flower_no'])
                }
                break
            case 'reset':
                setClassName([])
                break
        }
    }, [className, gameState, hasBomb])

    const leftSuspendStart = () => {
        if (!!className.filter(cn => cn === 'clicked' || cn === 'flag').length) return
        setGameState('suspended')
    }
    const leftSuspendEnd = () => {
        if (!!className.filter(cn => cn === 'clicked' || cn === 'flag').length) return
        setGameState('running')
    }

    const onClick = () => {
        setClassName(['clicked'])
        if (hasBomb) {
            setClassName([...className, 'flower_red'])
            setGameState('ended')
        } else {
            setClassName([...className, 'empty'])
            /*
        if (conta(x, y) == 0) {
            libera(x, y);
        } else {
            $(o).css('background-image', 'url(img/' + conta(x, y) + '.png)');
            //$(o).append(conta(x,y));
        }*/
        }
    }
    return (
        <td className={className.join(' ')}
            onMouseDown={leftSuspendStart}
            onMouseUp={leftSuspendEnd}
            onMouseOut={leftSuspendEnd}
            onClick={onClick}
        />
    )
}

export default Spot
