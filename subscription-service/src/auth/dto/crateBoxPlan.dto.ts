import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class createBoxPlanDto
{
    @IsString()
    @IsNotEmpty()
    meal_id: string;

    @IsNotEmpty()
    @IsObject()
    morning: Object;

    @IsNotEmpty()
    @IsObject()
    noon: Object;

    @IsNotEmpty()
    @IsObject()
    night: Object;

    @IsNumber()
    @IsNotEmpty()
    status_plan: number;
}