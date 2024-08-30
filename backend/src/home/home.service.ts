import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Home } from './entities/home.entity';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private homeRepository: Repository<Home>,
  ) {}

  findByUser(userId: number, page: number = 1): Promise<Home[]> {
    return this.homeRepository.createQueryBuilder('home')
      .leftJoinAndSelect('home.users', 'user')
      .where('user.id = :userId', { userId })
      .skip((page - 1) * 50)
      .take(50)
      .getMany();
  }

  async updateUsers(homeId: number, userIds: number[]): Promise<void> {
    const home = await this.homeRepository.findOne({ where: { id: homeId }, relations: ['users'] });
    const users = await this.homeRepository.manager.getRepository(User).findByIds(userIds);
    home.users = users;
    await this.homeRepository.save(home);
  }
}
