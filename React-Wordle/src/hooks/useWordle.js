import {useState} from 'react'


const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // creates array and spreads empty elements into array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({}) // {a: 'green}
    // format a guess into an array of letter objects
    // e.g. [{key: 'a', color: 'yellow'}]
    // once word submitted

    const formatGuess = () => {
        let solutionArray = [...solution] // turn string into individual letters
        let formattedGuess = [...currentGuess].map((l) => {
            // letter we are iterating through map
            return {key: l, color: 'grey'}
        })

        // find any green letters (iterates through objects)
        formattedGuess.forEach((l,i) => {
            if(solutionArray[i] === l.key)
            {
                formattedGuess[i].color='green'
                solutionArray[i] = null // cant use letter again
            }
        })
        // find any yellow colors
        formattedGuess.forEach((l,i) => {
            if(solutionArray.includes(l.key)&& l.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf[l.key]] = null
            }
        })
        return formattedGuess
    }
    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    // from line 85
    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => { // the array of all guesses on screen
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        setHistory((prevHistory)=> { // adds new guess to guess history
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => { // turn state + 1
            return prevTurn + 1
        })
        setUsedKeys((prevUsedKeys)=> { //review
            let newKeys = {...prevUsedKeys}
            formattedGuess.forEach((l)=> {
            const currentColor = newKeys[l.key]
            if(l.color === 'green'){
                newKeys[l.key] = 'green' //a b or whatever
                return
            }
            if(l.color === 'yellow' && currentColor !== 'green') {
                newKeys[l.key] = 'yellow'
                return 
            }
            if (l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
                newKeys[l.key] = 'grey'
                return
            }

            })
            return newKeys
        })
        setCurrentGuess('')
    }

    //handle keyup event & track current guess
    // if user presses enter, add new guess

    // every time a user types
    const handleKeyup = ({key}) => { // key is destructured from keyup eventListener
        // only if a user types a letter key and nothin else
        if (key === 'Enter'){
            // only add guess if turn is less than 5
            if (turn > 5)
            {
                console.log("You used all your guesses")
                return 
            }
            // do not allow duplicate words // if hist includes the current guess // true or false
            if (history.includes(currentGuess)) {
                console.log("You already tried that word")
                return
            }
            // check word is 5 char long
            if(currentGuess.length !== 5) {
                console.log("Word must be 5 characters long!")
                return
            }
            // only call this function if all other conditions are bypassed
            const formatted = formatGuess()
            addNewGuess(formatted)
        }
        if(key === "Backspace") {
            setCurrentGuess((prev) => {
                return prev.slice(0,-1) // basically if backspace clicked it will remove a char
            })
            return
        }
        if (/^[A-Za-z]$/.test(key)) { // checks whether the key is a single alphabetic character
            if(currentGuess.length < 5) {
                setCurrentGuess((prev) => { //  previous state value 
                    return prev+key // hell+o = hello 
                })
            }
        }
    }
    // things to be called outside of hook
    return {turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup}
}

export default useWordle