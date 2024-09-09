const jwt = require('jsonwebtoken')

const generateToken=(id)=>{
    return jwt.sign({id},'secPranay',{expiresIn:"30d"})
}
module.exports=generateToken