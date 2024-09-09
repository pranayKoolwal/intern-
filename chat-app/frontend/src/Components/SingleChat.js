import React from 'react'
import { useChat } from '../context/ChatProvider'
import {Box,FormControl,Input,Spinner,Text} from "@chakra-ui/react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import ProfileModel from './ProfileModel'
import { IconButton } from '@chakra-ui/button';
import UpdateGroupChatModel from './UpdateGroupChatModel';
import {getSender , getSenderFull} from '../config/chatLogics'
import axios from 'axios';
import { toast } from 'react-toastify';
import io from 'socket.io-client'

const EndPoint = "http://localhost:5000";
let socket,selectedChatCompare;

const SingleChat = ({fetchAgain,setfetchAgain}) => {
    const [messages,setMessages ] = useState([])
    const [loading,setLoading] = useState(false)
    const [socketConnected,setsocketConnected]=useState(false)
    const [newMessage,setNewMessage]= useState()
    const {user,selectedChat , setSelectedChat} = useChat()
    // console.log(getSender(user,selectedChat.users))
    useEffect(()=>{
      FetchMessages();
    },[selectedChat])
    const FetchMessages=async()=>{
      if(!selectedChat) return 0;
      try{
        const config={
          header:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${user.token}`
          }
        }
        setLoading(true)
        const {data}= await axios.get(`api/message/${selectedChat._id}`,config)
        setMessages(data)
        setLoading(false)
        socket.emit()
      }
      catch(err){
        toast("error ouccus")
        console.log(err.message)
      }
    }
    useEffect(()=>{
       socket=io(EndPoint)
       socket.emit('setup',user);
       socket.on("connection",()=>setsocketConnected(true))
    },[])
    const sendMessage=async(e)=>{
      if(e.key==="Enter" && newMessage){
        try{
          const config={
            header:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${user.token}`
            }
          }
          const {data} = await axios.post("/api/message",{
            content:newMessage,
            chatId:selectedChat._id
          },config)
          setNewMessage("");
          setMessages([...messages,data])
        }catch(err){
          toast("error ouccurs")
        }
      } 
    }
    const typingHandler=(e)=>{
       setNewMessage(e.target.value)

    }
  return (
    <>
    {selectedChat?<>
    <Text
    fontSize={{base:"28px",md:"30px"}}
    pb = {3}
    px={2}
    w="100%"
    fontFamily={"Work sans"}
    d="flex"
    justifyContent={{base:"space-between"}}
    alignItems={"center"} 
    >
          <IconButton
          d={{base:"flex" , md :"none"}}
          icon={<ArrowBackIcon/>}
          onClick={()=>{
            setSelectedChat("")
          }}    
          />
          {!selectedChat.groupChat?(
            <>
               
                {getSender(user,selectedChat.users)}
                <ProfileModel
                   user={getSenderFull(user,selectedChat.users)}
                />                 
            </>
          ):(
            <>
               
              {selectedChat.chatName.toUpperCase()} 
              <UpdateGroupChatModel
              fetchAgain={fetchAgain}
              setfetchAgain={setfetchAgain}
              FetchMessages={FetchMessages}
              />
            </>
          )}

    </Text>
    <Box
     d="flex"
     flexDir="column"
     justifyContent={"flex-end"}
     p={3}
     bg="#E8E8E8"
     w="100%"
     h="100%"
     borderRadius={"lg"}
     overflowY="hidden"
    >

      {loading?<>
        <Spinner
        size="xl"
        w={20}
        h={20}
        alignSelf="center"
        margin="auto"
        />
      </>
        :
        <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
        
        }
       <FormControl
         onKeyDown={sendMessage}
         id="first-name"
         isRequired
         mt={3}
       >
         <Input type="text"
         variant="filled"
         bg="#E0E0E0"
         placeholder="Enter a message.."
         value={newMessage}
         onChange={typingHandler}
         />
        </FormControl > 
    </Box>
    </>
        :<>
       <Box d="flex" alignItems="center" justifyContent="center" w="100%" h="100%">
        <Text fontSize="3xl" pb={3} fontFamily={"Work sans"}>
             Click on a User
        </Text>
       </Box>
    </>}
    </>
  )
}

export default SingleChat
