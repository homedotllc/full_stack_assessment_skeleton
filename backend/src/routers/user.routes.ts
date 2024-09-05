import express from "express"
import { UserController } from "../controllers/user.controller"
export const Router = express.Router()

Router.get("/find-all", UserController.findAll)
Router.get("/find-by-home/:homeId", UserController.findByHome)
