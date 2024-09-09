import React from 'react'
import {useChat} from '../context/ChatProvider'
import {Box} from '@chakra-ui/react'
import SideDrawer from './SideDrawer'
import MyChats from  './MyChats'
import ChatBox from './ChatBox'
import { useState, useEffect } from 'react'
const ChatPage = () => {
  const { user } = useChat()
  const [fetchAgain, setfetchAgain] = useState("")
  return (
    <div style={{width:"100%"}}>
        {user ? <SideDrawer/> : <></>}
        <Box 
         display="flex"
         justifyContent="space-between"  
         w="100%"
         h="91.5vh"
         p="10px"
        >
           {user ? <MyChats fetchAgain={fetchAgain}  /> :<></> }
           {user ? <ChatBox fetchAgain={fetchAgain} setfetchAgain= {setfetchAgain}/> :<></> }
        </Box>
    </div>
  )
}

export default ChatPage
