const asyncHandler=require('express-async-handler')
const User = require('../model/user')
const generateToken=require('../config/generateTocken')
const RegisterUser =asyncHandler( async(req,res)=>{
    const {name , email , password , pict} = req.body
    // console.log(req.body,'here is the error in here')
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please Enter All fields')
    }
    const userExist=await User.findOne({email})
    if(userExist){
        res.status(400)
        throw Error('already exists')
    }
    const user  = await User.create({
        name,
        password,
        email,
        pict
    })
    if(user){
        res.status(201).json(
            {
                _id:user._id,
                password:user.password,
                name:user.name,
                email:user.email, 
                pict:user.pict,
                token:generateToken(user._id)
            }
        )
    }
    else{
        res.status(400)
        throw Error('user Not Fount')
    }
})

const authUser = asyncHandler(
    async(req,res)=>{
        const {email,password}=req.body
        //
        const user=await User.findOne({email})
        const savingUser=await user.save()
        if(user  && user.matchPassword(password)){
            res.json({
                _id:user._id,
                password:user.password,
                name:user.name,
                email:user.email, 
                pict:user.pict,
                token:generateToken(user._id)
            })

        }
        else{
            res.status(401);
            throw new Error('invalid email and password')
        }

    }    
)
const AllUsers=asyncHandler(
    async (req , res)=>{
        const keyWord = req.query.search ? {
            $or:[
                {name:{$regex:req.query.search,$options:"i"}},
                {email:{$regex:req.query.search,$options:"i"}}
            ]       
        }:
        {}
    const users = await User.find(keyWord)
    res.send(users);    
    }
    // .find({_id:{$ne : req.user._id}});
)
module.exports={RegisterUser,authUser,AllUsers}