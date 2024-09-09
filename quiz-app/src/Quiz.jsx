import React from 'react'
import axios from 'axios'
import './quiz.css'
import { useState , useEffect } from 'react'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
let data__ =  10
const Quiz = () => {
    const [mainData, setmainData] = useState([])
    const [pointer,setPointer] = useState(0)
    const [options,setopts] = useState([])
    const [ques , setques ]  = useState('')
    const [ans,setans] = useState('')
    const [initial , setinitial ] = useState('none')
    const [num, setnum ] = useState(0)
    const [value,setvalue] = useState('value')
    const [count,setCount ] = useState(0)
    const [timer, setTimer] = useState(60) 
    const [dataMain , setdata]  = useState('')
    const [remaining, setRemain] = useState(5)
    const [beforeCLick,setbefore] = useState('notDone')
    const [colorfull,setColor]=useState('')
  let resetFunc = ()=>{
      setPointer(0)
      setopts([])
      setques('')
      setans('')
      setinitial('none')
      setnum(0)
      setvalue('value')
      setCount(0)
      setTimer(60)
      setdata("")
      setRemain(5)
  }
    let pushFunc = ()=>{
      setbefore('done')
      let increase = pointer+1
      setPointer(increase)
      if(increase<num){
          checkQues(mainData,increase)
      }
      else{
        console.log('finish')
        resetFunc()
      }
       
    }
    let finalized = (correctAns , Value)=>{
                  if(correctAns===Value){
                    toast.success('correct',{position: "top-center"})
                    setCount(count+1)
                    pushFunc()
                }
                else{
                  toast.error('wrong', {position: "top-center"})
                  if(remaining>0){
                    setRemain(remaining-1)
                  }
                  else{
                    toast.dark('all given chances are finished',{position: "top-center"})
                    resetFunc()
                  }
                }
        
         
      }
    
   let checkQues = (Calling,points)=>{
            let incorrect_ans =[...Calling[points].incorrect_answers]
            let correct = Calling[points].correct_answer
            let combine = [...incorrect_ans, correct]
            let question = Calling[points].question
            let arr = [] 
            while (true){
                let random_data = Math.floor(Math.random() * combine.length)
                if(!arr.includes(combine[random_data])){
                    arr.push(combine[random_data])
                }
                if(arr.length === combine.length){
                    setopts([...arr])
                    setques(question)
                    setans(correct)
                    arr = []
                    break
                }
            }
   } 
   
  let callingFunc =  async (get)=>{
    if(get>50){
      get=50
    }
    try{
      // https://opentdb.com/api.php?amount=10
        let data = await axios.get(`https://opentdb.com/api.php?amount=${get}`)
        let req = await data.data.results
        setmainData([...req])
        checkQues([...req],pointer)
    }
    catch(err){
          console.log('getting')
    }
  }
    useEffect( ()=>{
        if(initial===1){
          callingFunc(num)
        }
    }, [initial])
    useEffect(()=>{
      if(timer===0){
        toast.dark('times uppp"')
        resetFunc()
      }
      if(initial===1 && timer>0 ){
        if(beforeCLick==='done'){
          setTimer(60)
          setbefore('notDone')
        }
        let inter = setInterval(()=>{
          setTimer(timer-1)          
        },1000)  
        return ()=>clearInterval(inter)
      }
      
      
      
    },[ques,timer,initial,beforeCLick])

let handle=(e)=>{
  e.preventDefault();
  setinitial(1)

}
  return (
<>
  <div className={initial===0?'bottom main':'main'}>
       Quiz
  </div>
   {initial==='none'?<form className='initial-submission' onSubmit={handle}>
     <input type='number' onChange={(e)=>{setnum(e.target.value)}} />
     <input type = 'submit'/>
   </form>
   :
   <>
   <div className='center'>
      <div className="quiz-container">
    <div className='timer'>{timer}</div>
    <span >{ `${mainData.length-pointer}/${mainData.length}`}</span>
    <div id="quiz">
      <div className="question-container">
        <h2 id="question">{ques.replaceAll('&quot;',"")}</h2>
      </div>
      <div className="answers-container">
          {options.map((data,inx)=>{
             return <button className={colorfull===inx?'color answer':'answer'}   onClick={()=>{
              setvalue(data)
              setColor(inx)
             }}>{data}</button>
          })}
      </div>
    </div>
    
    <div id="results"  >
    <button id="submit" className='sub' onClick={()=>{
      finalized(ans,value)
    }} >Submit</button>
      <button className='sub' id='count'>
      score{"   "+count}
        </button> 
        <button className='sub' id='count'>
      chance{"   "+remaining}
        </button> 
    </div>
      
  </div>     
  </div>
   </>}
   
  
  
</>

  )
}

export default Quiz
