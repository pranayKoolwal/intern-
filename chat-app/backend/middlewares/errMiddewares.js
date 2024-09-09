const notFound=(req,res,next)=>{
    const err=new Error(`Not found ${req.originalUrl}`)
    res.status(404)
    next(err)
}
const errHandler=(req ,res, next)=>{
    const statusCode  = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        msg:err.message,
        stack:null
    })
}
module.exports={
    notFound,
    errHandler
}