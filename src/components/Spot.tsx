import React, {useEffect, useState} from 'react'
import {GameState} from "../App";

interface SpotProps {
    hasBomb: boolean
    setGameState: (gameState: GameState) => void
    gameState: GameState
    minesCount: number
}

const Spot: React.VFC<SpotProps> = ({hasBomb, setGameState, gameState, minesCount}) => {
    console.log('render')
    const [className, setClassName] = useState<string[]>([])
    const [isValid, setIsValid] = useState(true)

    useEffect(() => {
        switch (gameState) {
            case 'ended':
                if (!isValid) return
                if (!className.filter(cn => cn === 'clicked').length && !className.filter(cn => cn === 'flag').length && hasBomb) {
                    setClassName(['flower'])
                    setIsValid(false)
                }
                if (!!className.filter(cn => cn === 'flag').length && !hasBomb) {
                    setClassName(['flower_no'])
                    setIsValid(false)
                }
                break
            case 'reset':
                setClassName([])
                setIsValid(true)
                break
        }
    }, [gameState])

    const leftSuspendStart = () => {
        if (gameState === 'ended' || !isValid) return
        if (!!className.filter(cn => cn === 'clicked' || cn === 'flag').length) return
        setGameState('suspended')
        setClassName(['empty'])
    }

    const leftSuspendEnd = () => {
        if (gameState === 'ended' || !isValid) return
        if (!!className.filter(cn => cn === 'clicked' || cn === 'flag').length) return
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
            setClassName([
                ...className,
                ...newClasses
            ])
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
