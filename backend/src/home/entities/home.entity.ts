import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Home {
  @PrimaryGeneratedColumn()
  home_id: number;

  @Column({ unique: true })
  street_address: string;

  @Column()
  zip: string;

  @Column()
  sqft: number;

  @Column()
  beds: number;

  @Column()
  baths: number;

  @Column('decimal', { precision: 15, scale: 2 })
  list_price: number;

  @ManyToMany(() => User, (user) => user.home)
  user: User[];
}
