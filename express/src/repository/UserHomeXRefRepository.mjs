import { Sequelize } from "sequelize";
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
      console.log("response", response);
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
      // Bulk create new associations, which will add only if they don't exist
      const response = await UserHomeXRef.bulkCreate(newAssociations, {
        updateOnDuplicate: ["email"], // Ensure no duplicates are created
      });
      console.log("response add", response);
      return response;
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  }
}

export default UserHomeXRefRepository;
