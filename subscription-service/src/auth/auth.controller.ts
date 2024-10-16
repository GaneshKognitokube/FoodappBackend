import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createNewSubscriptionDto } from './dto/createNewSubscription.dto';
import { createMealPlanDto } from './dto/createMealPlan.dto';
import { Request, Response } from 'express';
import { createBoxPlanDto } from './dto/crateBoxPlan.dto';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService){}

    @Post()
    async createnewsub(@Body() createNewSubscriptionDto: createNewSubscriptionDto, @Body() createMealPlanDto: createMealPlanDto, @Req() req: Request, @Res() res: Response)
    {
        const result = await this.AuthService.createNewSubscription(createNewSubscriptionDto, createMealPlanDto);
        if(result.message === "Successfully Inserted")
        {
            return res.status(201).json({
                status: "Success",
                message: "Subscription successfull"
            });
        }
        return res.status(500).json({
            status: "Internal error",
            message: "Subscription Failed",
            error: result.error
        });
    }

    @Post('createBox')
    async createBoxPlane(@Body() createBoxPlanDto: createBoxPlanDto, @Req() req: Request, @Res() res: Response)
    {
        const result = await this.AuthService.createNewBoxPlane(createBoxPlanDto);
        if(result.message === "Successfully Inserted")
        {
            return res.status(201).json({
                status: "Success",
                message: "Subscription successfull"
            });
        }
        return res.status(500).json({
            status: "Internal error",
            message: "Subscription Failed",
            error: result.error
        });
    }
}
