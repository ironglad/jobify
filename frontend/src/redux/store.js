import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlicer.js'
import { devtools } from "globals";

const store = configureStore({
    reducer: {
        auth: authSlice,  
    },
    devTools: process.env.NODE_ENV !== "production",  
});

export default store