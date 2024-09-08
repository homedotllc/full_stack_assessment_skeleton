import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('find-all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('find-by-home/:homeId')
  async findUsersByHome(@Param('homeId') homeId: number) {
    return this.usersService.findByHome(Number(homeId)); // Convert homeId to a number
  }
}
