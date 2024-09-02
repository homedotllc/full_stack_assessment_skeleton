import HomeRepository from "../repository/HomeRepository.mjs";
import UserRepository from "../repository/UserRepository.mjs";
import UserHomeXRefRepository from "../repository/UserHomeXRefRepository.mjs";

class HomeController {
  constructor() {
    this.homeRespository = new HomeRepository();
    this.useRepository = new UserRepository();
    this.userHomeXRefRepository = new UserHomeXRefRepository();
  }
  async getUserHomes(req, res) {
    try {
      const userId = req?.query?.email;
      const response = await this.useRepository.findHomesByUserId(userId);
      res.status(200).send({ count: response?.homes?.length, response });
    } catch (error) {
      res.status(400).send({ error: error?.message });
    }
  }
  async updateHomeUsers(req, res) {
    try {
      const homeId = req?.body?.homeId;
      const userIds = req?.body?.userIds;
      await this.userHomeXRefRepository.deleteHomeUsers(homeId);
      await this.userHomeXRefRepository.addHomeUsers(homeId, userIds);
      res.status(200).send({
        status: true,
        message: "Update Successful",
      });
    } catch (error) {
      res.status(400).send({ error: error?.message });
    }
  }
}

export default HomeController;
