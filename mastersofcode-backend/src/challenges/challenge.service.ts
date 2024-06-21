import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Challenge } from './challenge.model';
import { UserChallenge } from 'src/users/models/UserChallenge';
import { User } from 'src/users/user.schema';


@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Challenge.name) private challengeModel: Model<Challenge>,
    @InjectModel(UserChallenge.name) private userChallengeModel: Model<UserChallenge>,
  ) {}

  async completeChallenge(userId: string, challengeId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    const challenge = await this.challengeModel.findById(challengeId);

    if (!user || !challenge) {
      throw new NotFoundException('User or Challenge not found');
    }

    const userChallenge = await this.userChallengeModel.findOne({
      userId: user._id,
      challengeId: challenge._id,
    });

    if (!userChallenge || userChallenge.completed) {
      throw new NotFoundException('Challenge already completed or not assigned to user');
    }

    // Mark the challenge as completed
    userChallenge.completed = true;
    await userChallenge.save();

    // Add points to the user
    user.points += challenge.points;
    await user.save();

    return user;
  }
}
