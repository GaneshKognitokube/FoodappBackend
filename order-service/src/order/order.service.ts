import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose'
import { createOrderDto } from 'src/dto/createorder.dto';
import { cancelOrders } from 'src/schemas/cancelOrders.schema';
import { BoxSchema, meal_plan, subscription_management } from 'src/schemas/gettingOrders.schema';
import { orders_schema } from 'src/schemas/orders.schemas';

@Injectable()
export class OrderService {
    constructor(@InjectModel(subscription_management.name) private sub_schema_model: Model<subscription_management>, @InjectModel(meal_plan.name) private mealPlanModel: Model<meal_plan>, @InjectModel(BoxSchema.name) private boxModel: Model<BoxSchema>, @InjectModel(orders_schema.name) private orderModel: Model<orders_schema>, @InjectModel(cancelOrders.name) private cancelordermodel: Model<cancelOrders>){}

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
        let result: any
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
        const active_subscriptions = await this.sub_schema_model.find({"subscription_status": 1}).select("user_id meal_id").lean().exec();
        const getTodaysDate = this.formatDate(new Date());
        const orders_updation = await this.orderModel.find({date: getTodaysDate, type: "sub"})
        const canceledorders = await this.cancelordermodel.find({date: getTodaysDate})
        const cancelmealids = canceledorders.map(item => item.mealId)
        console.log(cancelmealids)
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
                            if(cancelmealids.length != 0)
                            {
                                if(cancelmealids.includes(obj['meal_id']))
                                {
                                    let index = cancelmealids.indexOf(obj['meal_id']);
                                    let times = canceledorders[index].cmeal;
                                    times.map((item: any) => {
                                        temp[item] = ["Canceled"];
                                    })
                                    // console.log(temp)
                                }
                            }
                            console.log(temp)
                            const todaysOrders = new this.orderModel(temp);
                            await todaysOrders.save();
                            result = await this.orderModel.find({date: getTodaysDate})
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
            return {message:"Successfully Updated", result};
        }
        else
        {
            let finalresult = await this.orderModel.find({date: getTodaysDate})
            return {message: "Already Updated", result: finalresult};
        }
    }

    async cancilOrder(userid: string, date: string, cmeal: any)
    {
        try
        {
            const getmealid = await this.sub_schema_model.find({"user_id": userid, "subscription_status": 1}).select("meal_id").lean().exec();
            const meal_id = getmealid[0]["meal_id"];
            const data = {userId: userid, mealId: meal_id, cmeal, date};
            const canceledorders = new this.cancelordermodel(data);
            const result = await canceledorders.save();
            return {message: "Canceled the order", result: result}
            
        }
        catch(e)
        {
            return {message: "Error while canceling", error: e};
        }
    }
}
