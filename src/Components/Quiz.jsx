import {useState,useRef} from 'react'
import {data} from "../assets/data.js"

const Quiz = () => {

  let [index, setIndex] = useState(0)
  const [question, setquestion] = useState(data[index])
  const [lock, setLock] = useState(false)
  const [score, setScore] = useState(0);

  let Option1 = useRef(null)
  let Option2 = useRef(null)
  let Option3 = useRef(null)
  let Option4 = useRef(null)

  const option_array = [Option1,Option2,Option3,Option4]

  const checkAns = (e,ans) =>{
    if(!lock){
      if(question.ans === ans){
        e.target.classList.add("correct")
        setScore(prev=>prev+1)
        setLock(true)
      }else{
        e.target.classList.add("wrong")
        setLock(true)
        option_array[question.ans-1].current.classList.add("correct")
      }
    }
  }
  const handleNext = ()=>{
    if(lock && index < data.length){
      setIndex(++index)
      setquestion(data[index])
      setLock(false)
      option_array.map((item)=>{
        item.current.classList.remove("wrong")
        item.current.classList.remove("correct")
        return null
      })
    }
  }
  const reset = ()=>{
    setIndex(0)
    setquestion(data[0])
    setScore(0)
    setLock(false)
  }

  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr/>
        {index < data.length ?<>
        <h2>{index+1}. {question.question}</h2>
        <ul>
            <li ref={Option1} onClick={(e)=> checkAns(e,1)}>{question.option1}</li>
            <li ref={Option2} onClick={(e)=> checkAns(e,2)}>{question.option2}</li>
            <li ref={Option3} onClick={(e)=> checkAns(e,3)}>{question.option3}</li>
            <li ref={Option4} onClick={(e)=> checkAns(e,4)}>{question.option4}</li>
        </ul>
        <button onClick={handleNext}>Next</button>
        <div className='index'>{index+1} of {data.length} questions</div>
        </>:<>
          <p>Your current Score is {score} out of {data.length}</p>
          <button onClick={reset}>Reset</button>
        </>
        }
    </div>
  )
}

export default Quiz