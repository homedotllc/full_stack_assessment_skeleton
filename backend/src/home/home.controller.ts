import { Controller, Get, Query, Put, Body } from '@nestjs/common';
import { HomeService } from './home.service';


@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}


  @Get('find-all')
  async findAllHome(){

    return await this.homeService.findall();

  }

  @Get('find-by-user')
  findByUser(@Query('userId') userId: number, @Query('page') page: number) {
    return this.homeService.findByUser(userId, page);
  }

  @Put('update-users')
  updateUsers(@Body('homeId') homeId: number, @Body('userIds') userIds: number[]) {
    return this.homeService.updateUsers(homeId, userIds);
  }
}
