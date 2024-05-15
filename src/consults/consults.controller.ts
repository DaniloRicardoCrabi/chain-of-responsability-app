import { Body, Controller, Post } from '@nestjs/common';
import { ConsultsService } from './consults.service';
import { consultRequestDto } from './dtos/consult-request.dto';

@Controller('consults')
export class ConsultsController {
  constructor(private readonly service: ConsultsService) {}

  @Post()
  public async create(@Body() consult: consultRequestDto): Promise<any> {
    return this.service.create(consult);
  }
}
