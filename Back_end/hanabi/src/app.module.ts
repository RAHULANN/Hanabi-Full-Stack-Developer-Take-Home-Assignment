import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({

  // i have putting all of my imports which i want to include in app like mongoose url and other module if we want
  imports: [
    ConfigModule.forRoot({
      envFilePath:".env",
      isGlobal:true
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
