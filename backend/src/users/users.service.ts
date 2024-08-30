import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findByHome(homeId: number): Promise<User[]> {
    return this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.homes', 'home')
      .where('home.id = :homeId', { homeId })
      .getMany();
  }
}
