export class Pista{
    id:string;
    titulo:string;
    duracion:number;
    interprete:string;
    lanzamiento:number;
   

    constructor(
        id:string,
        titulo:string,
        duracion:number,
        interprete:string,
        lanzamiento:number,
       
    ){
        this.id=id;
        this.titulo =titulo;
        this.duracion=duracion;
        this.interprete=interprete;
        this.lanzamiento=lanzamiento;
        
    }

    toString(){
        return `${this.id},${this.titulo},${this.duracion},${this.interprete},${this.lanzamiento}`
    }
}