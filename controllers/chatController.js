const User = require("../schema/userSchema")
const Message = require('../schema/messageSchema')

const getChat = async (req,res,next) =>{
    try{
        const user = await User.find({})
        const newUser = user.filter(user=>user._id != req.user._id)
        res.render("chat",{user:newUser,currentUser:false})
    }catch(err){
        next(err)
    }
}
const getSignleChat = async (req,res,next)=>{
    try{
        const {id} = req.params
        const currentUser = await User.findById(id)
        const user = await User.find({})
        const newUser = user.filter(user=>user._id != req.user._id)
        const message = await Message.find({
            $or:[
                {sender:req.user._id,receiver:id},
                {sender:id,receiver:req.user._id}
            ]
        })
        res.render("singlechat",{user:newUser,currentUser,message,you:id,me:req.user._id})
    }catch(err){
        next(err)
    }
}
const postMessage = async (req,res,next) =>{
    try{
        const {message,id:yourId} = req.body
        const {_id:myUser} = req.user
        const newMessage = new Message({
            message,
            sender:myUser,
            receiver:yourId
        })
        await newMessage.save()
        io.emit("message",{message,sender:myUser,receiver:yourId})
    }catch(err){
        next(err)
    }
}


module.exports = {
    getChat,
    getSignleChat,
    postMessage
}