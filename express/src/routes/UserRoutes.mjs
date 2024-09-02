import Express from "express";
import UserController from "../controllers/UserController.mjs";

export const UserRouter = Express.Router();
const _userController = new UserController();

UserRouter.get("/find-all", async (req, res) => {
  await _userController.getAllUsers(req, res);
});

UserRouter.get("/find-by-home", async (req, res) => {
  await _userController.getUsersByHomeId(req, res);
});
