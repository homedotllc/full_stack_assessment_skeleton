import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { HomesService } from './homes.service';

@Controller('home')
export class HomesController {
  constructor(private readonly homesService: HomesService) {}

  @Get('find-by-user/:userId')
  async findUsersByHome(@Param('userId') userId: number) {
    return this.homesService.findByUser(Number(userId));
  }

  @Put('update-users/:homeId')
  async updateUsers(
    @Body() body: number[], // Directly get the array from the body
    @Param('homeId') homeId: number,
  ) {
    return this.homesService.updateUsers(homeId, body);
  }
}
