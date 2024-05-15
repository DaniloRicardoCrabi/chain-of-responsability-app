import { Controller, Post, Body } from '@nestjs/common';
import { ProcessingService } from './processing.service';

@Controller('processing')
export class ProcessingController {
  constructor(private readonly processingService: ProcessingService) {}

  @Post()
  async processRequest(@Body() request: any) {
    await this.processingService.processRequest(request);
  }
}
