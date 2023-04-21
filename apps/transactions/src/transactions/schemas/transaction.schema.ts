import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ITransaction, PaymentMethod, TransactionType } from '../interfaces/transaction.interface';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction implements ITransaction {
  @Prop({ required: true })
  uuid: string;
  @Prop({ required: true })
  currency: string;
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true, type: String, enum: TransactionType })
  type: TransactionType;
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true })
  accountId: string;
  @Prop({ required: true })
  dateTime: Date;
  @Prop({ required: true, type: String, enum: PaymentMethod })
  paymentMethod: PaymentMethod;
  @Prop({ required: false })
  description?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
