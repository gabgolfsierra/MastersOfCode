import { Controller, Post, Body } from '@nestjs/common';
import { ChallengeService } from './challenge.service';

@Controller('challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post('complete')
  async completeChallenge(@Body() body: { userId: string, challengeId: string }) {
    const { userId, challengeId } = body;
    const user = await this.challengeService.completeChallenge(userId, challengeId);
    return user;
  }
}
