import React from 'react'
import { useChat } from '../context/ChatProvider'
import axios from 'axios'
import {toast } from 'react-toastify'
import { useState,useEffect } from 'react'
import { getSender } from '../config/chatLogics'
import AddIcon from '@mui/icons-material/Add';
import { Text, Stack,Box , Button} from '@chakra-ui/react'
import GroupChatModal from './GroupChatModel'

// import AddIcon from '@chakra-ui/react/icons'
import ChatLoading from './ChatLoading'
const MyChats = ({fetchAgain}) => {
  const [loggedUser,setLoggedUser] = useState("")
  const {user,setUser,selectedChat , setSelectedChat,Chats, SetChats} = useChat()
  const fetchChats =async ()=>{
    try {
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`
        }
      }
      const {data} = await axios.get("/api/chat",config)
      SetChats(data)
      console.log(data,"from useEffect")
    } catch (error) {
      toast("error occureed")
    }

  }

  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats()
  },[fetchAgain])
  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
         <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {Chats ? <>
          <Stack overflowY="scroll">
            {Chats.map((chat) => {
              return (
                <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                
                <Text>
                  {!chat.groupChat 
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMsg && (
                  <Text fontSize="xs">
                    <b>{chat.latestMsg.sender.name} : </b>
                    {chat.latestMsg.content.length > 50
                      ? chat.latestMsg.content.substring(0, 51) + "..."
                      : chat.latestMsg.content}
                  </Text>
                )}
              </Box>
              )
            })}
          </Stack>
          
          </>
         : (
          
          <>            
            <ChatLoading />
          </>
          
        )}
      </Box>
    </Box>
  );
}

export default MyChats
