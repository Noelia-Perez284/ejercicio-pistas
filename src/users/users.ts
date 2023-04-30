export class User {
    nombre:string;
    apellido:string;
    dni:number;
    mail:string;
    constructor(nombre:string,apellido:string,dni:number,mail:string) {
        this.nombre=nombre;
        this.apellido=apellido;
        this.dni=dni;
        this.mail=mail;
    }
}