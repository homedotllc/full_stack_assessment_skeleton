import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchHomesByUser = createAsyncThunk(
    'home/fetchHomeByUser',
    async (payload) => {
        const response = await fetch(`http://localhost:3000/home/find-by-user?userId=${payload.userId}&page=${payload.page}&limit=${payload.limit}` , {
            method : 'GET'
        })
        const responseData = await response.json()
        return responseData
    }
)

const fetchUsersByHome = createAsyncThunk(
    'home/fetchUsersByHome',  
    async (payload) => {
        const response = await fetch(`http://localhost:3000/home/get-users-by-home/${payload.homeId}` , {
            method : 'GET'
        })
        const responseData = await response.json()
        return responseData
    }
)

const updateUsers = createAsyncThunk(
    'home/updateUsers' , 
    async (payload) => {
        const response = await fetch(`http://localhost:3000/home/${payload.userId}/update-users` , {
            method : 'PATCH',
            body : JSON.stringify(payload.userIdList)
        })
        const responseData = await response.json()
        return responseData
    }
)

export default {
    fetchHomesByUser , fetchUsersByHome , updateUsers
}