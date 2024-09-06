import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { UserHome } from "./userHome.entity"

@Entity({ name: "home" })
export class Home {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { length: 255 })
  street_address: string

  @Column("varchar", { length: 255 })
  state: string

  @Column("varchar", { length: 10 })
  zip: string

  @Column("decimal", { precision: 10, scale: 2 })
  sqft: number

  @Column("int")
  beds: number

  @Column("int")
  baths: number

  @Column("decimal", { precision: 15, scale: 2 })
  list_price: number

  @OneToMany(() => UserHome, userHome => userHome.home)
  userHomes: UserHome[]

  // @ManyToMany(() => User, user => user.home)
  // user: User[]
}
