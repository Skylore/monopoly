import {
  IsNumber,
} from 'class-validator';

export class JoinDto {
  @IsNumber()
  sessionId: number;
}
