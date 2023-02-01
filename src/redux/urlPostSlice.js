import { createSlice } from '@reduxjs/toolkit'

const urlPost = createSlice({
    name: 'urlPost',
    initialState: '',
    reducers: {
        setUrlPost: (state, action) => {
            return action.payload
        }
    }
})

const { reducer, actions } = urlPost;
export const {setUrlPost} = actions;
export default reducer;