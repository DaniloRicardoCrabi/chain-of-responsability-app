import { Injectable, Logger } from '@nestjs/common';
import { BaseHandler } from './base.handler';

@Injectable()
export class SoilUseHandler extends BaseHandler {
  private readonly logger = new Logger(SoilUseHandler.name);

  public async handle(request: any): Promise<void> {
    try {
      this.logger.log('/n CALLED' + SoilUseHandler.name);

      this.logger.log('/n REQUEST' + JSON.stringify(request));

      if (request.lastStatus === 'FIND_PROPERTY_INFO') {
        this.logger.log('Teste busca de dados de uso de solo');
        request.lastStatus = 'FIND_SOIL_USE';
      } else {
        this.logger.log('NOT PROCESSED ');
      }

      return super.handle(request);
    } catch (error) {
      this.logger.log('Error' + error);
      throw error;
    }
  }
}
