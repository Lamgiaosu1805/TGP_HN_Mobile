import { configureStore } from '@reduxjs/toolkit'
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import urlPostReducer from './urlPostSlice'

const rootReducer = {
    urlPost: urlPostReducer,
}

const store = configureStore({
    reducer: rootReducer
});

export default store;