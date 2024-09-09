import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findByHome(homeId: number) {
    const usersList = await this.prisma.user_home_mapping.findMany({
        where: { home_id: homeId },
        include: {
          user: true, // Only include the related user details
        },
      });
    
      return usersList.map((mapping) => mapping.user);
  }

}
