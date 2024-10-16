import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createNewSubscriptionDto {

    @IsNotEmpty()
    @IsString()
    user_id: String;

    @IsNotEmpty()
    @IsString()
    end_date_of_subscription: string;

    @IsNotEmpty()
    @IsString()
    meal_id: string;

    @IsNotEmpty()
    @IsNumber()
    subscription_status: number;
}