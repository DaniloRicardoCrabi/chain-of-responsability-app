import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProcessingModule } from './processing/processing.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsultsModule } from './consults/consults.module';
import { OutboxModule } from './outbox/outbox.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      '',
    ),
    ProcessingModule,
    ConsultsModule,
    OutboxModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
