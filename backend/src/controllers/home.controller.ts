import { Request, Response } from "express"
import { In } from "typeorm"
import { AppDataSource } from "../data-source"
import { Home } from "../entity/home.entity"
import { User } from "../entity/user.entity"
import { UserHome } from "../entity/userHome.entity"

export class HomeController {
  static async updateUser(req: Request, res: Response) {
    const { userIds } = req.body
    const homeId = parseInt(req.body.homeId)

    if (!homeId || !userIds || !Array.isArray(userIds) || !userIds.length) {
      return res.status(400).json({ error: "Invalid input" })
    }

    const userHomeRepository = AppDataSource.getRepository(UserHome)
    const homeRepository = AppDataSource.getRepository(Home)
    const userRepository = AppDataSource.getRepository(User)

    const home = await homeRepository.findOne({ where: { id: homeId } })

    if (!home) {
      return res.status(404).json({ error: "Home not found" })
    }

    const validUsers = await userRepository.find({
      where: { id: In(userIds) }
    })

    if (validUsers.length !== userIds.length) {
      return res.status(400).json({
        error: "Some user IDs are invalid",
        invalidUserIds: userIds.filter(
          (userId: number) => !validUsers.some(user => user.id === userId)
        )
      })
    }

    await userHomeRepository.manager.transaction(
      async transactionalEntityManager => {
        await transactionalEntityManager
          .createQueryBuilder()
          .delete()
          .from(UserHome)
          .where("home_id = :homeId", { homeId })
          .execute()

        const userHomeInserts = userIds.map((userId: number) => ({
          userId,
          homeId
        }))

        await transactionalEntityManager
          .createQueryBuilder()
          .insert()
          .into(UserHome)
          .values(userHomeInserts)
          .execute()
      }
    )

    return res.status(200).json({ message: "Users updated successfully" })
  }

  static async findByUser(req: Request, res: Response) {
    let userId = parseInt(req.params.userId)

    const page = parseInt(req.query.page as string) || 1
    const pageSize = parseInt(req.query.pageSize as string) || 50

    if (!userId) {
      return res.status(400).json({ error: "Invalid request body" })
    }

    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: userId },
      relations: ["userHomes"]
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const homeRepository = AppDataSource.getRepository(Home)
    const [homes, total] = await homeRepository
      .createQueryBuilder("home")
      .innerJoin("home.userHomes", "userHomes", "userHomes.userId = :userId", {
        userId
      })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount()

    res.status(200).json({
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      result: homes
    })
  }
}
