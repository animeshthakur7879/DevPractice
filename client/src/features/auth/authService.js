import axios from "axios"
import { api } from "../../../api"

const login = async(formData) => {
    console.log(formData)
    const response = await axios.post(`${api}/auth/login` , formData)
    localStorage.setItem('user' , JSON.stringify(response.data))
    return response.data
}

const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {login , logout}

export default authService