import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, MongooseModule.forRoot('mongodb+srv://ganeshdittakavi:4WdkVMzl0BmyKHbC@foodapp.afxja.mongodb.net/FoodApp')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
