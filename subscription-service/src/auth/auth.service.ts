import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { subscription_management } from '../schemas/subscription_management.schema';
import { Model } from 'mongoose';
import { createNewSubscriptionDto } from './dto/createNewSubscription.dto';
import { createMealPlanDto } from './dto/createMealPlan.dto';
import { meal_plan } from 'src/schemas/meal_plan.schema';
import { BoxSchema } from 'src/schemas/box.schema';
import { Mode } from 'fs';
import { createBoxPlanDto } from './dto/crateBoxPlan.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(subscription_management.name) private subscriptionManagementModel: Model<subscription_management>, @InjectModel(meal_plan.name) private createmeal: Model<meal_plan>, @InjectModel(BoxSchema.name) private boxModel: Model<BoxSchema>){}

    async createNewSubscription(subscriptionDto: createNewSubscriptionDto, mealplandto: createMealPlanDto) {
        const session = await this.subscriptionManagementModel.db.startSession();
        session.startTransaction();
        try
        {
            const createsub = new this.subscriptionManagementModel(subscriptionDto);
            await createsub.save({session});
            const createnewmeal = new this.createmeal(mealplandto);
            await createnewmeal.save({session});
            await session.commitTransaction();
            return {message: "Successfully Inserted"};
        }
        catch (e)
        {
            await session.abortTransaction();
            return {message: "error Occured", error: e};
        }
        finally
        {
            await session.endSession();
        }

    }

    async createNewBoxPlane(createBoxPlanDto: createBoxPlanDto) {
        
        try
        {
            const createBox = new this.boxModel(createBoxPlanDto);
            await createBox.save();
            return {message: "Successfully Inserted"};
        }
        catch (e)
        {
            return {message: "error Occured", error: e};
        }
    }

    // async upadteSubscripitonStatus()
    // {
    //     const needToupdate = 

    // }

    // async updateMealPlanStatus()
    // {

    // }

    // async updateBoxPlaneStatus()
    // {

    // }

    // async updateNumberofMeals()
    // {

    // }

}
