import { Body, Controller, Get, Patch, Post, Put, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createNewSubscriptionDto } from './dto/createNewSubscription.dto';
import { createMealPlanDto } from './dto/createMealPlan.dto';
import { Request, Response } from 'express';
import { createBoxPlanDto } from './dto/crateBoxPlan.dto';
import { createlanDto } from './dto/createplane.dto';
import { UserplaneDto } from './dto/userplane.dto';

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

    @Patch('updateSubscriptionStatus')
    async updateSubstatus(@Res() res: Response)
    {
        const result = await this.AuthService.updateCompletedSubscriptionStatus();
        res.json(result);
    }

    @Post('createplane')
    async createplane(@Res() res: Response, @Body() data: createlanDto)
    {
        const result = await this.AuthService.createplanes(data);
        res.json(result);
    }

    @Get('getplane')
    async Getplane(@Res() res: Response)
    {
        const result = await this.AuthService.getplanes();
        res.json(result);
    }

    @Post('createuserplane')
    async createuserplane(@Res() res: Response, @Body() data: UserplaneDto)
    {
        const result = await this.AuthService.createuserplanes(data);
        res.json(result);
    }

    @Post('getuserplanes')
    async getuserplanes(@Res() res: Response, @Body() userid: any)
    {
        const result = await this.AuthService.getuserplanes(userid);
        res.json(result);
    }
}
