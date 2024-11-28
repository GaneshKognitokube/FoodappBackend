import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { subscription_management } from '../schemas/subscription_management.schema';
import { Model } from 'mongoose';
import { createNewSubscriptionDto } from './dto/createNewSubscription.dto';
import { createMealPlanDto } from './dto/createMealPlan.dto';
import { meal_plan } from 'src/schemas/meal_plan.schema';
import { BoxSchema } from 'src/schemas/box.schema';
import { Mode } from 'fs';
import { createBoxPlanDto } from './dto/crateBoxPlan.dto';
import * as moment from 'moment';
import { Getplanes } from 'src/schemas/getplanes.schema';
import { createlanDto } from './dto/createplane.dto';
import { Userplanes } from 'src/schemas/userplanes.schema';
import { UserplaneDto } from './dto/userplane.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(subscription_management.name)
    private subscriptionManagementModel: Model<subscription_management>,
    @InjectModel(meal_plan.name) private createmeal: Model<meal_plan>,
    @InjectModel(BoxSchema.name) private boxModel: Model<BoxSchema>,
    @InjectModel(Getplanes.name) private createplan: Model<Getplanes>,
    @InjectModel(Userplanes.name) private createuserplan: Model<Userplanes>,
  ) {}

  async createNewSubscription(
    subscriptionDto: createNewSubscriptionDto,
    mealplandto: createMealPlanDto,
  ) {
    const session = await this.subscriptionManagementModel.db.startSession();
    session.startTransaction();
    try {
      const createsub = new this.subscriptionManagementModel(subscriptionDto);
      await createsub.save({ session });
      const createnewmeal = new this.createmeal(mealplandto);
      await createnewmeal.save({ session });
      await session.commitTransaction();
      return { message: 'Successfully Inserted' };
    } catch (e) {
      await session.abortTransaction();
      return { message: 'error Occured', error: e };
    } finally {
      await session.endSession();
    }
  }

  async createNewBoxPlane(createBoxPlanDto: createBoxPlanDto) {
    try {
      const createBox = new this.boxModel(createBoxPlanDto);
      await createBox.save();
      return { message: 'Successfully Inserted' };
    } catch (e) {
      return { message: 'error Occured', error: e };
    }
  }

  async updateCompletedSubscriptionStatus() {
    const needToUpdate = await this.subscriptionManagementModel
      .find({ subscription_status: 1 })
      .select('user_id end_date_of_subscription')
      .lean()
      .exec();
    const today = moment();
    var inactive = 0;
    const updation = needToUpdate.map(async (obj) => {
      const endDate = moment(obj.end_date_of_subscription, 'DD-MM-YYYY');

      if (endDate.isBefore(today, 'day')) {
        console.log(`Subscription for user ${obj.user_id} has expired.`);
        try {
            await this.subscriptionManagementModel.findOneAndUpdate(
              { user_id: obj.user_id },
              { $set: { subscription_status: 0 } },
              { new: true }
            );
        //   console.log(result);
            inactive += 1;
            console.log(inactive)
        } catch (error) {
          return { message: error };
        }
      } 
    });
    await Promise.all(updation)
    const subscriptionCounts = await this.subscriptionManagementModel.aggregate([
        {
          $match: {
            subscription_status: { $in: [0, 1] },
          }
        },
        {
          $group: {
            _id: "$subscription_status", 
            count: { $sum: 1 }
          }
        }
    ]);
    // console.log(subscriptionCounts)

    return { message: 'Successfully update', inactiveToday:inactive, totalInative: subscriptionCounts[0].count, totalActive:  subscriptionCounts[1].count};
  }

  async getallplans()
  {
    const result = await this.createmeal.find({}).lean().exec();
    return result;
  }

  async createplanes(plandto: createlanDto)
  {
    try {
      const createplane = new this.createplan(plandto);
      const result = await createplane.save();
      return result;
    }
    catch(error) {
      return error;
    }
  }

  async getplanes()
  {
    const result = await this.createplan.find({}).lean().exec();
    return result;
  }

  async createuserplanes(plandto: UserplaneDto)
  {
    try {
      const createplane = new this.createuserplan(plandto);
      const result = await createplane.save();
      return result;
    }
    catch(error) {
      return error;
    }
  }

  async getuserplanes(userid: any)
  {
    try {
      const planeids = await this.createuserplan.find({ userid: userid.userid }).lean().exec();
      const result = await Promise.all(
        planeids.map(async (items) => {
          return this.createplan.find({ planid: items.planid }).lean().exec();
        })
      );
      return result.flat();
    } catch (error) {
      console.error('Error fetching user planes:', error);
      throw new Error('Failed to fetch user planes');
    }
  }
  

  // async upadteSubscripitonStatus()
  // {
  //     const needToupdate =

  // }

  // async updateMealPlanStatus()
  // {

  // }

  // async updateBoxPlaneStatus()
  // {

  // }

  // async updateNumberofMeals()
  // {

  // }
}
