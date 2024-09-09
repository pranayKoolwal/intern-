import React from 'react'
import {NavLink, Route, Routes} from 'react-router-dom'
import Login from './Login'
import SignUP from './SignUp'
import data  from '/node_modules/bootstrap/dist/css/bootstrap.min.css'
import ChatPage from './ChatPage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if(userInfo)
    {
      navigate('/chats')
    }
  },[navigate])
  return (
      <>
         <div className='text-center font-monospace mt-3 ' style={{fontSize:"40px",fontWeight:700 , color:"black", textShadow:'0px 0px 5px grey'}} >Talkie Buddy</div>
  
         <Routes>
            <Route path='/login' element={<Login />}/>  
            <Route path='/' element={<Login/>}/>
            <Route path='/SignUp' element={<SignUP />}/>
            <Route path='/chats' element={<ChatPage/>}/>
      </Routes>
      </>
      
  )
}

export default HomePage
    