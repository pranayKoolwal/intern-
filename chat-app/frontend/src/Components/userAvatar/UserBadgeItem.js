import { Box } from '@mui/material'
import React from 'react'
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
const UserBadgeItem = ({user,handleFunction }) => {
  return (
    <Box
    px={2}
    py = {1}
    m={1}
    borderRadius={"lg"}
    mb={2}
    varient ={"solid "}
    fontSize={12}
    colorScheme="purple"
    cursor="pointer"
    onClick={handleFunction}
    >
        {user.name}
        <CloseTwoToneIcon />
    </Box>
  )
}

export default UserBadgeItem
