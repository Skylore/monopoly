import { Controller, Get, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { CheckoutDto } from './dto/checkout.dto';
import { CheckoutAnswerDto } from './dto/checkout-answer.dto';
import { BuyDto } from './dto/buy.dto';
import { BuildDto } from './dto/build.dto';
import { DepositDto } from './dto/deposit.dto';

@Crud({
  model: {
    type: Card,
  },
})
@Controller('cards')
export class CardController implements CrudController<Card> {
  constructor(public service: CardService) {}

  @Get('/checkout')
  async checkout(checkout: CheckoutDto): Promise<CheckoutAnswerDto> {
    console.log(checkout);

    return null;
  }

  @Get('/buy')
  async buy(buy: BuyDto): Promise<Card> {
    console.log(buy);

    return null;
  }

  @Post('/build')
  async build(build: BuildDto): Promise<Card> {
    console.log(build);

    return null;
  }

  @Post('/deposit')
  async deposit(deposit: DepositDto): Promise<Card> {
    console.log(deposit);

    return null;
  }
}
