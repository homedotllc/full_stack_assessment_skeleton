import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Home } from "./Home";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    email: string;

    @ManyToMany(() => Home, (home) => home.users)      // many-to-many
    @JoinTable({        
        name: "user_home",          // New Join table with name : user_home 
        joinColumn: {
            name: "user_id",                    // This is FK
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "home_id",                    // This is FK
            referencedColumnName: "id"
        }
    })
    homes: Home[];
}
