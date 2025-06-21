import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "./authService";

const authSlice = createSlice({
    name : 'auth' , 
    initialState : {
        user : JSON.parse(localStorage.getItem('user')) || null ,
        isLoading : false , 
        isSuccess : false ,
        isError : false ,
        message : ""
    } , 
    reducers : {} , 
    extraReducers : (builder) => {
        builder
        .addCase(loginUser.pending , (state , action) => {
            state.isLoading = true , 
            state.isSuccess = false ,
            state.isError = false
        })
        .addCase(loginUser.fulfilled , (state , action) => {
            state.isLoading = false , 
            state.isSuccess = true ,
            state.user = action.payload
            state.isError = false
        })
        .addCase(loginUser.rejected , (state , action) => {
            state.isLoading = false , 
            state.isSuccess = false ,
            state.isError = true ,
            state.message = action.payload
        })
        .addCase(logoutUser.fulfilled , (state , action) => {
            state.isLoading = false , 
            state.isSuccess = true ,
            state.isError = false ,
            state.user = null
        })
        
    }
})

export default authSlice.reducer


//LOGIN USER 
export const loginUser = createAsyncThunk(
    "AUTH/LOGIN" , 
    async (formData , thunkAPI) => {
        try {
            return await authService.login(formData)
        } catch (error) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//LOGOUT USER 
export const logoutUser = createAsyncThunk(
    "AUTH/LOGOUT" , 
    async (_ , thunkAPI) => {
        try {
            return await authService.logout()
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }
    }
)