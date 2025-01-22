import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'

export default function Wordle({solution}) {

    const {currentGuess, handleKeyup } = useWordle(solution)

    // at every instance a key is pressed, the handleKeyUp is runin
    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        return () => window.removeEventListener('keyup', handleKeyup) //cleanup function
    },[handleKeyup])
  return (
    <div>Current guess - {currentGuess}</div>
  )
}
