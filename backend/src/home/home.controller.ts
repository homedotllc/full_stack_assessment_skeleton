import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { UpdateHomeDto } from './dto/update-home.dto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('find-by-user/:username')
  async findByUser(@Param('username') username: string) {
    if (!username) throw new BadRequestException('User name is required.');
    return this.homeService.findByUser(username);
  }

  @Patch('update-user/:street_address')
  updateUsersToHome(
    @Param('street_address') street_address: string,
    @Body() updateHomeDto: UpdateHomeDto,
  ) {
    const { usernames } = updateHomeDto;
    street_address = street_address.trim();

    if (!usernames?.length || !street_address)
      throw new BadRequestException(
        'Street Address or usernames are required.',
      );
    return this.homeService.updateUsersToHome(street_address, updateHomeDto);
  }
}
