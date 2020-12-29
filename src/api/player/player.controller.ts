import { Controller, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Player } from './player.entity';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { MoveDto } from './dto/move.dto';

@Crud({
  model: {
    type: Player,
  },
})
@Controller('players')
export class PlayerController implements CrudController<Player> {
  constructor(public service: PlayerService) {}

  @Post('/create')
  async createPlayer(createPlayer: CreatePlayerDto): Promise<Player> {
    console.log(createPlayer);

    return null;
  }

  @Post('/move')
  async move(move: MoveDto): Promise<void> {
    console.log(move);
  }
}
