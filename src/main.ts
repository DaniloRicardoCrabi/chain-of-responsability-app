import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { OutboxService } from './outbox/outbox.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const outBoxService = app.get<OutboxService>(OutboxService);

  await outBoxService.sendOutStandingEvents();

  await app.listen(3000);
}
bootstrap();
