import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './schemas/dto/create-user.dto';

@Controller('user')
export class UserController {

    constructor (private userService:UserService){}

    @Get(':userName')
    async findUserByUserName(@Param('userName') userName:string,):Promise<User>{

        const userData=  await this.userService.findOne(userName)
        return userData
    }
    @Post()
    async createUser(
        @Body()
        user:CreateUserDto,
    ):Promise<User> {

        return this.userService.createUser(user)
    }
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
