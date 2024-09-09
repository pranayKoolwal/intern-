const moongo=require('mongoose')
const bcrypt= require('bcryptjs')

const userSchema  = new moongo.Schema(
    {
        name:{type:String,required:true},
        email:{type:String, required:true,unique:true},
        password:{type:String, required:true},
        pict:{type:String,default:'https://avatars.mds.yandex.net/i?id=0c1e99dbc67b231cd35e5cdcf698ea6567c76b16-5232271-images-thumbs&n=13'}
    }
    ,
    {timestamps:true}
)
userSchema.methods.matchPassword= async function(pass){
    // console.log(await bcrypt.compare(pass,this.password))
    return  bcrypt.compare(pass,this.password) 
}
userSchema.pre('save',async function(next){ 
if(!this.isModified){
    next()
}
const salt= await bcrypt.genSalt(10)
this.password=await bcrypt.hash(this.password,salt)
})
const UserModel = moongo.model('user', userSchema)
module.exports=UserModel