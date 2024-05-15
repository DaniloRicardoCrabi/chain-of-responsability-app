import { Module } from '@nestjs/common';
import { ConsultsController } from './consults.controller';
import { ConsultsService } from './consults.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Consult, ConsultSchema } from './schemas/consult.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Consult.name,
        schema: ConsultSchema,
      },
    ]),
  ],
  controllers: [ConsultsController],
  providers: [ConsultsService],
})
export class ConsultsModule {}
