import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var cors = require('cors')
async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: false });
  
  // in cors we are passing the origin which are expecting to make a request in our app
  
  app.use(

  cors({
    origin: [
      "http://localhost:3000",
    
    ],
    methods: ["GET", "DELETE", "PATCH", "POST"],
    credentials: true,
  }))

  // default port is 3000 but i am running this in 4000  
  await app.listen(process.env.PORT);
}
bootstrap();
