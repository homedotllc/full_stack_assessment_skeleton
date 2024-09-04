const { Home, User, UserHome } = require("../models");

const getHomesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId, {
      include: Home,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.homes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUsersForHome = async (req, res) => {
  console.log(req.body);
  try {
    const { homeId } = req.params;
    const { userIds } = req.body;

    // Validate userIds
    if (
      !Array.isArray(userIds) ||
      userIds.some((id) => typeof id !== "number")
    ) {
      return res.status(400).json({ message: "Invalid user IDs format" });
    }

    const home = await Home.findByPk(homeId);

    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }

    // Clear existing associations before setting new ones
    await home.setUsers([]); // Clear existing associations
    await home.addUsers(userIds); // Add new users

    res.status(200).json({ message: "Users updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsersByHome = async (req, res) => {
  try {
    const { homeId } = req.params;

    // Fetch all users
    const users = await User.findAll({
      attributes: ['id', 'username', 'email'],
    });

    // Fetch users associated with the home
    const associatedUsers = await UserHome.findAll({
      where: { home_id: homeId },
      attributes: ['user_id'],
    });

    // Create a Set of user IDs associated with the home
    const associatedUserIds = new Set(associatedUsers.map(uh => uh.user_id));

    // Add `isAssociated` field to each user
    const usersWithAssociation = users.map(user => ({
      ...user.toJSON(),
      isAssociated: associatedUserIds.has(user.id),
    }));

    res.status(200).json(usersWithAssociation);
  } catch (error) {
    console.error("Error fetching users by home:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getHomesByUser,
  updateUsersForHome,
  getAllUsersByHome,
};
