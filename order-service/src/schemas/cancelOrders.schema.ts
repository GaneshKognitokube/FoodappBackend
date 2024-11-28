import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { map } from "rxjs";

@Schema()
export class cancelOrders
{
    @Prop({required: true})   
    userId: string;

    @Prop({required: true})
    mealId: string;

    @Prop({required: true, type: map, of: Object})
    cmeal: Record<any, any>;
    

    @Prop({required: true})
    date: string;
}

export const cancelOrdersScheme = SchemaFactory.createForClass(cancelOrders);