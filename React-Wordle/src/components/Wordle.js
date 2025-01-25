import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'
export default function Wordle({solution}) {

    const {currentGuess, handleKeyup, guesses, isCorrect, turn, usedKeys } = useWordle(solution) // props
  const [showModal, setShowModal] = useState(false)
    // at every instance a key is pressed, the handleKeyUp is runin
    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)
      if(isCorrect) {
        setTimeout(() => setShowModal(true), 2000)
        window.removeEventListener('keyup', handleKeyup)
      }
      if(turn > 5) {
        setTimeout(() => setShowModal(true), 2000)
        window.removeEventListener('keyup', handleKeyup)
      }
        return () => window.removeEventListener('keyup', handleKeyup) //cleanup function
    },[handleKeyup, isCorrect])


  return (
    <div>
      <div>solution - {solution}</div>
      <div>Current guess - {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn}/>
      <Keypad usedKeys={usedKeys}/>
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </div>
    // usedKeys = prop
  )
}
