import { createSlice } from '@reduxjs/toolkit'

const storedView = createSlice({
    name: 'storedView',
    initialState: {
        data: []
    },
    reducers: {
        storeView: (state, action) => {
            state.data.push(action.payload)
        }
    }
})

const { reducer, actions } = storedView;
export const {storeView} = actions;
export default reducer