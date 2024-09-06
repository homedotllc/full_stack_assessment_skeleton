import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Home } from './Home';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @ManyToMany(() => Home, home => home.users)
  @JoinTable({
    name: 'user_home_relation', // This is the name of the join table
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'home_id', referencedColumnName: 'id' }
  })
  homes: Home[];
}
