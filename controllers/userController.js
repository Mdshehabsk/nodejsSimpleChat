const User = require("../schema/userSchema");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const getLogin = async (req, res) => {
    try {
        res.render('login',{err:false});
    } catch (err) {
        console.log(err);
    }
}
const getRegister = async (req, res) => {
    try {
        res.render('register',{err:false});
    } catch (err) {
        console.log(err);
    }
}
const postLogin = async (req,res,next) => {
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            res.render('login',{err:'user does not exist'})
        }else{
            const match = await bcrypt.compare(password,user.password)
            if(match){
                const token = await jwt.sign({user},process.env.JWT_SECRET,{expiresIn:'24h'})
                res.cookie('chat',token,{httpOnly:true})
                res.redirect('/chat')
            }else{
                res.render('login',{err:'password is incorrect'})
            }
        }
    }catch(err){
        next(err)
    }
}
const postRegister = async (req,res,next)=>{
    try{
        const file = req.file
        const {firstname,lastname,email,password,cpassword,avatar} = req.body
        const user = await User.findOne({email})
        if(user){
            res.render('register',{err:'email alredy exist'})
        }
        else if (!firstname || !lastname || !email || !password || !cpassword ){
            res.render('register',{err:'please fill all the fields'})
        }
        else if(password !== cpassword){
            res.render('register',{err:'password and confirm password are not same'})
        }
        else{
            const hashPassword = await bcrypt.hash(password,10)
            const hashCpassword = await bcrypt.hash(cpassword,10)
            await new User({
                firstname,
                lastname,
                email,
                password:hashPassword,
                cpassword:hashCpassword,
                avatar: file ? file.filename : "avatar.jpg"
            }).save()
            res.render('login',{err:false})
        }
    }
    catch(err){
        next(err)
    }
}
const logout = async (req,res,next)=>{
    try{
        res.clearCookie('chat')
        res.redirect('/')
    }catch(err){
        next(err)
    }
}

module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    logout
}