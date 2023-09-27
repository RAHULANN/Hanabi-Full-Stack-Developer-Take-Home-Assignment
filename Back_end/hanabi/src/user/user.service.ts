import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import  * as mongoose from 'mongoose';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userModule:mongoose.Model<User>,
    ) {}
async createUser (user:User):Promise<User> {

    const createdUser=await this.userModule.create({...user,userName:user.userName.toLowerCase()})
    return createdUser
}
    async findOne(userName:string): Promise <User>{
        
        const userData= await this.userModule.findOne({userName:userName.toLowerCase()})
        if(!userData){
            throw new  NotFoundException("no data found");
        }
        return userData

    }

    async updateAUser(id:string,user:User):Promise<User>{
        const updatedUserData= await this.userModule.findByIdAndUpdate(id, user, {
            new: true,
            runValidators: true,
          });
          return updatedUserData
    }
}
