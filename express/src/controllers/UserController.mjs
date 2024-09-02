import { Home } from "../models/HomeModel.mjs";
import { UserHomeXRef } from "../models/UserHomeXRefModel.mjs";
import { User } from "../models/UserModel.mjs";
import UserRepository from "../repository/UserRepository.mjs";
import HomeRepository from "../repository/HomeRepository.mjs";

class UserController {
  constructor() {
    this.homeRepository = new HomeRepository();
    this.userRepository = new UserRepository();
  }
  async getAllUsers(req, res) {
    try {
      const response = await User.findAll();
      res.status(200).send({ count: response?.length, response });
    } catch (error) {
      console.error("UserController getAllUsers", error);
    }
  }
  async getUsersByHomeId(req, res) {
    try {
      const homeId = req?.query?.homeId;
      const response = await this.homeRepository.findUsersByHomeId(homeId);
      res.status(200).send({ count: response?.length, response });
    } catch (error) {
      console.error("UserController getUsersByHomeId", error);
      res.status(400).send({ error: error?.message });
    }
  }
}

export default UserController;
