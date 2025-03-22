import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlicer.js'
import { devtools } from "globals";
import JobSlice from "./jobSlice.js"
import companySlice from "./companySlice.js"
import applicationSlice from "./applicationslice.js"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'


  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  
  const rootReducer=combineReducers({
    auth:authSlice,
    job:JobSlice,
    company:companySlice,
    application:applicationSlice
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV !== "production",  
});

export default store