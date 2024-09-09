const moongo=require('mongoose')

const messageScheme= new moongo.Schema({
    sender:{
        type:moongo.Schema.Types.ObjectId,
        ref:'user'
    },
    content:{
        type:String,
        trim:true   
    },
    chat:{
        type:moongo.Schema.Types.ObjectId,
        ref:'chat'
    }
},
{
    timestamps:true
})

const messageModel=moongo.model('message',messageScheme)

module.exports=messageModel