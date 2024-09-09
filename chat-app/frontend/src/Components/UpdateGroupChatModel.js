import { Button,  IconButton, Spinner, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import {useChat} from '../context/ChatProvider'
// import Visi from '@mui/icons-material/VisibilityTwoTone'
import UserBadgeItem from './userAvatar/UserBadgeItem'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Box,
  
  ModalCloseButton,
} from '@chakra-ui/react'
import { FormControl , Input } from '@chakra-ui/react'
import VisibilityTwoTone from '@mui/icons-material/VisibilityTwoTone'
import axios from 'axios'
import { toast } from 'react-toastify'
import UserListItem from './userAvatar/UserListItem'
const UpdateGroupChatModel = ({fetchAgain,setfetchAgain,FetchMessages }) => {
  const {user,selectedChat , setSelectedChat} = useChat()
  const [GroupChatName,setGroupChatName] = useState()
  const [search, setsearch] = useState()
  const [result, setresult] = useState([])
  const [loading, setloading] = useState(false)
  const [renameLoading, setrenameLoading] = useState(false)
  const {isOpen, onOpen, onClose}=useDisclosure()
  const handleRemove=async(user1)=>{
    if(selectedChat.groupAdmin._id === user._id && user1._id ===user._id  ){
      toast ("only admin can remove ")
      return 0
    }
     try {
       setloading(true)
       const config = {
        headers:{
          Authorization:`Bearer ${user.token}`
        }
       }
       const {data} = await axios.put("api/chat/groupremove",{
        chatId:selectedChat._id,
        userId:user1._id
       },config)
       user1._id === user._id ? setSelectedChat() : setSelectedChat(data)
       setfetchAgain(!fetchAgain)
       FetchMessages()
       setloading(false)
    } catch (error) {
      toast("error occurs")
    }
  }
   const handleAddUser = async(user1)=>{
    if(selectedChat.users.find((u)=>u._id===user1._id)){
      toast("user Already in Group")
      return 0;
    }
    if(selectedChat.groupAdmin._id !== user1._id){
      toast("only admins can add")
      return 0;
    }
    try {
       setloading(true)
       const config = {
        headers:{
          Authorization:`Bearer ${user.token}`
        }
       }
       const {data} = await axios.put("api/chat/groupadd",{
        chatId:selectedChat._id,
        userId:user1._id
       },config)
       setSelectedChat(data)
       setfetchAgain(!fetchAgain)
       setloading(false)
    } catch (error) {
      toast("error occurs")
    }
  } 
  
  const handleRename= async()=>{
    if(!GroupChatName) return ;
    try {
      setrenameLoading(true)
      const config= {
        headers:{
          Authorization:`Bearer ${user.token}`

        }
      }
      const {data} = await axios.put("/api/chat/rename",{chatId:selectedChat._id,chatName:GroupChatName},config)
      setSelectedChat(data)
      setfetchAgain(!fetchAgain)
      setrenameLoading(false)
    } catch (error) {
      toast("cant update name")
      setrenameLoading(false)
    }
    setGroupChatName("")
  }
 
  
  const handleSearch = async(query)=>{
    setsearch(query)
    if(!query ) return 0
    try {
      setloading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setloading(false);
      setresult(data);
    } catch (error) {
      toast(
      "problem occurs"
      );
      setloading(false);
    }
  }
  return (
    <>
    <IconButton onClick={onOpen}
    d={{base:"flex "}} icon={  <VisibilityTwoToneIcon/>}/>
<Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize="35px"
          fontFamily="Work sans"
          d="flex"
          justifyContent="center"
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
               {selectedChat.users.map((u)=>{
               
               return <UserBadgeItem key = {u._id} user={u} handleFunction = {()=>{
                handleRemove(u)
            }}/>
            
               })}

              </Box>
              <FormControl d="flex ">
                 <Input
                 placeholder='Chat Name'
                 mb = {3}
                 value ={GroupChatName}
                 onChange={(e)=>setGroupChatName(e.target.value)}
                 />
                 <Button variant={"solid"} colorScheme="teal" ml = {1} isLoading={renameLoading}
                 onClick={handleRename}>Update</Button>
                </FormControl>
                <FormControl d="flex ">
                 <Input
                 placeholder='Add user to Group'
                 mb = {1}
                 onChange={(e)=>handleSearch(e.target.value)}
                 />
                 <Button variant={"solid"} colorScheme="teal" ml = {1} isLoading={renameLoading}
                 onClick={handleRename}>Update</Button>
                </FormControl> 
                {loading?<Spinner size="lg"/>:<>
                   {result.map((user)=>{
                    return <UserListItem key={user._id} 
                    user = {user }
                    handleFunction={()=>handleAddUser(user)}/>
                   })}
                </>}          
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupChatModel
