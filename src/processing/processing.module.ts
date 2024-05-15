import { Module } from '@nestjs/common';
import { ProcessingService } from './processing.service';
import { ProcessingController } from './processing.controller';
import { PropertyInfoHandler } from './handlers/property-info.handler';
import { SoilUseHandler } from './handlers/soil-use.handler';

@Module({
  providers: [ProcessingService, PropertyInfoHandler, SoilUseHandler],
  controllers: [ProcessingController],
})
export class ProcessingModule {}
