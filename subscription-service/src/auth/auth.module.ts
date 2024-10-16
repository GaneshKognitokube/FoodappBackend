import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { subscription_management, SubscriptionManagementSchema } from '../schemas/subscription_management.schema';
import { meal_plan, mealPlanSchema } from 'src/schemas/meal_plan.schema';
import { createBoxSchema, BoxSchema } from 'src/schemas/box.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: subscription_management.name, schema: SubscriptionManagementSchema}, {name: meal_plan.name, schema: mealPlanSchema}, {name: BoxSchema.name, schema: createBoxSchema}])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
