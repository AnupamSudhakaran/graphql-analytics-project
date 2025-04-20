import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const bodyParser = require("body-parser")


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.urlencoded({ extended: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
