const expressAsyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const loginUser = expressAsyncHandler(async(req , res) => {
    
    const {name , email , phoneNumber } = req.body

    if(!name || !email) {
        res.status(400)
        throw new Error("Incomplete Credentials")
    }

    let user = await User.findOne({email})

    if(!user){
       try {
            user = User.create({
                name , email , phoneNumber
            })
            res.status(200).json({
            name : user.name , 
            email : user.email ,
            phoneNumber : user.phoneNumber , 
            token : generateToken(user._id) ,
            id : user._id
    })
       } catch (error) {
            throw new Error("Error in creating user " , error)
       }
    }

    res.status(200).json({
        name : user.name , 
        email : user.email ,
        phoneNumber : user.phoneNumber , 
        token : generateToken(user._id) ,
        id : user._id
    })

})

const generateToken = (id) => {
    return jwt.sign({id : id} , process.env.JWT_SECRET , {expiresIn : "30d"})
}

module.exports = {loginUser}