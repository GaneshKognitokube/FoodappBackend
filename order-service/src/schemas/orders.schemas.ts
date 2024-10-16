import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { map } from "rxjs";

@Schema()
export class orders_schema
{
    @Prop({required: true})   
    userId: string;

    @Prop({required: true})
    mealId: string;

    @Prop({required: true, type: map, of: Object})
    morning: Record<any, any>;

    @Prop({required: true, type: map, of: Object})
    noon: Record<any, any>;

    @Prop({required: true, type: map, of: Object})
    night: Record<any, any>;

    @Prop({required: false, type: String, default: "pending"})
    status: string;

    @Prop({required: true})
    date: string;

    @Prop({required: true})
    type: string;
}

export const createOrderScheme = SchemaFactory.createForClass(orders_schema);