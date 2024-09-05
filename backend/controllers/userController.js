const User = require("../models/userModel");
const Home = require("../models/homeModel");

// Find all users
exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find users by home ID
exports.findUsersByHome = async (req, res) => {
  try {
    const homeId = req.params.homeId;
    const home = await Home.findByPk(homeId, {
      include: User,
    });

    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }

    res.status(200).json(home.users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
