import { createSlice } from '@reduxjs/toolkit'

const test = createSlice({
    name: 'test',
    initialState: 0,
    reducers: {
        degree: (state, action) => {
            return state += action.payload
        }
    }
})

const { reducer, actions } = test;
export const { degree } = actions;
export default reducer