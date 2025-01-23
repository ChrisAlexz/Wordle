import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'

export default function Wordle({solution}) {

    const {currentGuess, handleKeyup, guesses, isCorrect, turn } = useWordle(solution)

    // at every instance a key is pressed, the handleKeyUp is runin
    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        return () => window.removeEventListener('keyup', handleKeyup) //cleanup function
    },[handleKeyup])

    useEffect(() => {
      console.log(guesses,turn,isCorrect)
    },[guesses,turn,isCorrect])
  return (
    <div>
      <div>solution - {solution}</div>
      <div>Current guess - {currentGuess}</div>
    </div>
  )
}
