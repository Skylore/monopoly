import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Card } from './card.entity';
import { CardService } from './card.service';

@Crud({
  model: {
    type: Card,
  },
})
@Controller('cards')
export class CardController implements CrudController<Card> {
  constructor(public service: CardService) {}
}
