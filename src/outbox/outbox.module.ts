import { Global, Module } from '@nestjs/common';
import { OutboxService } from './outbox.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Outbox, OutboxSchema } from './schemas/outbox.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Outbox.name,
        schema: OutboxSchema,
      },
    ]),
  ],
  providers: [OutboxService],
  exports: [MongooseModule],
})
export class OutboxModule {}
