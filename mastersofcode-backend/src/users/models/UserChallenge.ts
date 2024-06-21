import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ versionKey: false })
export class UserChallenge extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Challenge' })
  challengeId: MongooseSchema.Types.ObjectId;

  @Prop({ default: false })
  completed: boolean;
}

export const UserChallengeSchema = SchemaFactory.createForClass(UserChallenge);
