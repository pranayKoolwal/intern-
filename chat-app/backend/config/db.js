const moongose = require('mongoose')

let connectDb = async(url)=>{
    try{
         const connection = await moongose.connect(url)
    }
    catch(err){
        console.log(err,'getting err')
    }
}


module.exports=connectDb