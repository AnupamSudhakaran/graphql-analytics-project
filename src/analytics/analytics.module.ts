import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsResolver } from './analytics.resolver';
import { AnalyticsController } from './analytics.controller';
import { Mongoose } from 'mongoose';
import { CustomerSchema } from 'src/models/customer.model';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/models/order.model';
import { ProductSchmea } from 'src/models/product.model';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:"customer",schema:CustomerSchema},
      {name:"order",schema:OrderSchema},
      {name:"product",schema:ProductSchmea}
  ])],
  providers: [AnalyticsService,AnalyticsResolver],
  controllers: [AnalyticsController]
})
export class AnalyticsModule {}
