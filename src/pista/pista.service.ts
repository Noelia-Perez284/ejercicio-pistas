import { Injectable, NotFoundException } from '@nestjs/common';
import { Pista } from './pista';
import *as  fs from 'fs'

@Injectable()
export class PistaService {
 

  getPistas(url:string):Pista[]{
    
    const pistas:Pista[]=[];

    let datos= fs.readFileSync(url, 'utf-8');
    let renglon= datos.split('\r\n');

    for(let linea of renglon){
      
      let partes=linea.split(',');
      
      let nuevaPista=new Pista(Number(partes[0]),partes[1],Number(partes[2]),partes[3],Number(partes[4]))
      pistas.push(nuevaPista);
    }

    return pistas
  }

  // constructor(private readonly appService: AppService) {
  //   for (let i = 0; i < 20; i++) {
  //     const pista = new Pista(
  //       i,
  //       "T" + this.appService.getRandomString(),
  //       360,
  //       "I" + this.appService.getRandomString(),
  //       1990 + i
  //     );

  //     this.Pistas.push(pista);
  //   }
  // }

  // getPistas(): Pista[] {
  //   return this.Pistas;
  // }

//   getPistaById(id:number):Pista {
//     const pista= this.Pistas.find((pista)=> pista.id===id);
    
//     if(!pista){
//       //si no encuentra pista, va a devolver una excepcion
//       throw new NotFoundException();
      
//     }
//     return pista
//   }

//   newPista(titulo:string,duracion:number,interprete:string,lanzamiento:number){
//     const id=this.Pistas.length;
//     const newPista= new Pista(id,titulo,duracion,interprete,lanzamiento)
//     this.Pistas.push(newPista);
//   }

}

