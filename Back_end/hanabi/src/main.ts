import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var cors = require('cors')
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: false });
  app.use(

  cors({
    origin: [
      "http://localhost:3000",
    
    ],
    methods: ["GET", "DELETE", "PATCH", "POST"],
    credentials: true,
  }))
  await app.listen(4000);
}
bootstrap();
