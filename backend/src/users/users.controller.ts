import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('find-all')
  findAll() {
    return this.userService.findAll();
  }

  @Get('find-by-home')
  findByHome(@Query('homeId') homeId: number) {
    return this.userService.findByHome(homeId);
  }
}