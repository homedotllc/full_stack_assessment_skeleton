import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Home } from './Home';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type : 'varchar' })     // User is identified by username ( unique )
  username: string;

  @Column({type : 'varchar'})
  email: string;

  @ManyToMany(() => Home , home => home.users , { cascade : true })
  @JoinTable()
  homes : Home[]
}
