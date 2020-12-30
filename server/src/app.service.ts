import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInitial(): string {
    return 'Initial page';
  }
}
