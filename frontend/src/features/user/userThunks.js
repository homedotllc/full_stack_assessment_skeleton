import { createAsyncThunk } from "@reduxjs/toolkit";


const fetchAllUsers  = createAsyncThunk(
    'user/fetchAllUsers',
    async () => {
        const response = await fetch('http://localhost:3000/user/find-all' , {
            method : 'GET'
        })
        const responseData = await response.json()
        return responseData
    }
)

const fetchUsersByHome = createAsyncThunk(
    'user/fetchUsersByHome',
    async (homeId) => {
        const response = await fetch(`http://localhost:3000/user/find-by-home?homeId=${homeId}` , {
            method : 'GET'
        })
        const responseData = response.json()
        return responseData
    }
)

export default {
    fetchAllUsers, fetchUsersByHome
}