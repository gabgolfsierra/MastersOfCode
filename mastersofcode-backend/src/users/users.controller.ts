import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './users.service';
import { UpdatePointsDto } from './dto/update.points.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('addPoints')
  async addPoints(@Body() updatePointsDto: UpdatePointsDto) {
    return this.userService.updatePoints(updatePointsDto);
  }

  @Get('rankings')
  async getRankings() {
    return this.userService.getRankings();
  }
}
