import {
  IsEmail, IsOptional, IsString,
  Length, MaxLength,
} from 'class-validator';

export class RegisterDto {
  @Length(6, 60)
  @IsEmail()
  email: string;

  @Length(6, 64)
  @IsString()
  password: string;

  @MaxLength(30)
  @IsString()
  @IsOptional()
  nick: string;
}
