import express from "express"
import { UserController } from "../controllers/user.controller"
import { asyncErrorHandler } from "../utils/error.handler"
export const Router = express.Router()

Router.get("/find-all", asyncErrorHandler(UserController.findAll))
Router.get(
  "/find-by-home/:homeId",
  asyncErrorHandler(UserController.findByHome)
)
