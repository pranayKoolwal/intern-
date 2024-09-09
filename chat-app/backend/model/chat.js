const moongo=require('mongoose')

const chatSchema = new moongo.Schema(
    {
        chatName : {
            type:String,
            trim:true
        },
        groupChat:{
            type:Boolean,
            default:false   
        },
        users:[
            {type:moongo.Schema.Types.ObjectId,
                ref:"user"
            }
        ],
        latestMsg:{
            type:moongo.Schema.Types.ObjectId,
            ref:'message'
        },
        groupAdmin:{
            type:moongo.Schema.Types.ObjectId,
            ref:"user"
        }
    },
    {
        timestamps:true
    }
   
)
const chatModel =  moongo.model('chat',chatSchema)

module.exports=chatModel