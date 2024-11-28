import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class createlanDto
{
    @IsString()
    @IsNotEmpty()
    planid: string;

    @IsNotEmpty()
    @IsString()
    planname: string;

    @IsNotEmpty()
    @IsString()
    numberofmeals: string;

    @IsNotEmpty()
    @IsString()
    mealtype: string;

    @IsString()
    @IsNotEmpty()
    aumont: string;
}