import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { AnalyticsModule } from './analytics/analytics.module';
import { ApolloServer } from '@apollo/server';
import {
  ApolloServerPluginLandingPageLocalDefault,
} from '@apollo/server/plugin/landingPage/default'
import { CustomerSchema } from './models/customer.model';
import { OrderSchema } from './models/order.model';
import { ProductSchmea } from './models/product.model';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://127.0.0.1:27017",{
      dbName:"graphql-analytics"
    }),
    MongooseModule.forFeature([
      {name:"customer",schema:CustomerSchema},
      {name:"order",schema:OrderSchema},
      {name:"product",schema:ProductSchmea}
    ]),
    GraphQLModule.forRoot({
      driver:ApolloDriver,
      playground:false,
      autoSchemaFile:join(process.cwd(),"src/schema.gql"),
      plugins:[ApolloServerPluginLandingPageLocalDefault()],

    }
    ),
    CacheModule.registerAsync({
      isGlobal:true,
      useFactory: async () => ({
        store: redisStore,
        host: 'localhost',
        port: 6379,
        ttl: 60, // seconds
      }),
    }),
    AnalyticsModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [CacheModule]
})
export class AppModule {}
