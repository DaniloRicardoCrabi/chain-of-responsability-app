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
      .watch([
        {
          $match: {
            operationType: 'insert',
            'fullDocument.sentToQueue': false,
            'ns.coll': 'OutBox',
          },
        },
      ])
      .on('change', async (event) => {
        this.logger.log(
          '#### Evento rolou ####' + JSON.stringify(event.fullDocument),
        );
        // const { fullDocument } = event;
        // await this._handleEvent(fullDocument);
      });
  }
}
