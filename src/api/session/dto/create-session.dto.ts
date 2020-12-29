import { IsString, MaxLength } from 'class-validator';

export class CreateSessionDto {
  @MaxLength(30)
  @IsString()
  name: string;
}
