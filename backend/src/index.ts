const express = require('express')

/*
AppDataSource.initialize().then(async () => {
    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
*/

const app = express()

const PORT = 3000 

// middlewares 


// routes
app.use('/user' , require('./routes/userRoute'))
app.use('/home' , require('./routes/homeRoute'))

app.listen(PORT , () => {
    console.log('Server is listening on PORT : ' , PORT)
})
