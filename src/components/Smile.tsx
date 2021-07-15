import React, {useEffect, useState} from 'react'
import {GameState} from "../App";

interface SmileProps {
    onClick: () => void
    gameState: GameState
}

const Smile: React.VFC<SmileProps> = ({onClick, gameState}) => {
    const [className, setClassName] = useState('')
    console.log(gameState)
    useEffect(() => {
        switch (gameState) {
            case 'suspended':
                setClassName('smmile_o')
                break
            case 'ended':
                setClassName('smile_x')
                break
            default:
                setClassName('')
                break
        }
    }, [gameState])

    return (
        <div
            id={'smile'}
            className={className}
            onMouseDown={() => setClassName('smileDown')}
            onMouseUp={() => setClassName('')}
            onMouseOut={() => setClassName('')}
            onClick={onClick}
        />
    )
}

export default Smile
