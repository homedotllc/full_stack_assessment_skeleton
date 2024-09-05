import express from "express"
import { HomeController } from "../controllers/home.controller"
export const Router = express.Router()

Router.post("/update-users", HomeController.updateUser)
Router.get("/find-by-user/:userId", HomeController.findByUser)
