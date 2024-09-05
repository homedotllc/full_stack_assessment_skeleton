import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './User';

@Entity('home')
export class Home {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique : true , type : 'varchar'})  // Home is identified by streetAdress ( unique )
  streetAddress: string;

  @Column({type : 'varchar'})
  state: string;

  @Column({type : 'varchar'})
  zip: string;

  @Column({type : 'float'})
  sqft: number;

  @Column({type : 'int'})
  beds: number;

  @Column({type : 'int'})
  baths: number;

  @Column({type: 'float'})
  listPrice: number;

  @ManyToMany(() => User , user => user.homes)
  users: User[]
}
