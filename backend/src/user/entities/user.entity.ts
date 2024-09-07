import { Home } from 'src/home/entities/home.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @ManyToMany(() => Home, (home) => home.user)
  @JoinTable({
    name: 'user_home',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'user_id',
    },
    inverseJoinColumn: {
      name: 'home_id',
      referencedColumnName: 'home_id',
    },
  })
  home: Home[];
}
