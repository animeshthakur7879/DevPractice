import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth/authSlice"
import theSnippet from "./features/snippets/snippetSlice"

const store = configureStore(
    {
        reducer : {auth , theSnippet}
    }
)

export default store