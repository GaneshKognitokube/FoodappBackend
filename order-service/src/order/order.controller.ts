import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { createOrderDto } from 'src/dto/createorder.dto';
import { Request, Response } from 'express'

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService){}

    @Post('createorder')
    async getOrder(@Req() requst: Request, @Res() response: Response)
    {
        response.send(await this.orderService.createTodaysOrders())
    }

    @Post('hello')
    helloworld(@Req() requst: Request, @Res() response: Response)
    {
        response.send("Hello World")
    }

}
