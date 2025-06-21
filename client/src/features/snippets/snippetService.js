import axios from "axios"
import { api } from "../../../api"

//ADD SNIPPET 
const addSnippet = async(formData , token) => {

    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.post(`${api}/snippets` , formData ,options)
    return response.data

}

//GET USER'S ALL SNIPPETS
const userAllSnippets = async(uid , token) => {
    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(`${api}/snippets/all/${uid}` , options)
    return response.data

}

//Get Single SNippet
const getSingleSnippet = async(sid , token) => {

    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(`${api}/snippets/${sid}` , options)
    return response.data

}

//Update  SNippet
const updateSnippet = async(formData , sid , token) => {

    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.put(`${api}/snippets/${sid}` , formData ,  options)
    return response.data

}

//get public   SNippet
const publicSnippets = async(token) => {

    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(`${api}/snippets` , options)
    return response.data

}


//Remove SNippet
const removeSnippet = async(sid , token) => {

    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${api}/snippets/${sid}` , options)
    return response.data
}

const snippetService = {addSnippet , userAllSnippets , getSingleSnippet , updateSnippet , publicSnippets , removeSnippet}

export default snippetService