import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { UserHome } from "./userHome.entity"

@Entity({ name: "home" })
export class Home {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  street_address: string

  @Column()
  state: string

  @Column()
  zip: string

  @Column("decimal", { precision: 10, scale: 2 })
  sqft: number

  @Column()
  beds: number

  @Column()
  baths: number

  @Column("decimal", { precision: 15, scale: 2 })
  list_price: number

  @OneToMany(() => UserHome, userHome => userHome.home)
  userHomes: UserHome[]

  // @ManyToMany(() => User, user => user.home)
  // user: User[]
}
