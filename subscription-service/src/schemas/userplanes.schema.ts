import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { map } from "rxjs";

@Schema()
export class Userplanes
{
    @Prop({required: true})
    planid: string;

    @Prop({required: true})
    userid: string;
}

export const UserplanesSchema = SchemaFactory.createForClass(Userplanes);