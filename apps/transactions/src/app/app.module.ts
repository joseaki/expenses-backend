import { Module } from '@nestjs/common';
import { TransactionsModule } from '../transactions/transactions.module';
import { ConfigModule } from '@expenses/config';
@Module({
  imports: [TransactionsModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
