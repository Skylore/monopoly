import {
  IsOptional, IsString, Length,
  MaxLength,
} from 'class-validator';

export class ConnectDto {
  @MaxLength(30)
  @IsString()
  @IsOptional()
  nick: string;

  @Length(6, 64)
  @IsString()
  password: string;
}
