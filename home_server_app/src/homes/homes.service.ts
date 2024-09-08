import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomesService {
  constructor(private prisma: PrismaService) {}

  async updateUsers(homeId: number, userIds: number[]) {
    return this.prisma.$transaction(async (prisma) => {
      // 1. Convert homeId to a number (if not already)
      const homeIdInt = Number(homeId); // Ensure it's treated as a number

      // 2. Delete all existing mappings for the specified home
      await prisma.user_home_mapping.deleteMany({
        where: { home_id: homeIdInt },
      });

      // 3. Create new mappings based on the provided user IDs
      if (userIds.length > 0) {
        const newMappings = userIds.map((userId) => ({
          home_id: homeIdInt,
          user_id: userId,
        }));
        await prisma.user_home_mapping.createMany({
          data: newMappings,
        });
      }

      // 4. Return the updated list of users associated with the specified home
      return prisma.user.findMany({
        where: {
          user_home_mapping: {
            some: { home_id: homeIdInt },
          },
        },
      });
    });
  }

  async findByUser(userId: number) {
    const homesList = await this.prisma.user_home_mapping.findMany({
      where: { user_id: userId },
      include: {
        home: true, // Only include the related user details
      },
    });
    return homesList.map((mapping) => mapping.home);
  }
}
