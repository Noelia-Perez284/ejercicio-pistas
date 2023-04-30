import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers():User []{
        return this.usersService.getUsers('./src/users/users.txt');
    }
    
    @Get(":dni")
    getUsersById(@Param('dni',ParseIntPipe) dni:number):User{
       return this.usersService.getUserByDni(dni)
    }
}
