import { Controller, Get, Query, Put, Body, UsePipes } from '@nestjs/common';
import { HomeService } from './home.service';
import { UpdateUsersDto } from './dto/update-users.dto';
import { FindByUserDto } from './dto/find-by-user.dto';
import { ValidationPipe } from '@nestjs/common';

@Controller('home')
@UsePipes(new ValidationPipe({ transform: true }))
export class HomeController {
  constructor(private readonly homeService: HomeService) {}


  @Get('find-by-user')
  findByUser(@Query() query: FindByUserDto) {
    return this.homeService.findByUser(query.userId, query.page);
  }

  @Put('update-users')
  updateUsers(@Body() updateUsersDto: UpdateUsersDto) {
    return this.homeService.updateUsers(updateUsersDto.homeId, updateUsersDto.userIds);
  }
}
