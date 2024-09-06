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
            console.log('action ; ',  action.payload)
            state.userList = action.payload 
        })
        .addCase(fetchAllUsers.rejected, (state ) => {
            console.log('fetchAllUsers rejected')
            state.userList = []
        })
        .addCase(fetchUsersByHome.fulfilled , (state , action) => {
            console.log('fetchAllUsers fulfilled')
            state.usersByHomeList = action.payload
            console.log('usersByHomeList : ' , state.usersByHomeList)
        })
        .addCase(fetchUsersByHome.rejected , (state) => {
            console.log('fetchAllUsers rejected')
            state.usersByHomeList = []
        })
    }
})

export const {setCurrentUser} = userSlice.actions
export default userSlice.reducer