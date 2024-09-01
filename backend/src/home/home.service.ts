import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Home } from './entities/home.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class HomeService {
  private readonly pageSize = 50;

  constructor(
    @InjectRepository(Home)
    private homeRepository: Repository<Home>,
  ) {}

  async findByUser(userId: number, page: number = 1): Promise<{ homes: Home[], currentPage: number, totalPages: number }> {
    const [homes, totalHomes] = await this.homeRepository.createQueryBuilder('home')
      .leftJoinAndSelect('home.users', 'user')
      .where('user.id = :userId', { userId })
      .skip((page - 1) * this.pageSize)
      .take(this.pageSize)
      .getManyAndCount();

    return {
      homes,
      currentPage: page,
      totalPages: Math.ceil(totalHomes / this.pageSize),
    };
  }

  async updateUsers(homeId: number, userIds: number[]): Promise<Home> {
    const home = await this.homeRepository.findOne({
      where: { id: homeId },
      relations: ['users'],
    });

    if (!home) {
      throw new NotFoundException(`Home with ID ${homeId} not found`);
    }

    const userRepository = this.homeRepository.manager.getRepository(User);
    const users = await userRepository.find({ where: { id: In(userIds) } });

    if (users.length !== userIds.length) {
      throw new NotFoundException('Some users not found');
    }

    home.users = users;
    return this.homeRepository.save(home);
  }
}
