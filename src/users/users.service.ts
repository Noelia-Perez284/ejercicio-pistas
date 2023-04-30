import { Injectable, NotFoundException } from '@nestjs/common';
import {User} from './users'
import *as fs from 'fs'
import { AppService } from 'src/app.service';


@Injectable()
export class UsersService {
    //defino el arreglo usuarios de forma global
    private users:User[]=[];

    constructor() { //cada ves que se levante el servidor se creara desde el archivo de texto 
        //los objetos usuarios y se almacenaran en el arreglo

       let datos= fs.readFileSync('./src/users/users.txt','utf-8');// la ruta del archivo momentaneamente se soloca aca

        let renglon= datos.split('\r\n');

        for(let linea of renglon){
            
            let parte=linea.split(',');
            let newUser=new User(parte[0],parte[1],Number(parte[2]),parte[3]);

            this.users.push(newUser);
        }
       
    }
    
    getUsers(): User[]{
       return this.users
    }

    getUserByDni(dni:number):User{

    const user=this.users.find((user)=>user.dni===dni);

        if(!user){
            throw new NotFoundException(); 
        }
        return user
    }

}
