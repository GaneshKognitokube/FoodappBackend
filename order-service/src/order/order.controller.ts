import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { createOrderDto } from 'src/dto/createorder.dto';
import { Request, Response } from 'express'
import { cancelOrderDto } from 'src/dto/cancelorder.dto';

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService){}

    @Get('createorder')
    async getOrder(@Req() requst: Request, @Res() response: Response)
    {
        response.json(await this.orderService.createTodaysOrders())
    }

    @Post('cancelorder')
    async cancelorer(@Req() req: Request, @Res() res: Response, @Body() canceloder: cancelOrderDto)
    {
        res.json(await this.orderService.cancilOrder(canceloder.userId, canceloder.date, canceloder.cmeal))
    }

    @Post('hello')
    helloworld(@Req() requst: Request, @Res() response: Response)
    {
        response.send("Hello World")
    }

}
