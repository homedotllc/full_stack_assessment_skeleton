import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHomesByUser = createAsyncThunk(
    'home/fetchHomesByUser',
    async (payload) => {
        try{
            const response = await fetch(`http://localhost:3000/home/find-by-user?userId=${payload.userId}&page=${payload.page}&limit=${payload.limit}` , {
                method : 'GET'
            })

            const responseData = await response.json()
            return responseData.data
        }catch(err){
            console.log('err in fetchHomesByUser : ' , err)
        }       
    }
)


export const updateUsers = createAsyncThunk(
    'home/updateUsers' , 
    async (payload) => {
        try{
            const response = await fetch(`http://localhost:3000/home/update-users?homeId=${payload.homeId}` , {
                method : 'PATCH',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({users : payload.users})
            })
            const responseData = await response.json()
            return responseData
        }catch(err){
            console.log('err in updateUsers : ' , err)
        }
        
    }
)
