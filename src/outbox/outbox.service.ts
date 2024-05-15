import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Outbox } from './schemas/outbox.schema';
import { Model } from 'mongoose';

@Injectable()
export class OutboxService {
  private readonly logger = new Logger(OutboxService.name);

  constructor(
    @InjectModel(Outbox.name) private readonly outBoxModel: Model<Outbox>,
  ) {
    this._registerEventListener();
  }

  private async _registerEventListener() {
    this.outBoxModel
      .watch(
        [
          {
            $match: {
              operationType: 'insert',
              'fullDocument.sentToQueue': false,
              'ns.coll': 'OutBox',
            },
          },
        ],
        { readPreference: 'primary' },
      )
      .on('change', async (event) => {
        this.logger.log(
          '#### Evento rolou ####' + JSON.stringify(event.fullDocument),
        );
        const { fullDocument } = event;
        await this._handleEvent(fullDocument);
      });
  }

  private async _handleEvent(event: any) {
    try {
      // await this.eventPublisher.publish(event.type, event);
      this.logger.log(`Published event ${JSON.stringify(event, null, 2)}`);

      const updated = await this.outBoxModel.updateOne(
        {
          id: event.id,
        },
        {
          $set: {
            sentToQueu: true,
          },
        },
      );

      this.logger.log(`Updated ${JSON.stringify(updated, null, 2)}`);
    } catch (error) {
      throw error;
    }
  }

  public async sendOutStandingEvents() {
    const events = await this.outBoxModel.find({
      sentToQueue: false,
    });

    for (const event of events) {
      await this._handleEvent(event);
    }
  }
}
