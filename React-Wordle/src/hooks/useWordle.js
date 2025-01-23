import {useState} from 'react'


const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    // format a guess into an array of letter objects
    // e.g. [{key: 'a', color: 'yellow'}]
    // once word submitted

    const formatGuess = () => {
        console.log("formating the guess - ", currentGuess)
    }
    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = () => {

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
            formatGuess()
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
    return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle