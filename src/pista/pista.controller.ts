import { Controller, Get } from '@nestjs/common';
import { PistaService } from './pista.service';
import { Pista } from './pista';

@Controller('pista')
export class PistaController {
    constructor(private readonly pistaService:PistaService){}
    
    @Get()
    getPistas():any{
        const Pistas=[];
       
        for(let i=0; i<20;i++){
            const pista=new Pista(i,"N"+this.pistaService.getRandomString(),360,"I"+this.pistaService.getRandomString())
            Pistas.push(pista)
        }

        const data={
            cant:Pistas.length,
            pistas:Pistas,
        }
        return data;
    }
    @Get() // Ayuda: van a tener que colocar algo en los @Get del archivo
    getJsonMock(): any {
    return "retornar el archivo ../???/pistas.json"; // El archivo lo pueden quitar de la carpeta cliente si lo ven necesario
  }

}
