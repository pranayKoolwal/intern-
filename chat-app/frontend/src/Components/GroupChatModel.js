import React, { useState } from 'react'
import UserBadgeItem from './userAvatar/UserBadgeItem'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'
  import { Box } from '@mui/material'
  import { toast } from 'react-toastify'
  import { useDisclosure } from '@chakra-ui/react'
import { useChat } from '../context/ChatProvider'
import { FormControl, Input } from '@chakra-ui/react'
import axios from 'axios'
import UserListItem from './userAvatar/UserListItem'
const GroupChatModel = ({children}) => {
    
    const [groupChatName,setGroupChatName] = useState("")
    const [selectedUser,setSeletedUser] = useState([])
    const [search,setSearch] = useState("")
    const [SearchResult,setSearchResult] = useState([])
    const [loading,SetLoading] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {user,userChats, SetChats,Chats} = useChat()
    const handleGroup=(user)=>{
        if(selectedUser.includes(user))
        {
            toast("already added")
            return 0
        } 
        setSeletedUser([...selectedUser,user])
    }
    const HandleSearch= async(query)=>{
        setSearch(query)
        if(!query){
            toast("nonthing")
            return 0;
        }
        try {
            SetLoading(false)
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`,
                },
            }
            const {data} = await axios.get(`/api/user?search=${query}`,config)
           
            SetLoading(false )
            setSearchResult(data)
        } catch (error) {
            toast("error Occured !")
        }
    }
    const handleDelete=(user)=>{
        setSeletedUser([...selectedUser.filter((data)=>{return data._id !== user._id })])
    }
    

    const handleSubmit = async ()=>{
        if(!groupChatName || !selectedUser){
            toast("Fill All The Fields !!")
            return 0;
        }
        try {
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`,
                },
            }
            const {data} = await axios.post(`/api/chat/group`, 
                {name:groupChatName,users:JSON.stringify(selectedUser.map((u)=>u._id))},
                config
            )
            SetChats([data,...Chats])
            onClose();
            toast("new group chat created ")
        } catch (error) {
            console.log(error.message)
            toast("Failed to create the chat")

        }

    }
    
    return (
        <>
          <Button onClick={onOpen}>{children}</Button>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader
              fontSize={"35px"}
              fontFamily={"Work sans"}
              d="flex"
              justifyContent={"center"}
              >
                Create Group Chat
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody
               d="flex"
               flexDir={"column"}
               alignItems={"center"}
              >
                 <FormControl>
                    <Input placeholder='chat Name' 
                    mb={3} 
                    onChange={(e)=>setGroupChatName(e.target.value)}
                    />
                </FormControl> 
                 <FormControl>
                    <Input placeholder='Add users eg: pranay ,ram, shyam' mb={3}  
                    onChange={(e)=>{
                        HandleSearch(e.target.value)
                    }}
                    /> 
                </FormControl>
                <Box w="100%" d="flex" flexWrap="wrap">
                {selectedUser.map((user)=>{
                    return <UserBadgeItem key = {user.id} user={user} handleFunction = {()=>{
                        handleDelete(user)
                    }}/>
                })}
                </Box>
                
                {loading?<>Loading</>:
                    SearchResult?.slice(0,4).map((user)=>{
                        return <UserListItem
                          key={user._id}
                          user={user}
                          handleFunction={()=>{
                            handleGroup(user)
                          }}
                        />
                    })
                    }
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue'  onClick={handleSubmit}>
                   Create Chat
                </Button>
               
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModel
