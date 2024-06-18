import { IsEmail, IsInt, Min } from 'class-validator';

export class UpdatePointsDto {
  @IsEmail()
  email: string;

  @IsInt()
  @Min(0)
  points: number;
}
