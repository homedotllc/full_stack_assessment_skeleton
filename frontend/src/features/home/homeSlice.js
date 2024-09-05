import { createSlice } from "@reduxjs/toolkit";
import {fetchHomesByUser , fetchUsersByHome , updateUsers} from './homeThunks'

const initialState = {
    street_address : null,
    state : null,
    zip : null,
    beds : null,
    baths : null,
    sqft : null,
    list_price : null,
}

const homeSlice = createSlice({
    name : 'home',
    initialState,
    reducers : {

    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchHomesByUser.fulfilled , (state , action) => {

        })
        .addCase(fetchUsersByHome.fulfilled , (state , action) => {

        })
        .addCase(updateUsers.fulfilled , (state , action) => {
            
        })
    }
})

export const {} = homeSlice.actions
export default homeSlice.reducer