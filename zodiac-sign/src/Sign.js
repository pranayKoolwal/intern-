import React, { useEffect } from 'react'
import './Sign.css'
import { useState } from 'react'
import MainLogo from './MainLogo'

const Sign = () => {
    const [date, setdate] = useState('')
    const [name,setname] = useState('') 
    const [time, settime] = useState('')
    const [pointer , setpointer] = useState(0)
    let handle = (e)=>{
        e.preventDefault();
        setpointer(1)
        console.log('hello ')
    }
  return (
    <>
    <div className='container'> 
    <h1>Know Your Zodiac Sign</h1>
       <form onSubmit={handle}>
           <div className='innerForm'>
                <input type='text' value={name}   placeholder='Enter your name'  onChange={(value)=>{setname(value.target.value) 
                 setpointer(0)
                }}/>
                <input type='date'  value={date} onChange={(value)=>{setdate(value.target.value) 
                  setpointer(0)
                  }}/>
                <input type='time' value={time} onChange={(value)=>{settime(value.target.value)
                   setpointer(0)
                   }}/>
           </div>
          <button type='submit' >submit</button>
           
        </form>       
      
    </div>
    {pointer===1?<>
      <MainLogo data= {{month:new Date(date).getMonth()+1,name,date:new Date(date).getDate()}}/>
  </>:<></>}   
    </>
    
  )
}

export default Sign
