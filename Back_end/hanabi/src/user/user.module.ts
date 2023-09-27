import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

// we are putting some mongoose import in  user module 
// we have make our schema for user in schemas folder
@Module({
  imports:[MongooseModule.forFeature([{name:"User",schema:UserSchema}])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
