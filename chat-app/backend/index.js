const express= require('express')
const app= require('express')()
const {notFound} = require("../backend/middlewares/errMiddewares")
const {errHandler} = require("../backend/middlewares/errMiddewares")
const connectDb = require('./config/db')
const chatRoutes=require('../backend/Routes/chatRoutes')
const messageRoutes=require("./Routes/MessageRoutes")
const port = 3001
const userRouter = require('./Routes/UserRoutes')
connectDb('mongodb://127.0.0.1:27017/MernChat')
app.use(express.json())
app.use('/api/user',userRouter)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)
app.use(notFound)
app.use(errHandler)
const server = app.listen(port,()=>{console.log('server started 3001')})
const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3001"
    }
})
io.on('connection',(socket)=>{
    console.log('connected to socket .io')
    socket.on('setup',(userData)=>{
        socket.join(userData._id)
        socket.emit('connected')
    })
    socket.on('join chat',(room)=>{
        socket.join(room)
    })
})