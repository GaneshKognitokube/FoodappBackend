import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class UserplaneDto
{
    @IsString()
    @IsNotEmpty()
    planid: string;

    @IsNotEmpty()
    @IsString()
    userid: string;
}