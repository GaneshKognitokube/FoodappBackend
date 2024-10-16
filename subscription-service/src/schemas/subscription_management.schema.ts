import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

function formatDate(date: Date): string 
{
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

@Schema()
export class subscription_management
{
    @Prop({required: true})
    user_id: string;

    @Prop({required: false, type: String, default: formatDate(new Date())})
    start_date_of_subscription: string;

    @Prop({required: true})
    end_date_of_subscription: string;

    @Prop({required: true})
    meal_start_date: string;

    @Prop({required: true})
    meal_id: string;

    @Prop({required: true})
    subscription_status: number;
}

export const SubscriptionManagementSchema = SchemaFactory.createForClass(subscription_management);