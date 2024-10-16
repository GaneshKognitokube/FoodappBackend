import { Schema, Prop,  SchemaFactory} from "@nestjs/mongoose";

@Schema()
export class meal_plan
{
    @Prop({required: true, unique: true})
    meal_id: string;

    @Prop({required: true})
    total_no_of_meals: number;

    @Prop({required: true})
    remainig_meals: number;

    @Prop({required: true})
    meal_type: string;

    @Prop({required: true})
    meal_start_date: string;

    @Prop({required: true})
    meal_end_date: string;

    @Prop({required: true, type: Map, of: [String]})
    meal_cycle: Record<string, string[]>;

    @Prop({required: true})
    plan_status: number;
}

export const mealPlanSchema = SchemaFactory.createForClass(meal_plan);