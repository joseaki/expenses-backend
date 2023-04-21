import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IAccount } from '../interfaces/account.interface';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account implements IAccount {
  @Prop({ required: true })
  uuid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  initialValue: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  userId: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
