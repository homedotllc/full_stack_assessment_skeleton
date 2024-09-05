import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openModal : false
}

const uiSlice = createSlice({
    name : 'ui',
    initialState,
    reducers : {
        toggleModalState : (state , action) => {
            state.openModal = action.payload.openModal
            console.log(state.openModal)
        }
    }
})

export const {toggleModalState} = uiSlice.actions
export default uiSlice.reducer