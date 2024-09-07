import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { UserHome } from "./userHome.entity"

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { length: 255 })
  username: string

  @Column("varchar", { length: 255 })
  email: string

  @OneToMany(() => UserHome, userHome => userHome.user)
  userHomes: UserHome[]

  // @ManyToMany(() => Home, home => home.user)
  // @JoinTable({
  //   name: "x_user_home",
  //   joinColumn: {
  //     name: "user_id",
  //     referencedColumnName: "id"
  //   },
  //   inverseJoinColumn: {
  //     name: "home_id",
  //     referencedColumnName: "id"
  //   }
  // })
  // home: Home[]
}
