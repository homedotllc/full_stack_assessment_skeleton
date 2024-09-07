import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers , fetchUsersByHome } from "./userThunks";


const initialState = {
    userList : [],
    usersByHomeList : [],
    currentUser : null
}


const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setCurrentUser : (state , action) => {
            state.currentUser = action.payload.currentUser
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchAllUsers.fulfilled , (state , action) => {
            state.userList = action.payload 
        })
        .addCase(fetchAllUsers.rejected, (state ) => {
            state.userList = []
        })
        .addCase(fetchUsersByHome.fulfilled , (state , action) => {
            state.usersByHomeList = action.payload
        })
        .addCase(fetchUsersByHome.rejected , (state) => {
            state.usersByHomeList = []
        })
    }
})

export const {setCurrentUser} = userSlice.actions
export default userSlice.reducer