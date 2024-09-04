import dotenv from "dotenv"
import express from "express"
import "reflect-metadata"
import { AppDataSource } from "./data-source"
import { Router as homeRouter } from "./routers/home.routes"
import { Router as userRouter } from "./routers/user.routes"

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use("/api", userRouter)
app.use("/api", homeRouter)
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected")
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
