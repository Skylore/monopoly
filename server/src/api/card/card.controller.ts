import {
  Body,
  Controller, Get, Post, Request, UseGuards,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { CheckoutDto } from './dto/checkout.dto';
import { CheckoutAnswerDto } from './dto/checkout-answer.dto';
import { BuyDto } from './dto/buy.dto';
import { BuildDto } from './dto/build.dto';
import { DepositDto } from './dto/deposit.dto';
import { JwtAuthGuard } from '../user/guard/jwt-auth.guard';

@Crud({
  model: {
    type: Card,
  },
})
@Controller('card')
export class CardController implements CrudController<Card> {
  constructor(public service: CardService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/checkout')
  async checkout(checkout: CheckoutDto): Promise<CheckoutAnswerDto> {
    console.log(checkout);

    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/buy')
  async buy(
    @Request() req,
      @Body() buy: BuyDto,
  ): Promise<Card> {
    return this.service.buy(buy, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/build')
  async build(build: BuildDto): Promise<Card> {
    console.log(build);

    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/deposit')
  async deposit(deposit: DepositDto): Promise<Card> {
    console.log(deposit);

    return null;
  }
}
