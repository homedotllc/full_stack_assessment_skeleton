import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Home {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    street_address: string;

    @Column()
    state: string;

    @Column()
    zip: string;

    @Column({type : "double"})
    sqft: number;

    @Column({type : "int"})
    beds: number;

    @Column({type : "int"})
    baths: number;

    @Column({type : "float"})
    list_price: number;

    @ManyToMany(() => User, (user) => user.homes)   // many-to-many
    users: User[];
}
