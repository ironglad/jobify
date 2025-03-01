import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlicer.js'

const store= configureStore({
    reducer:{
        auth:authSlice
    }
})

export default store