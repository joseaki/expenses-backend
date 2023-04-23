import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Account, AccountSchema } from './schemas/account.schema';
import { AccountRepository } from './repository/account.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{ name: 'AUTH_SERVICE', transport: Transport.TCP, options: { port: 9002 } }]),
    ClientsModule.register([{ name: 'TRANSACTION_SERVICE', transport: Transport.TCP, options: { port: 9001 } }]),
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService, AccountRepository],
})
export class AccountsModule {}
