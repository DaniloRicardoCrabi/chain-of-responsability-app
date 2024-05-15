import { Injectable, Logger } from '@nestjs/common';
import { SoilUseHandler } from './handlers/soil-use.handler';
import { PropertyInfoHandler } from './handlers/property-info.handler';

@Injectable()
export class ProcessingService {
  private readonly logger = new Logger(ProcessingService.name);

  constructor(
    private readonly propertyInfoHandler: PropertyInfoHandler,
    private readonly soilUseHandler: SoilUseHandler,
  ) {}

  async processRequest(request: any): Promise<void> {
    this.propertyInfoHandler.setNext(this.soilUseHandler);

    try {
      await this.propertyInfoHandler.handle(request);
    } catch (error) {
      this.logger.error('Erro no processamento:', error);
    }
  }
}
