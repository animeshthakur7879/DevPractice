import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import snippetService from "./snippetService";

const snippetSlice = createSlice(
    {
        name : "theSnippet" , 
        initialState : {
            snippets : [] , 
            snippet : {} , 
            isLoading : false , 
            isSuccess : false , 
            isError : false , 
            message : ""
        } , 
        reducers : {} , 
        extraReducers : (builder) => {

            builder
            //ADD SNIPPET CASE
            .addCase(addSnippet.pending , (state , action) => {
                state.isLoading = true , 
                state.isSuccess = false , 
                state.isError = false
            })
            .addCase(addSnippet.fulfilled , (state , action) => {
                state.isLoading = false , 
                state.isSuccess = true , 
                state.snippet = action.payload
                state.isError = false
            })
            .addCase(addSnippet.rejected , (state , action) => {
                state.isLoading = false , 
                state.isSuccess = false , 
                state.isError = true , 
                message = action.payload
            })
            //GET USER ALL SNIPPETS CASE
            .addCase(getUserSnippets.pending , (state , action) => {
                state.isLoading = true , 
                state.isSuccess = false , 
                state.isError = false
            })
            .addCase(getUserSnippets.fulfilled , (state , action) => {
                state.isLoading = false , 
                state.isSuccess = true , 
                state.snippets = action.payload
                state.isError = false
            })
            .addCase(getUserSnippets.rejected , (state , action) => {
                state.isLoading = false , 
                state.isSuccess = false , 
                state.isError = true , 
                message = action.payload
            })
            //GET USER Single SNIPPET CASE
            .addCase(getUserSnippet.pending , (state , action) => {
                state.isLoading = true , 
                state.isSuccess = false , 
                state.isError = false
            })
            .addCase(getUserSnippet.fulfilled , (state , action) => {
                state.isLoading = false , 
                state.isSuccess = true , 
                state.snippet = action.payload
                state.isError = false
            })
            .addCase(getUserSnippet.rejected , (state , action) => {
                state.isLoading = false , 
                state.isSuccess = false , 
                state.isError = true , 
                message = action.payload
            })
            //GET PUBLIC SNIPPETS
            .addCase(getPublicSnippet.pending , (state , action) => {
                state.isLoading = true , 
                state.isSuccess = false , 
                state.isError = false
            })
            .addCase(getPublicSnippet.fulfilled , (state , action) => {
                state.isLoading = false , 
                state.isSuccess = true , 
                state.snippets = action.payload
                state.isError = false
            })
            .addCase(getPublicSnippet.rejected , (state , action) => {
                state.isLoading = false , 
                state.isSuccess = false , 
                state.isError = true , 
                message = action.payload
            })
            //REMOVE SNIPPET
            .addCase(removeSnippet.pending , (state , action) => {
                state.isLoading = true , 
                state.isSuccess = false , 
                state.isError = false
            })
            .addCase(removeSnippet.fulfilled , (state , action) => {
                state.isLoading = false , 
                state.isSuccess = true , 
                state.snippets = state.snippets.filter((snippet) => snippet._id !== action.payload._id)
                state.isError = false
            })
            .addCase(removeSnippet.rejected , (state , action) => {
                state.isLoading = false , 
                state.isSuccess = false , 
                state.isError = true , 
                message = action.payload
            })


        }
    }
)

export default snippetSlice.reducer

//Add a snippet
export const addSnippet = createAsyncThunk(
    "ADD/SNIPPET" , 
    async (formData , thunkAPI) => {

        let token = thunkAPI.getState().auth.user.token

        try {
            return await snippetService.addSnippet(formData , token)

        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }

    }
)

//GET User's Snippets 
export  const getUserSnippets = createAsyncThunk(
    "GET/USER_SNIPPETS" , 
    async (_ , thunkAPI) => {
        let token = thunkAPI.getState().auth.user.token
        let uid = thunkAPI.getState().auth.user.id
        try {
            return await snippetService.userAllSnippets(uid , token)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }
    }
)

//GET User's Snippet 
export  const getUserSnippet = createAsyncThunk(
    "GET/USER_SNIPPET" , 
    async (sid , thunkAPI) => {
        console.log(sid)
        let token = thunkAPI.getState().auth.user.token
        try {
            return await snippetService.getSingleSnippet(sid , token)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }
    }
)

//UPDATE USER SNIPPET
export const updateUserSnippet = createAsyncThunk(
    "UPDATE/SNIPPET" , 
    async ({formData , sid} , thunkAPI) => {
        let token = thunkAPI.getState().auth.user.token
            
        try {
           if(sid){
             return await snippetService.updateSnippet(formData , sid , token)
           }
           else{
            return await snippetService.addSnippet(formData , token)
           }
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }

    }
)

//PUBLIC SNIPPET
export const getPublicSnippet = createAsyncThunk(
    "GET/PUBLIC_SNIPPET" , 
    async (_ , thunkAPI) => {
       
        let token = thunkAPI.getState().auth.user.token
        try {
            return await snippetService.publicSnippets( token)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }

    }
)

//DELETE SNIPPET
export const removeSnippet = createAsyncThunk(
    "REMOVE/SNIPPET" , 
    async (sid , thunkAPI) => {
       
        let token = thunkAPI.getState().auth.user.token
        try {
            return await snippetService.removeSnippet(sid ,  token)
        } catch (error) {
            const message = error.response.data.message
            thunkAPI.rejectWithValue(message)
        }

    }
)