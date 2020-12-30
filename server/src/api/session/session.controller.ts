import {
  Body, Controller, Post,
  Res, HttpStatus, UseGuards, Request,
} from '@nestjs/common';
import {
  Crud, CrudController,
} from '@nestjsx/crud';
import { Session } from './session.entity';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { JwtAuthGuard } from '../user/guard/jwt-auth.guard';
import { StartSessionDto } from './dto/start-session.dto';
import { JoinDto } from './dto/join.dto';

@Crud({
  model: {
    type: Session,
  },
})
@Controller('session')
export class SessionController implements CrudController<Session> {
  constructor(public service: SessionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createSession(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Request() req,
      @Body() createSession: CreateSessionDto,
  ): Promise<Session> {
    return this.service.createSession(createSession, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/join')
  async joinSession(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Request() req,
      @Body() join: JoinDto,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      @Res() res,
  ): Promise<{ sessionJwt: string }> {
    return res
      .status(HttpStatus.OK)
      .json({ sessionJwt: await this.service.joinSession(join, req.user) });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/start')
  async startSession(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Res() res,
      @Body() startSession: StartSessionDto,
  ): Promise<void> {
    await this.service.startSession(startSession);
    return res.status(HttpStatus.OK).json({ result: 'ok' });
  }
}
