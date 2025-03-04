import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlicer.js'
import { devtools } from "globals";

const store = configureStore({
    reducer: {
        auth: authSlice,  // Correct reducer setup
    },
    devTools: process.env.NODE_ENV !== "production",  // ✅ Enable Redux DevTools in development mode
});

export default store