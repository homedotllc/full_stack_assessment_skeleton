import { Request, Response } from "express"

export class HomeController {
  static async updateUser(req: Request, res: Response) {
    try {
      res.status(200).json({ controller: "updateUser" })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async findByUser(req: Request, res: Response) {
    try {
      res.status(200).json({ controller: "findByUser" })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}
