import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { User } from "./user.entity"
import { Home } from "./home.entity"

@Entity({ name: "x_user_home" })
export class UserHome {
  @PrimaryColumn({ name: "user_id" })
  userId: number

  @PrimaryColumn({ name: "home_id" })
  homeId: number

  @ManyToOne(() => User, user => user.userHomes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User

  @ManyToOne(() => Home, home => home.userHomes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "home_id" })
  home: Home

  // @ManyToOne(() => User, user => user.id)
  // user: User

  // @ManyToOne(() => Home, home => home.id)
  // home: Home
}
