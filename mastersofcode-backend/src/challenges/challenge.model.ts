import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Challenge extends Document {
  @Prop()
  name: string;

  @Prop()
  points: number;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
