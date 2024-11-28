import { IsArray, IsNotEmpty, IsObject, IsString } from "class-validator";

export class cancelOrderDto
{
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    date: string;

    @IsArray()
    @IsNotEmpty()
    cmeal: Object;
}