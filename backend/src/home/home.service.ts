import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Home } from './entities/home.entity';
import { User } from 'src/users/entities/user.entity';
import { In } from 'typeorm'; // Import In from TypeORM

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private homeRepository: Repository<Home>,
  ) { }



  async findall(): Promise<Home[]> {

    return await this.homeRepository.find();
  }

  async FetchOneHome(id: number): Promise<Home> {
    return await this.homeRepository.findOne(
      { where: { id } }
    );
  }


  async findByUser(userId: number, page: number = 1): Promise<{ homes: Home[], currentPage: number, totalPages: number }> {
    // Define page size
    const pageSize = 20;

    // Fetch homes for the specified page
    const [homes, totalHomes] = await this.homeRepository.createQueryBuilder('home')
      .leftJoinAndSelect('home.users', 'user')
      .where('user.id = :userId', { userId })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    // Calculate total pages
    const totalPages = Math.ceil(totalHomes / pageSize);

    return {
      homes,
      currentPage: page,
      totalPages,
    };
  }
  async updateUsers(homeId: number, userIds: number[]): Promise<any> {
    try {
      // Fetch the home entity with users relation

  
      const home = await this.homeRepository.findOne({
        where: {
          id: homeId,
        },
        relations: ['users'],
      });





      // Check if the home entity exists
      if (!home) {
        throw new Error(`Home with ID ${homeId} not found`);
      }

      // Fetch the user entities by their IDs using the In operator
      const userRepository = this.homeRepository.manager.getRepository(User);
      const users = await userRepository.find({
        where: {
          id: In(userIds),
        },
      });

      // Check if all users were found
      if (users.length !== userIds.length) {
        throw new Error('Some users not found');
      }

      // Update the home with the new users
      home.users = users;

      // Save the updated home entity


      return await this.homeRepository.save(home);



    } catch (error) {
      console.error('Error updating users:', error);
      throw error; // Re-throw the error after logging it
    }
  }
}
