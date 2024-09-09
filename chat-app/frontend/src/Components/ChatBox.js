import React from 'react'
import { useChat } from '../context/ChatProvider'
import { Box } from '@mui/material'
import SingleChat from './SingleChat'
const ChatBox = ({fetchAgain,setfetchAgain}) => {
  const {selectedChat} = useChat()
  return (
    <Box

     d={{base:selectedChat?"flex":"none",md:"flex"}}
    alignItems={"center"}
    flexDir="column"
    p={3}
    width={"67%"}
    // w={{ base: "100%", md: "68%" }}
    borderRadius="lg"
    borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setfetchAgain= {setfetchAgain}   />
    </Box>
  )
}

export default ChatBox
