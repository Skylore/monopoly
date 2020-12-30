import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  private static saltRounds = 10;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    super(repository);
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async register(register: RegisterDto): Promise<{ jwt: string }> {
    const { email, password, nick } = register;

    const olUser = await this.findOne({ nick });

    if (olUser) {
      throw new BadRequestException('nick already exists');
    }

    let user = new User();
    user.email = email;
    user.password = await UserService.getHash(password);
    user.nick = nick;

    user = await this.save(user);
    const jwt = await this.jwtService.sign({ id: user.id, nick });

    return { jwt };
  }

  async login(login: LoginDto): Promise<{ jwt: string }> {
    const { nick, password } = login;

    const user = await this.findOne({ nick });

    if (!user) {
      throw new BadRequestException(`${nick} user not exists`);
    }

    const matchPassword = await this.compareHash(password, user.password);

    if (!matchPassword) {
      throw new BadRequestException('Invalid password');
    }

    return {
      jwt: await this.jwtService.sign({ id: user.id, nick }),
    };
  }

  static async getHash(password: string): Promise<string> {
    return bcrypt.hash(password, UserService.saltRounds);
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
