import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { map } from "rxjs";

@Schema()
export class Getplanes
{
    @Prop({required: true, unique: true})
    planid: string;

    @Prop({required: true})
    planname: string;

    @Prop({required: true})
    numberofmeals: string;

    @Prop({required: true})
    mealtype: string;

    @Prop({required: true})
    aumont: string;
}

export const GetplanesSchema = SchemaFactory.createForClass(Getplanes);