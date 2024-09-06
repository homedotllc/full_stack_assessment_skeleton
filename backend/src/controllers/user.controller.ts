import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entity/user.entity"
import { UserHome } from "../entity/userHome.entity"

export class UserController {
  static async findAll(req: Request, res: Response) {
    let userRepository = AppDataSource.getRepository(User)

    let users = await userRepository.find({
      order: {
        username: "ASC"
      }
    })

    res.status(200).json({
      result: users
    })
  }
  static async findByHome(req: Request, res: Response) {
    let homeId = parseInt(req.params.homeId)

    if (!homeId) {
      return res.status(400).json({ error: "Invalid input" })
    }

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository
      .createQueryBuilder("user")
      .innerJoin(UserHome, "userHome", "user.id = userHome.userId")
      .where("userHome.homeId = :homeId", { homeId })
      .getMany()

    res.status(200).json({ result: users || [] })
  }
}
