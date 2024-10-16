import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class createOrderDto
{
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    mealId: string;

    @IsObject()
    @IsNotEmpty()
    morning: Record<any, any>

    @IsObject()
    @IsNotEmpty()
    noon: Record<any, any>

    @IsObject()
    @IsNotEmpty()
    night: Record<any, any>
}