import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose'
import { createOrderDto } from 'src/dto/createorder.dto';
import { BoxSchema, meal_plan, subscription_management } from 'src/schemas/gettingOrders.schema';
import { orders_schema } from 'src/schemas/orders.schemas';

@Injectable()
export class OrderService {
    constructor(@InjectModel(subscription_management.name) private sub_schema_model: Model<subscription_management>, @InjectModel(meal_plan.name) private mealPlanModel: Model<meal_plan>, @InjectModel(BoxSchema.name) private boxModel: Model<BoxSchema>, @InjectModel(orders_schema.name) private orderModel: Model<orders_schema>){}

    formatDate(date: Date): string 
    {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }


    async createTodaysOrders()
    {
        let date = new Date();
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
        const active_subscriptions = await this.sub_schema_model.find({"subscription_status": 1}).select("user_id meal_id").lean().exec();
        const getTodaysDate = this.formatDate(new Date());
        const orders_updation = await this.orderModel.find({date: getTodaysDate, type: "sub"})
        console.log(orders_updation.length)
        if(orders_updation.length == 0)
        {
            if(active_subscriptions.length != 0)
            {
    
                for (const obj of active_subscriptions) {
                    const mealPlan = await this.mealPlanModel.find({"meal_id": obj['meal_id'], "plan_status": 1}).select("meal_cycle").lean().exec();
                    let temp = {}            
                    if (mealPlan.length > 0) {
                        temp = {
                            userId: obj['user_id'],
                            mealId: obj['meal_id'],
                            morning: [],
                            noon: [],
                            night: [],
                            date: getTodaysDate,
                            type: "sub"
                        };
                        const mealcycle = mealPlan[0]['meal_cycle'];
                        if (mealcycle.hasOwnProperty(getTodaysDate)) {
                            const todayMealCycle = mealcycle[getTodaysDate];
                            for (const dayobj of todayMealCycle) {
                                const boxplan = await this.boxModel.find({"meal_id": obj['meal_id'], "status_plan": 1}).select("morning noon night").lean().exec();
                                for (const objbox of boxplan) {
                                    if (objbox[dayobj]?.['boxes']?.[dayOfWeek]?.length > 0) {
                                        temp[dayobj].push(...objbox[dayobj]['boxes'][dayOfWeek]);
                                    }
                                }
                            }
                            console.log(temp);
                            const todaysOrders = new this.orderModel(temp);
                            todaysOrders.save();
                        }
                        else
                        {
                            return {message: "No Order for today"}
                        }
                    }
                    else
                    {
                        return {message: "No active meal plans"}
                    }
                }
            }
            else
            {
                return {message: "No active Subscriptions"};
            }
            return {message: "Successfully updated"};
        }
        else
        {
            return {message: "Already Updated"}
        }
    }
}
