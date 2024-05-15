import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'Consults',
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})
export class Consult extends Document {
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

export const ConsultSchema = SchemaFactory.createForClass(Consult);
