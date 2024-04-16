import { NestFactory } from '@nestjs/core';
import { AppModule } from '#app/app.module';
import { AppService } from '#app/app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = new AppService(app);
  await appService.init();
  await appService.listen();
}
bootstrap();
