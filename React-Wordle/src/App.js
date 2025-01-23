import { useEffect,useState } from "react";
import Wordle from './components/Wordle'

function App() {
  const [solution,setSolution] = useState(null)
  // fire a function when component first renders, the [] is so that it only fires once
  useEffect(()=> {
    fetch('http://localhost:3001/solutions')
    .then(res => res.json()) // turns response from JSON file to JS(parsed)
    //json represents the parsed data now from json to js
    .then(json => {
      //random int between 0-14
      const randomSolution = json[Math.floor(Math.random()*json.length)]
      setSolution(randomSolution.word)
    })
  },[setSolution])
  //^ is dependency array ([setSolution]), meaning it will run anytime setSolution changes
  return (
    <div className="App">
      <h1>Wordle (Christians)</h1>
      {solution && <div> <Wordle solution={solution}/></div>}
    </div>
  );
}

export default App
