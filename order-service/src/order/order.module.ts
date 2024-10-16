import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { createOrderScheme, orders_schema } from 'src/schemas/orders.schemas';
import { BoxSchema, createBoxSchema, meal_plan, mealPlanSchema, subscription_management, SubscriptionManagementSchema } from 'src/schemas/gettingOrders.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: orders_schema.name, schema: createOrderScheme}, {name: subscription_management.name, schema: SubscriptionManagementSchema}, {name: meal_plan.name, schema: mealPlanSchema}, {name: BoxSchema.name, schema: createBoxSchema}])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
