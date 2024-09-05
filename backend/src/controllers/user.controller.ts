import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entity/user.entity"
import { UserHome } from "../entity/userHome.entity"

export class UserController {
  static async findAll(req: Request, res: Response) {
    try {
      let userRepository = AppDataSource.getRepository(User)

      let users = await userRepository.find()

      res.status(200).json({
        controller: "findAll",
        users: users
      })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async findByHome(req: Request, res: Response) {
    try {
      let homeId = parseInt(req.params.homeId)

      const userRepository = AppDataSource.getRepository(User)

      const users = await userRepository
        .createQueryBuilder("user")
        .innerJoin(UserHome, "userHome", "user.id = userHome.userId")
        .where("userHome.homeId = :homeId", { homeId })
        .getMany()

      res.status(200).json({ controller: "findByHome", users: users || [] })
    } catch (error) {
      console.log(error)

      res.status(500).json({ error: error })
    }
  }
}
