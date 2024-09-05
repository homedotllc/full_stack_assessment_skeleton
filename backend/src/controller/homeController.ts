import express from 'express'

const findByUser = (req: express.Request , res: express.Response) => {
    console.log('inside find by user')
    return res.json({'message' : 'reached'})
}


const updateUsers = (req: express.Request , res: express.Response) => {
    console.log('inside update users')
    return res.json({'message' : 'reached'})
}


export default {
    findByUser , updateUsers
}