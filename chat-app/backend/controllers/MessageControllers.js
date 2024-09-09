const AsyncHandler = require("express-async-handler");
const Message = require("../model/message")
const User = require("../model/user")
const Chat = require("../model/chat")
const sendMessage=AsyncHandler(
   async (req,res)=>{
        const {content , chatId} = req.body
        if(!content || !chatId){
            console.log("invalid data passed into the request")
            return res.sendStatus(400)
        }
        var  newMessage={
            sender : req.user._id,
            content: content,
            chat:chatId
        }
        try{
           let message = await  Message.create(newMessage);
           message=(await message.populate("sender","name pict email")).populate('chat')
        //    message=await message.populate("chat")
           message=await User.populate(message,{
            path : "chat.users",
            select:"name pict email",
           })
           await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMsg:message
           })
           res.json(message)
        }catch(e){
            res.status(400)
            throw new Error(e.message)
        }
    }
)
const AllMessages=AsyncHandler(
   async (req,res)=>{
    try {
        const message = await Message.find({chat:req.params.chatId}).populate('sender',"name pict email").populate('chat')
        res.json(message)
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
    }
)
module.exports={
    sendMessage,
    AllMessages
}