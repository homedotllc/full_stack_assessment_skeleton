import {configureStore} from '@reduxjs/toolkit'
import uiSlice from '../features/ui/uiSlice'
import userSlice from '../features/user/userSlice'
import homeSlice from '../features/home/homeSlice'

export const store = configureStore({
    reducer:  {
        ui : uiSlice,
        user : userSlice,
        home : homeSlice
    }
})

