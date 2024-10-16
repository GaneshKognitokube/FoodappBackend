import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class createMealPlanDto
{
    @IsNotEmpty()
    @IsString()
    meal_id: string;

    @IsNotEmpty()
    @IsNumber()
    total_no_of_meals: number;

    @IsNotEmpty()
    @IsNumber()
    remainig_meals: number;

    @IsNotEmpty()
    @IsString()
    meal_start_date: string;

    @IsNotEmpty()
    @IsString()
    meal_end_date: string;


    @IsNotEmpty()
    @IsString()
    meal_type: string;

    @IsNotEmpty()
    @IsObject()
    meal_cycle: object;

    @IsNotEmpty()
    @IsNumber()
    plan_status: number;
}