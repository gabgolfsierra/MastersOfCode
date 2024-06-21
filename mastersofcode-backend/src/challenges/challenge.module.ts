import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Challenge, ChallengeSchema } from './challenge.model';

import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { UserChallenge, UserChallengeSchema } from 'src/users/models/UserChallenge';
import { User, UserSchema } from 'src/users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Challenge.name, schema: ChallengeSchema }]),
    MongooseModule.forFeature([{ name: UserChallenge.name, schema: UserChallengeSchema }]),
  ],
  providers: [ChallengeService],
  controllers: [ChallengeController],
})
export class ChallengeModule {}
