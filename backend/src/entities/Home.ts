import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './User';

@Entity('home')
export class Home {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 255 })
  street_address: string;

  @Column({ type: 'varchar', length: 255 })
  state: string;

  @Column({ type: 'varchar', length: 10 })
  zip: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  sqft: number;

  @Column({ type: 'int' })
  beds: number;

  @Column({ type: 'int' })
  baths: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  list_price: number;

  @ManyToMany(() => User, user => user.homes)
  users: User[];
}
