import { Injectable, NotFoundException } from '@nestjs/common';
import { Pista } from './pista';
import { AppService } from 'src/app.service';

@Injectable()
export class PistaService {
  private Pistas: Pista[] = [];

  constructor(private readonly appService: AppService) {
    for (let i = 0; i < 20; i++) {
      const pista = new Pista(
        i,
        "T" + this.appService.getRandomString(),
        360,
        "I" + this.appService.getRandomString(),
        1990 + i
      );

      this.Pistas.push(pista);
    }
  }

  getPistas(): Pista[] {
    return this.Pistas;
  }

  getPistaById(id:number):Pista {
    const pista= this.Pistas.find((pista)=> pista.id===id);
    
    if(!pista){
      //si no encuentra pista, va a devolver una excepcion
      throw new NotFoundException();
      
    }
    return pista
  }

  newPista(titulo:string,duracion:number,interprete:string,lanzamiento:number){
    const id=this.Pistas.length;
    const newPista= new Pista(id,titulo,duracion,interprete,lanzamiento)
    this.Pistas.push(newPista);
  }

}

