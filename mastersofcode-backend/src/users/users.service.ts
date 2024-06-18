import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcryptjs';
import { UpdatePointsDto } from './dto/update.points.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPassword });
    return newUser.save();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
  async updatePoints(updatePointsDto: UpdatePointsDto): Promise<User> {
    const { email, points } = updatePointsDto;
    const user = await this.userModel.findOne({ email });

    if (user) {
      user.points += points;
      return user.save();
    } else {
      throw new Error('User not found');
    }
  }

  async getRankings(): Promise<User[]> {
    return this.userModel.find().sort({ points: -1 }).exec();
  }
}
