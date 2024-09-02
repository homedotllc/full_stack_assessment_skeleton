import { Home } from "../models/HomeModel.mjs";
import { User } from "../models/UserModel.mjs";

class UserRepository {
  constructor() {}
  async findHomesByUserId(useId) {
    try {
      const response = await User.findByPk(useId, {
        include: {
          model: Home,
          through: {
            attributes: [],
          },
        },
      });
      return response;
    } catch (error) {
      console.error("UserRepository findHomesByUserId", error);
      throw error;
    }
  }
}

export default UserRepository;
