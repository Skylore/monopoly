import {
  Controller, Post, Request,
  UseGuards,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Player } from './player.entity';
import { PlayerService } from './player.service';
import { JwtAuthGuard } from '../user/guard/jwt-auth.guard';

@Crud({
  model: {
    type: Player,
  },
})
@Controller('player')
export class PlayerController implements CrudController<Player> {
  constructor(public service: PlayerService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/move')
  async move(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    @Request() req,
  ): Promise<void> {
    await this.service.move(req.user.id);
  }
}
