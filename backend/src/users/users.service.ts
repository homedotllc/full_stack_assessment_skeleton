import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {

      throw new Error('Failed to retrieve users');
    }
  }

  async findByHome(homeId: number): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { homes: { id: homeId } },
        relations: ['homes'],
      });
    } catch (error) {

      throw new Error(`Failed to retrieve users for home ID ${homeId}`);
    }
  }
}
