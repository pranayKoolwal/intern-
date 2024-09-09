import React from 'react'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import { useDisclosure ,Text} from '@chakra-ui/react'
import {Modal ,Image,ModalOverlay,ModalHeader,Button, ModalBody,ModalCloseButton,ModalContent,ModalFooter} from '@chakra-ui/react'
const ProfileModel = ({user, children}) => {
    const {isOpen,onOpen,onClose} = useDisclosure()
  return (
    <>
    
      {children?<span onClick={onOpen}>{children}</span>:(
        <VisibilityTwoToneIcon
        />
      )}
       <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}
            />
              <Text
              fontSize={{base:"28px" ,md:"30px"}}
              fontFamily="Work sans"
              >
                Email:{user.email}
              </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModel
