import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findByHome(street_address: string) {
    street_address = street_address.trim();
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.home', 'home')
      .where('home.street_address = :street_address', {
        street_address,
      })
      .select(['user.email', 'user.username'])
      .getMany();
  }
}
