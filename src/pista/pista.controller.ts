import { Body, Controller, Get,Param, ParseIntPipe, Post  } from '@nestjs/common';
import { PistaService } from './pista.service';
import { Pista } from './pista';

@Controller("pistas")
export class PistaController {
    constructor(private readonly pistaService: PistaService) {}

    @Get() // url/pistas
    getPistas() : Pista[] {
      return this.pistaService.getPistas();
    }

    @Get(":id") // url/pistas/:id 
    getPistasById(@Param('id',ParseIntPipe) id:number): Pista {
      return this.pistaService.getPistaById(id);
    }

    @Post()
    postPista(@Body() body:any){
      //deserializar un objeto json
      const {titulo,duracion,interprete,lanzamiento}=body;
      this.pistaService.newPista(titulo,duracion,interprete,lanzamiento)
      return {body}
    }
}
  