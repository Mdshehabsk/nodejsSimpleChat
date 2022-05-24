const jwt = require('jsonwebtoken')
const checkAuth = async (req,res,next)=>{
    try{
        const token = req.cookies.chat
        if(token){
            const decoded = await jwt.verify(token,process.env.JWT_SECRET)
            req.user = decoded.user
            next()
        }else{
            res.redirect('/')
        }
    }catch(err){
       res.redirect('/')
    }
}

const checkLogin = async (req,res,next)=>{
    try{
        const token = req.cookies.chat
        if(token){
            res.redirect('/chat')
        }else{
            const match = jwt.verify(token,process.env.JWT_SECRET)
            next()
        }
    }catch(err){
        next()
    }
}

module.exports = {checkAuth,checkLogin}