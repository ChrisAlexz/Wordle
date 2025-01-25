import React from 'react'
import Row from './Row'

export default function Grid({currentGuess, guesses, turn}) { //props
  return (
    <div>
        {guesses.map((g,i)=> { 
          if(turn === i) {// second thing they see after they start typing
            return <Row key={i} currentGuess={currentGuess}/>

          }
            // iterates through guesses array(5) and prints them // first thing they see
            return <Row key={i} guess={g}/>
        })}
    </div>
  )
}
