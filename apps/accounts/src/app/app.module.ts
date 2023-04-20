import { Module } from '@nestjs/common';

import { AccountsModule } from '../accounts/accounts.module';
import { MongoDatabaseProviderModule } from '../config/database/mongo/configurationProvider.module';

@Module({
  imports: [AccountsModule, MongoDatabaseProviderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
