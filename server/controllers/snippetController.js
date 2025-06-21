const expressAsyncHandler = require("express-async-handler")
const Snippet = require("../models/snippetModel")
const User = require("../models/userModel")

//Add a snippet
const addSnippet = expressAsyncHandler(async (req , res) => {
    
    const {title , description , tags , html , css , js , isPublic} = req.body

    const snippet = await Snippet.create({
       user : req.user._id ,  title , description , tags , html , css , js , isPublic
    })

    if(!snippet){

        res.status(400)
        throw new Error("Error in creting Snippet")

    }

    res.status(200).json({snippet})

})

//Get single snippet
const getSingleSnippet = expressAsyncHandler(async(req , res) => {
    
    const snippet = await Snippet.findById(req.params.sid).populate('user' , 'name , email')

    if(!snippet){
        res.status(400)
        throw new Error("Error getting this snippet")
    }

    res.status(200).json(snippet)


})

//Get all snippets(user)
const getUserSnippets = expressAsyncHandler(async(req , res) => {
    
    const allSnippets = await Snippet.find({user : req.user._id})

    if(!allSnippets){
        res.status(400) 
        throw new Error("No snippets found")
    }

    res.status(200).json(allSnippets)

})

const getAllPublicSnippets = expressAsyncHandler(async(req , res) => {
    
    const publicSnippets = await Snippet.find({isPublic : true}).populate('user' , 'name , email')

    if(!publicSnippets) {
        throw new Error("No public Snippets found")
    }

    res.status(200).json(publicSnippets)

})

const updateUserSnippet = expressAsyncHandler( async(req , res) => {

    const updatedSnippet = await Snippet.findByIdAndUpdate(req.params.sid , req.body ,  { new: true })

    if(!updatedSnippet){
        res.status(400)
        throw new Error ("Error in updating the snippet")
    }

    res.status(200).json(updatedSnippet)

})

const deleteUserSnippet = expressAsyncHandler(async(req , res) => {
    
    const deletedSnippet = await Snippet.findByIdAndDelete(req.params.sid)

    if(!deletedSnippet) {
        res.status(400)
        throw new Error ("Error in deleting the snippet")
    }

    res.status(200).json(deletedSnippet)

})


module.exports = {addSnippet , getUserSnippets , getAllPublicSnippets , updateUserSnippet , deleteUserSnippet , getSingleSnippet}