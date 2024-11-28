import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { subscription_management, SubscriptionManagementSchema } from '../schemas/subscription_management.schema';
import { meal_plan, mealPlanSchema } from 'src/schemas/meal_plan.schema';
import { createBoxSchema, BoxSchema } from 'src/schemas/box.schema';
import { Getplanes, GetplanesSchema } from 'src/schemas/getplanes.schema';
import { Userplanes, UserplanesSchema } from 'src/schemas/userplanes.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: subscription_management.name, schema: SubscriptionManagementSchema}, {name: meal_plan.name, schema: mealPlanSchema}, {name: BoxSchema.name, schema: createBoxSchema}, {name: Getplanes.name, schema: GetplanesSchema}, {name: Userplanes.name, schema: UserplanesSchema}])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
