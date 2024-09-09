import React from 'react'
import ScrollableFeed from 'react-scrollable-feed';
import { isSameSender } from '../config/chatLogics';
import { useChat } from '../context/ChatProvider';
import { isSameSenderMargin } from '../config/chatLogics';
import { isSameUser } from '../config/chatLogics';
import { Tooltip  , Avatar} from '@chakra-ui/react';
const ScrollableChat = ({messages}) => {
   const {user} = useChat() 
  return (
    <ScrollableFeed>
        {messages && messages.map((m,i)=>{
            return (
                <div  style={{ display: "flex" }} key={m._id} >
                    {isSameSender(messages,m,i,user._id )
                    || isLastMessages(messages,i,user._id)
                    &&(
                        <Tooltip
                        label={m.sender.name}
                        placement="bottom-start"
                        hasArrow
                        >
                              <Avatar
                                    mt="7px"
                                    mr={1}
                                    size="sm"
                                    cursor="pointer"
                                    name={m.sender.name}
                                    src={m.sender.pic}
                                    />
                        </Tooltip>
                    )

                    }
                    <span
                    style={{
                        backgroundColor: `${
                          m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                        }`,
                        marginLeft: isSameSenderMargin(messages, m, i, user._id),
                        marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                        borderRadius: "20px",
                        padding: "5px 15px",
                        maxWidth: "75%",
                      }}
                    >
                        {m.content}
                    </span>
                </div>
            )
        })}
    </ScrollableFeed>
  )
}

export default ScrollableChat
