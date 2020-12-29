import { IsString, Length } from 'class-validator';

export class StartSessionDto {
  @IsString()
  @Length(6, 6)
  pid: string;
}
