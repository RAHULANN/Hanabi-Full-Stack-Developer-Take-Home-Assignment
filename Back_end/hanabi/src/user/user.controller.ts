import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './schemas/dto/create-user.dto';

// this will run when we hit /user route
@Controller('user')
export class UserController {

    constructor (private userService:UserService){}
// to get a specific user by its userName we are taking userName i a param and passing the same in the userService  
    @Get(':userName')
    async findUserByUserName(@Param('userName') userName:string,):Promise<User>{

        const userData=  await this.userService.findOne(userName)
        return userData
    }

// to create a user we are taking user data  i a body and passing the same in the userService  

// CreateUserDto is a class which is helping us in Data validation
    @Post()
    async createUser(
        @Body()
        user:CreateUserDto,
    ):Promise<User> {

        return this.userService.createUser(user)
    }

    // patch request to update user info we are tacking Id in param and passing it in userService
    @Patch(':id')
    async updateUser(
        @Param("id")
        id:string,
        @Body()
        user:CreateUserDto,
    ):Promise<User>{

        return this.userService.updateAUser(id,user)
    }
}
