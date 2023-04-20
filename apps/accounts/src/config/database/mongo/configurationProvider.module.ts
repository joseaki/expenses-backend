import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigService } from './configuration.service';
import { MongoConfigModule } from './configuration.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useFactory: async (mongoConfigService: MongoConfigService) => ({
        uri: mongoConfigService.uri,
      }),
      inject: [MongoConfigService],
    }),
  ],
})
export class MongoDatabaseProviderModule {}
