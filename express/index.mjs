import Express from "express";
import cors from "cors";
import { UserRouter } from "./src/routes/UserRoutes.mjs";
import "./src/database/HomeDatabase.mjs";
import { User } from "./src/models/UserModel.mjs";
import { Home } from "./src/models/HomeModel.mjs";
import { UserHomeXRef } from "./src/models/UserHomeXRefModel.mjs";
import { HomeRouter } from "./src/routes/HomeRoutes.mjs";

// User.belongsToMany(Home, {
//   through: UserHomeXRef,
//   foreignKey: "email",
//   otherKey: "id",
// });
// Home.belongsToMany(User, {
//   through: UserHomeXRef,
//   foreignKey: "home_id",
//   otherKey: "email",
// });

User.belongsToMany(Home, {
  through: UserHomeXRef,
  foreignKey: "email",
  otherKey: "home_id",
});

Home.belongsToMany(User, {
  through: UserHomeXRef,
  foreignKey: "home_id",
  otherKey: "email",
});

UserHomeXRef.belongsTo(User, {
  foreignKey: "email",
});

UserHomeXRef.belongsTo(Home, {
  foreignKey: "home_id",
});

const app = Express();

app.use(Express.json());

app.use(cors({ origin: "*" }));

app.use("/user", UserRouter);
app.use("/home", HomeRouter);

app.get("/status", (req, res) => {
  res.status(200).send({ status: true, message: "OK" });
});

app.listen(5001, () => {
  console.log(`server running on port 5001`);
});
