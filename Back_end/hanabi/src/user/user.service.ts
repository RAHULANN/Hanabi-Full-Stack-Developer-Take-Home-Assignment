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

    // we have defined User schema and in create we are giving the same time of return in create
async createUser (user:User):Promise<User> {

    // we are creating a user along with user name and making user name in lower case so that we can use it as a uniq key while making the request  to get a user details by userName
    const createdUser=await this.userModule.create({...user,userName:user.userName.toLowerCase()})
    return createdUser
}

// this function  will return a user details by taking userName 
    async findOne(userName:string): Promise <User>{
        
        const userData= await this.userModule.findOne({userName:userName.toLowerCase()})
        if(!userData){
            throw new  NotFoundException("no data found");
        }
        return userData

    }

    // this will find and update user details by passing  id in function
    // this function only update the keys which we will send in a body remaining will not be affected 
    async updateAUser(id:string,user:User):Promise<User>{
        const updatedUserData= await this.userModule.findByIdAndUpdate(id, user, {
            new: true,
            runValidators: true,
          });
          return updatedUserData
    }
}
