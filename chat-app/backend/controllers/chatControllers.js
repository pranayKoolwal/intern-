const asyncHandler = require('express-async-handler')
const Chat = require('../model/chat') 
const User = require('../model/user')
const accessChat = asyncHandler(
   async (req,res) =>{
      const {userId} = req.body
      if(!userId){
        console.log('userParams not sent')
        return res.sendStatus(400)
      }
      var isChat = await Chat.find({
        groupChat:false,
        $and:[
        {
          users:{$elemMatch:{$eq:req.user_id}},
          users:{$elemMatch:{$eq:userId}}
        }
        ]
      }).populate("users","-password").populate("latestMsg")
      isChat=await User.populate(isChat,{
        path:"latestMsg.sender",
        select:"name pict email"
      })
      if(isChat.length > 0){
        res.send(isChat)
      }
      else{
        var chatData = {
          chatName:"sender",
          groupChat:false, 
          users:[req.user._id, userId]
        }
        try{
          const created = await Chat.create(chatData)
          const fullChat = await Chat.findOne({_id:created._id }).populate("users","-password")
          res.status(200).send(fullChat)
        }catch(e){
          res.status(400)
            throw new Error(e.message)
        }
      }
    }
    
)
const FetchChat=asyncHandler(
  async(req , res)=>{
    try {
      Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
      .populate('users',"-password").
      populate('groupAdmin',"-password").
      populate("latestMsg")
      .sort({updatedAt :-1})
      .then(async(results)=>{
        results= await User.populate(results,{
          path :"latestMsg.sender",
          select: "name pict email"
        })
        res.status(200).send(results)
      })
      
    } catch (error) {
      res.status(400);
      throw new Error(error.message)
    }
  }
)
const createGroupChat = asyncHandler(
  async(req,res)=>{
    if(!req.body.users || !req.body.name){
      return res.status(400).send({message:"please fill all the fields"})
    }
    var users = JSON.parse(req.body.users)
    if (users.length < 2){
      return res.status(400)
      .send('More then 2 users are required for group chat')
    }
    users.push(req.user) 
    try {
      const groupChat= await Chat.create({
        chatName:req.body.name,
        users:users,
        groupChat:true,
        groupAdmin:req.users
      })

      
      // .populate("users","-password").populate("groupAdmin","-password");
      const fullGr = await Chat.findOne({_id:groupChat._id}).populate("users","-password").populate("groupAdmin","-password")
      res.status(200).json(fullGr)
  
  
    } catch (error) {
        res.status(200)
        throw new Error(error.message)
    }
  }
)
const renameGroup = asyncHandler(async(req,res)=>{
  const {chatId,chatName } = req.body
  const updatedChat = await Chat.findByIdAndUpdate(chatId,{
    chatName
  },
{
  new:true
})
.populate('users',"-password")
.populate("groupAdmin","-password")
if(!updatedChat){
   res.status(404 );
   throw new Error('Chat not found')
}
else{
  res.status(200).json(updatedChat)
}
})
const addToGroup = asyncHandler(
  async( req, res)=>{
    const {chatId,userId} = req.body
    const added = await Chat.findByIdAndUpdate(chatId,{
      $push:{users:userId}
    },
  {
    new : true
  }).populate('users',"-password").populate("groupAdmin","-password")
  if(!added){
    res.status(400)
    throw new Error("Chat  not Found")
  }
  else {
    res.json(added)
  }
  }
  
)
const removeFromGroup = asyncHandler(
  async( req, res)=>{
    const {chatId,userId} = req.body
    const remove= await Chat.findByIdAndUpdate(chatId,{
      $pull:{users:userId}
    },
  {
    new : true
  }).populate('users',"-password").populate("groupAdmin","-password")
  if(!remove){
    res.status(400)
    throw new Error("Chat  not Found")
  }
  else {
    res.json(remove)
  }
  }
  
)
module.exports = {
    accessChat,
    FetchChat,
    createGroupChat,
    renameGroup,
    removeFromGroup,
    addToGroup
}