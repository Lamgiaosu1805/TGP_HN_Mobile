import { configureStore } from '@reduxjs/toolkit'
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import urlPostReducer from './urlPostSlice';
import storeViewReducer from './storeViewSlice';
import testReducer from './testSlice';

const rootReducer = {
    urlPost: urlPostReducer,
    storeView: storeViewReducer,
    tests: testReducer,
}

const store = configureStore({
    reducer: rootReducer
});

export default store;