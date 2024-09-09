// import { Tooltip } from '@chakra-ui/react'
import React from 'react'
import { useState,useEffect } from 'react';
import { Avatar, Box, Drawer, DrawerOverlay, Input, MenuButton, MenuDivider, MenuItem, MenuList, Toast } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react';
import ChatLoading from './ChatLoading';
import SearchIcon from '@mui/icons-material/Search';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Menu } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
// import { Input } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import {useChat} from '../context/ChatProvider'
import ArrowDownwardTwoToneIcon from '@mui/icons-material/ArrowDownwardTwoTone';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ProfileModel from './ProfileModel';
import { useNavigate } from 'react-router-dom';
import {toast}  from 'react-toastify';
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react' 
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import UserListItem from './userAvatar/UserListItem';
const SideDrawer = () => {
    const [search, setsearch] = useState("")
    const [result, setresult] = useState([])
    const [loading, setloading] = useState(false)
    const [loadingChats, setLoadingChats] = useState()

    const {user,setUser,selectedChat , setSelectedChat,Chats, SetChats} = useChat()
    const navigate= useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const LogOutHandler = ()=>{
      localStorage.removeItem("userInfo")
      navigate('/')
    }
    const accessChat=async(userId)=>{
      
      try {
        setLoadingChats(true)
        const config = {
          headers:{
            "Content-type":"application/json",
            Authorization:`Bearer ${user.token}`
          }
        }
        const {data} = await axios.post("/api/chat",{userId},config)
        if(!Chats.find((c)=>c._id===data._id)) {
          
          SetChats([data,...Chats])
        }        
        setLoadingChats(false)
        onClose()
      } catch (error) {
        console.log(error.message)
         toast("err fetching Data")
      }
    }
    const handleSearch=async()=>{
      if(!search){
        toast("no search is there")
        return ;
      }
      try {
        setloading(true)
        const config = {
          headers:{
            Authorization:`Bearer ${user.token}`
          }
        }
        const {data} = await axios.get(`/api/user?search=${search}`,config)
        
        setresult([...data])
        setloading(false)
      } catch (error) {
        toast('error occurs')
      }

    }
  return (
    <>
      <Box
       display={"flex"}
       justifyContent={"space-between"}
       alignItems={"center"}
       bg="white"
       w="100%"
       p="5px 10px 5px 10px "
       borderWidth={"5px"}
      // boxShadow={"0px 0px 5px 3px grey"}
       >
          <Tooltip label = "Search over there" hasArrow placement='bottom-end'>
          <Button variant={"ghost"} onClick={onOpen}>
                   <SearchIcon />
                   <Text  display={{ base:"none", md:'flex' }} px="4"  mt={2} > 
                      search user
                   </Text>
            </Button>
          </Tooltip>
          <Text fontSize="20px" fontFamily="Work sans">
            Buddy Chat
          </Text>
          <div >
            <Menu >
                 <MenuButton p={1} border={0}>
                 <NotificationsActiveIcon />
                 </MenuButton>
            </Menu>
            <Menu  >
                <MenuButton as={Button} border={0} rightIcon={<ArrowDownwardTwoToneIcon/>}>
                    <Avatar size="sm" cursor={"pointer"} name={user.name} src={user.pic}/>
                </MenuButton>
                <MenuList>
                    <ProfileModel user={user}>
                    <MenuItem>My Profile</MenuItem>
                    </ProfileModel>
                    <MenuDivider/>
                    <MenuItem onClick={LogOutHandler}>LogOut Button</MenuItem>
                </MenuList>
            </Menu>
          </div>
      </Box>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
          <DrawerOverlay/>
          <DrawerContent>
             < DrawerHeader BorderBottomWidth="1px">Search User</DrawerHeader>
          
             <DrawerBody>
              <Box display="flex " pb="2">
                  <Input placeholder='search by name or email'
                  mr={2}
                  value={search}
                  onChange={(e)=>{setsearch(e.target.value)}}/>
                  <Button onClick={handleSearch}>
                    Go
                  </Button>

              </Box>
              {loading?(
                <ChatLoading/>
              ):(
                result.map((user)=>{
                  return <UserListItem
                    key = {user._id}
                    user={user}
                    handleFunction = {()=>{
                      accessChat(user._id)
                    }}
                  />
                })
              )}
              {loadingChats&&<Spinner ml="auto" d="flex"/>}
          </DrawerBody>
          </DrawerContent> 
          
      </Drawer>
    </>
  )
}

export default SideDrawer
