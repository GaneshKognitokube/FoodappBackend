import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class subscription_management
{

}

@Schema()
export class meal_plan
{

}

@Schema()
export class BoxSchema
{
 
}



export const SubscriptionManagementSchema = SchemaFactory.createForClass(subscription_management);
export const mealPlanSchema = SchemaFactory.createForClass(meal_plan);
export const createBoxSchema = SchemaFactory.createForClass(BoxSchema);