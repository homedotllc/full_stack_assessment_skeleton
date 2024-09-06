import { createSlice } from "@reduxjs/toolkit";
import { fetchHomesByUser , updateUsers } from "./homeThunks";

const initialState = {
    homesList : [],
    currentHome : null,
    pageNumber : 1,
    totalPages : 0
}

const homeSlice = createSlice({
    name : 'home',
    initialState,
    reducers : {
        resetHomesList : (state) => {
            state.homesList = []
        },
        setCurrentHome : (state , action) => {
            state.currentHome = action.payload.homeItem
            console.log('state.currentHome : ' , state.currentHome)
        },
        incrementPageNumber : (state) => {
            state.pageNumber = state.pageNumber + 1
        },
        decrementPageNumber : (state) => {
            if(state.pageNumber > 1){
                state.pageNumber = state.pageNumber - 1
            }
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(fetchHomesByUser.fulfilled , (state , action) => {
            state.homesList = action.payload.homes
            state.totalPages = action.payload.pagination.totalPages
            console.log('state.homesList : ' , state.homesList)
        })
        .addCase(fetchHomesByUser.rejected , (state , action) => {
            console.log('fetchHomesByUser rejected : ')
            console.log('action payload : ' , action.payload)
            state.pageNumber = state.pageNumber - 1
        })
        .addCase(updateUsers.fulfilled , () => {
            console.log('users updated')
        })
    }
})

export const {resetHomesList , setCurrentHome , incrementPageNumber , decrementPageNumber} = homeSlice.actions
export default homeSlice.reducer