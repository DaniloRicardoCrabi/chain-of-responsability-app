import { Injectable, Logger } from '@nestjs/common';
import { BaseHandler } from './base.handler';

@Injectable()
export class PropertyInfoHandler extends BaseHandler {
  private readonly logger = new Logger(PropertyInfoHandler.name);

  public async handle(request: any): Promise<void> {
    try {
      this.logger.log('/n CALLED' + PropertyInfoHandler.name);

      this.logger.log('/n REQUEST' + JSON.stringify(request));

      if (request.lastStatus === 'PROCESSING') {
        this.logger.log('processing ...');
        this.logger.log('Teste busca de dados de propriedade');
        request.lastStatus = 'FIND_PROPERTY_INFO';
      } else {
        this.logger.log('NOT PROCESSED');
      }

      return super.handle(request);
    } catch (error) {
      console.log('Error' + error);
      throw error;
    }
  }
}
