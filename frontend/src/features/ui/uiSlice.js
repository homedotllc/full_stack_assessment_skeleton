import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openModal : false,
}

const uiSlice = createSlice({
    name : 'ui',
    initialState,
    reducers : {
        toggleModalState : (state , action) => {
            state.openModal = action.payload.openModal
        }
    }
})

export const {toggleModalState , showPageModal} = uiSlice.actions
export default uiSlice.reducer