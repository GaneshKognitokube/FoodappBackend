import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { map } from "rxjs";

@Schema()
export class BoxSchema
{
    @Prop({required: true})
    meal_id: string;

    @Prop({required: true, type: map, of: Object})
    morning: Record<any, any>;

    @Prop({required: true, type: map, of: Object})
    noon: Record<any, any>;

    @Prop({required: true, type: map, of: Object})
    night: Record<any, any>;

    @Prop({required: true})
    status_plan: number;
}

export const createBoxSchema = SchemaFactory.createForClass(BoxSchema);