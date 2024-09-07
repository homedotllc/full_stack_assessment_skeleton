import express from "express"
import { HomeController } from "../controllers/home.controller"
import { asyncErrorHandler } from "../utils/error.handler"
export const Router = express.Router()

Router.post("/update-users", asyncErrorHandler(HomeController.updateUser))
Router.get(
  "/find-by-user/:userId",
  asyncErrorHandler(HomeController.findByUser)
)
