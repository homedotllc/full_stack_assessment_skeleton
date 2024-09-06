import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAllUsers  = createAsyncThunk(
    'user/fetchAllUsers',
    async () => {
        try{
            console.log('inside fetchAllUsers thunk')
            const response = await fetch('http://localhost:3000/user/find-all' , {
                method : 'GET'
            })
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            console.log('response : ' , response)
            const responseData = await response.json()
            console.log('responseData : ' , responseData)
            return responseData.data 
        }catch(err){
            console.log('err : ' , err)
        }
    }
)

export const fetchUsersByHome = createAsyncThunk(
    'user/fetchUsersByHome',
    async ({homeId}) => {
        console.log('inside fetchUsers by home')
        console.log('homeId ; ' , homeId)
        const response = await fetch(`http://localhost:3000/user/find-by-home?homeId=${homeId}` , {
            method : 'GET'
        })
        const responseData = await response.json()
        console.log('response Data : ' , responseData)
        return responseData.data.users
    }
)

