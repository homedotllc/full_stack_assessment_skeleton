import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateHomeDto } from './dto/update-home.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private readonly homeRepository: Repository<Home>,
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
  ) {}
  // async #findUserIdByUsername(username: string): Promise<number | null> {
  //   const user = await this.userRepository.findOne({
  //     where: { username },
  //   });
  //   return user ? user.user_id : null;
  // }

  async findByUser(username: string) {
    return this.homeRepository
      .createQueryBuilder('home')
      .innerJoinAndSelect('home.user', 'user')
      .where('user.username = :username', { username })
      .select([
        'home.beds',
        'home.baths',
        'home.street_address',
        'home.zip',
        'home.beds',
        'home.list_price',
        'home.sqft',
      ])
      .getMany();
  }

  async updateUsersToHome(
    street_address: string,
    updateHomeDto: UpdateHomeDto,
  ) {
    const { usernames } = updateHomeDto;
    street_address = street_address.trim();

    const res = await this.homeRepository.manager.transaction(
      /* Inside ************Transaction************ */

      async (transcationEntityManager) => {
        const home = await transcationEntityManager.findOne(Home, {
          where: { street_address },
          relations: ['user'],
        });
        if (!home)
          throw new HttpException('Home not found', HttpStatus.NOT_FOUND);

        const usersToAdd = await transcationEntityManager.find(User, {
          where: { username: In(usernames) },
        });

        // Adding user
        for (const user of usersToAdd) {
          if (!home.user.some((u) => u.user_id === user.user_id)) {
            home.user.push(user);
          }
        }

        // Removing user
        const userIdsToRemove = home.user
          .map((u) => u.username)
          .filter((uName) => !usernames.includes(uName));
        home.user = home.user.filter(
          (u) => !userIdsToRemove.includes(u.username),
        );

        // Commiting Transaction

        await transcationEntityManager.save(home);
        return home;
      },
      /* Inside ************Transaction************ */
    );

    return res;
  }
}
