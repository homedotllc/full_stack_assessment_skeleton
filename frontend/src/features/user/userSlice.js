import { createSlice } from "@reduxjs/toolkit";
import {fetchAllUsers , fetchUsersByHome} from './userThunks'

const initialState = {
    username : '',
    email : ''
}


const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        
    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchAllUsers.fulfilled , (state , action) => {
            
        })
        .addCase(fetchUsersByHome.fulfilled , (state , action) => {

        })
    }
})

export const {} = userSlice.actions
export default userSlice.reducer