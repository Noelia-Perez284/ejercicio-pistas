import { Injectable, NotFoundException } from '@nestjs/common';
import {User} from './users'
import *as fs from 'fs'
import { AppService } from 'src/app.service';


@Injectable()
export class UsersService {
    
    users:User[]=[];
    
    getUsers(url:string): User[]{
        const users:User[]=[];

        let datos= fs.readFileSync(url,'utf-8');

        let renglon= datos.split('\r\n');

        for(let linea of renglon){
            let parte=linea.split(',');
            let nuevoUser=new User(parte[0],parte[1],Number(parte[2]),parte[3]);

            users.push(nuevoUser);
        }
        return users
    }

    getUserByDni(dni:number):User{
        const user=this.users.find((user)=>user.dni===dni);

        if(!user){
            throw new NotFoundException(); 
        }
        return user
    }

}
