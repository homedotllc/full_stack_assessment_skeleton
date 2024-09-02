import { Home } from "../models/HomeModel.mjs";
import { User } from "../models/UserModel.mjs";

class HomeRepository {
  constructor() {}
  async findUsersByHomeId(homeId) {
    try {
      const response = await Home.findByPk(homeId, {
        include: {
          model: User,
          through: {
            attributes: [],
          },
        },
      });
      return response;
    } catch (error) {
      console.error("HomeRepository findUsersByHomeId", error);
      throw error;
    }
  }
}

export default HomeRepository;
