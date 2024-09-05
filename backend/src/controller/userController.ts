import express from 'express'



const findAll = (req: express.Request , res : express.Response) => {
    console.log('inside findALL user')
    
    return res.json({'messsage' : 'reached'})
}


const findByHome = (req : express.Request , res : express.Response) => {
    console.log('inside findALlFindByHome')
    return res.json({"message" : "reached"})
}



export default {
    findAll , findByHome
}