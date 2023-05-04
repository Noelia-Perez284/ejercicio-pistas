import { Body, Controller, Get, Param, ParseIntPipe, ParseUUIDPipe, Post } from '@nestjs/common';
import { PistaService } from './pista.service';
import { Pista } from './pista';
import { CreatePistaDto } from 'src/dto/create-pista.dto';

@Controller("pistas")
export class PistaController {
  constructor(private readonly pistaService: PistaService) { }

  @Get() // url/pistas
  getPistas(): Pista[] {
    return this.pistaService.getPistas();
  }

  @Get(":id") // url/pistas/:id 
  getPistasById(@Param('id', ParseUUIDPipe) id: string): Pista {
    return this.pistaService.getPistaById(id);
  }

  @Post()
  postPista(@Body() createPistadto: CreatePistaDto) {

    return this.pistaService.createPista(createPistadto);

  }

  
}
