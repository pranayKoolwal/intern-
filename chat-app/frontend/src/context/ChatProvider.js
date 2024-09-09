import React, { createContext , useContext, useEffect} from 'react'
 import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
const context=createContext()
const ChatProvider = ({children}) => {
  const [user,setUser] = useState('')
  const [selectedChat , setSelectedChat] = useState()
  const [Chats, SetChats] = useState()
  const navigate = useNavigate()
  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    setUser(userInfo)
    // if(!userInfo)
    // {
    //   navigate('/')
    // }
  },[navigate])
  return (
    <context.Provider value={{user,setUser,selectedChat , setSelectedChat,Chats, SetChats}}>
        {children}
    </context.Provider>
  )
}

export const useChat=()=>{
  return useContext(context) 
}
export default ChatProvider
