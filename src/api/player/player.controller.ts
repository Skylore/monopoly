import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Player } from './player.entity';
import { PlayerService } from './player.service';

@Crud({
  model: {
    type: Player,
  },
})
@Controller('players')
export class PlayerController implements CrudController<Player> {
  constructor(public service: PlayerService) {}
}
