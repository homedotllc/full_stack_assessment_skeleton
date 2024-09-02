import { UserHomeXRef } from "../models/UserHomeXRefModel.mjs";

class UserHomeXRefRepository {
  constructor() {}
  async deleteHomeUsers(homeId) {
    try {
      const response = await UserHomeXRef.destroy({
        where: {
          home_id: homeId,
        },
      });
      return response;
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  }
  async addHomeUsers(homeId, userIds) {
    try {
      const newAssociations = userIds.map((email) => ({
        email,
        home_id: homeId,
      }));
      const response = await UserHomeXRef.bulkCreate(newAssociations, {
        updateOnDuplicate: ["email"],
      });
      return response;
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  }
}

export default UserHomeXRefRepository;
