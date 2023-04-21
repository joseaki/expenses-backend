import { Module } from '@nestjs/common';
import { MongoDatabaseProviderModule } from './mongo/configurationProvider.module';

@Module({
  imports: [MongoDatabaseProviderModule],
  controllers: [],
  providers: [],
  exports: [MongoDatabaseProviderModule],
})
export class ConfigModule {}
