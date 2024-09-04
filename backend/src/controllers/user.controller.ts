import { Request, Response } from "express"

export class UserController {
  static async findAll(req: Request, res: Response) {
    try {
      res.status(200).json({ controller: "findAll" })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
  static async findByHome(req: Request, res: Response) {
    try {
      res.status(200).json({ controller: "findByHome" })
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
}
