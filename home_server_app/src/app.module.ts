import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersController } from './users/users.controller';
import { HomesController } from './homes/homes.controller';
import { UsersService } from './users/users.service';
import { HomesService } from './homes/homes.service';

@Module({
  imports: [],
  controllers: [AppController,UsersController,HomesController],
  providers: [AppService,UsersService,HomesService,PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
