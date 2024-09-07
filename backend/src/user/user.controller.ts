import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find-all')
  async findAll() {
    return this.userService.findAll();
  }

  @Get('find-by-home/:street_address')
  async findByHome(@Param('street_address') street_address: string) {
    street_address = street_address.trim();
    if (!street_address)
      throw new BadRequestException('Street name is required.');
    return this.userService.findByHome(street_address);
  }
}
