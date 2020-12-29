import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Session } from './session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { StartSessionDto } from './dto/start-session.dto';
import { JoinDto } from './dto/join.dto';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/player.entity';

@Injectable()
export class SessionService extends TypeOrmCrudService<Session> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @InjectRepository(Session) private repository: Repository<Session>,
    private readonly playerService: PlayerService,
    private readonly jwtService: JwtService,
  ) {
    super(repository);
  }

  async createSession(
    createSession: CreateSessionDto, user: { id: number, nick: string },
  ): Promise<Session> {
    const session = new Session();
    session.name = createSession.name;
    session.hostId = user.id;
    session.pid = 'jht57j';

    return this.repository.save(session);
  }

  async joinSession(
    join: JoinDto, user: { id: number, nick: string },
  ): Promise<string> {
    const session = await this.findOne(
      { id: join.sessionId },
      { relations: ['players'] },
    );

    if (!session.isActive) {
      throw new BadRequestException('Session is closed');
    }

    const playerInSession = session.players?.find((p) => p?.userId === user.id);
    if (playerInSession) {
      return this.jwtService.sign({
        id: playerInSession.id,
        nick: playerInSession.nick,
        sessionId: session.id,
      });
    }

    let player = new Player();
    player.sessionId = session.id;
    player.nick = user.nick;
    player.userId = user.id;

    player = await this.playerService.save(player);

    return this.jwtService.sign({
      id: player.id,
      nick: player.nick,
      sessionId: session.id,
    });
  }

  async startSession(startSession: StartSessionDto): Promise<void> {
    await this.repository.update(startSession, { isActive: true });
  }
}
