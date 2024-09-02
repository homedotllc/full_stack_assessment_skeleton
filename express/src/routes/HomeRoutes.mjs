import Express from "express";
import HomeController from "../controllers/HomeController.mjs";

export const HomeRouter = Express.Router();
const _homeController = new HomeController();

HomeRouter.get("/find-by-user", async (req, res) => {
  await _homeController.getUserHomes(req, res);
});

HomeRouter.put("/update-users", async (req, res) => {
  await _homeController.updateHomeUsers(req, res);
});
