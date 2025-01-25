import React, { useEffect, useState } from 'react'

export default function Keypad({usedKeys}) { //prop
    const [letters, setLetters] = useState(null) // we then do letters && because it is initially null

    useEffect(() => {
        fetch('http://localhost:3001/letters')
        .then(res => res.json())
        .then(json => {
            setLetters(json) // array of alphabet
        })
    },[])
  return (
    <div className="keypad">
        
        {letters && letters.map((l)=> {
            const color = usedKeys[l.key]
            return (
                <div key={l.key} className={color}>{l.key}</div>
            )
        })}
    </div>
  )
}
