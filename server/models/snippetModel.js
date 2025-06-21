const { mongoose } = require("mongoose");

const snippetSchema = new mongoose.Schema({


    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User' ,
        required : true
    } ,
    title : {
        type : String,
        required : true ,
        default : "Untitled Snippet"
    } ,
    description : {
        type : String,
        default : ""
    } ,
    tags : {
        type : [String],
    } ,
    html : {
        type : String,
        default : ""
    } ,
    css : {
        type : String,
        default : ""
    } ,
    js : {
        type : String,
        default : "" 
        
    } ,
    isPublic : {
        type : Boolean,
        required : true ,
        default : false
    } ,
    
} , 
    {
        timestamps : true
    }

)

module.exports = mongoose.model('Snippet' , snippetSchema)