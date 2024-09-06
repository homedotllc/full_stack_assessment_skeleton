import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllUsers  = createAsyncThunk(
    'user/fetchAllUsers',
    async () => {
        try{
            const response = await fetch('http://localhost:3000/user/find-all' , {
                method : 'GET'
            })
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const responseData = await response.json()
            return responseData.data 
        }catch(err){
            console.log('err in fetchAllUsers : ' , err)
        }
    }
)

export const fetchUsersByHome = createAsyncThunk(
    'user/fetchUsersByHome',
    async ({homeId}) => {
        try{
            const response = await fetch(`http://localhost:3000/user/find-by-home?homeId=${homeId}` , {
                method : 'GET'
            })
            const responseData = await response.json()
            return responseData.data.users
        }catch(err){
            console.log('err in fetchUsersByHome : ' , err)
        }
        
    }
)

