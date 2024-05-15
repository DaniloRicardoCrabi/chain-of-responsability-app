import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, Model } from 'mongoose';
import { Consult } from './schemas/consult.schema';
import { Outbox } from 'src/outbox/schemas/outbox.schema';

@Injectable()
export class ConsultsService {
  private readonly logger = new Logger(ConsultsService.name);

  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
    @InjectModel(Consult.name) private readonly consultModel: Model<Consult>,
    @InjectModel(Outbox.name) private readonly outBoxModel: Model<Outbox>,
  ) {}

  async create(consultRequestDto: any): Promise<any> {
    this.logger.log('Call create');
    const session = await this.connection.startSession();
    this.logger.log('Starting transaction');
    session.startTransaction();
    try {
      const consult = new this.consultModel(consultRequestDto);

      const outbox = new this.outBoxModel({
        cars: consultRequestDto.cars,
        document: consultRequestDto.document,
      });

      await consult.save({ session });
      await outbox.save({ session });

    // throw new Error();
      this.logger.log('Transaction not committed');
      await session.commitTransaction();
      this.logger.log('Transaction committed');

      return consult;
    } catch (error) {
      this.logger.error('Erro');
      await session.abortTransaction();
      throw error;
    } finally {
      this.logger.log('End session');
      await session.endSession();
    }
  }
}
