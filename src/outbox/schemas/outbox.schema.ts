import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'OutBox',
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Outbox extends Document {
  @Prop({
    required: true,
    default: false,
  })
  sentToQueue: boolean;

  @Prop({
    required: false,
  })
  document: string;

  @Prop({
    required: false,
  })
  cars: string[];

  createdAt: Date;
  updatedAt: Date;
}

export const OutboxSchema = SchemaFactory.createForClass(Outbox);
