export class Pista{
    id:number;
    titulo:string;
    duracion:number;
    interprete:string;
    lanzamiento:number;
   

    constructor(
        id:number,
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
}