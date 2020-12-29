import {
  Body, Controller, HttpStatus, Post, Res,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Session } from '../session/session.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Crud({
  model: {
    type: User,
  },
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @Post('/register')
  async register(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Res() res,
      @Body() register: RegisterDto,
  ): Promise<{result: string}> {
    return res.status(HttpStatus.OK).json(await this.service.register(register));
  }

  @Post('/login')
  async login(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Res() res,
      @Body() login: LoginDto,
  ): Promise<Session> {
    return res.status(HttpStatus.OK).json(await this.service.login(login));
  }
}
