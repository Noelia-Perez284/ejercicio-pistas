import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { get } from 'http';
import { Vehiculo } from './vehiculo';
import { CreateVehiculoDto } from 'src/dto/createVehiculoDto';
import { validate } from 'class-validator';


@Controller('vehiculo')
export class VehiculoController {
    constructor(private readonly vehiculoService:VehiculoService){}

    @Get()
    getVehiculos():Vehiculo[]{
        return this.vehiculoService.getVehiculos()
    }


    @Get("porpatente/:patente")
    getVehiculoByPatente(@Param('patente') patente:string): Vehiculo{
        return this.vehiculoService.getVehiculoByPatente(patente)
    }

   @Get('autos')
   getVehiculosAutos(){
    console.log("-----------------------------llego aa aitosss")
        return this.vehiculoService.getListaAutos()
    }
    

    @Post()
    postVehiculo(@Body() createVehiculoDto : CreateVehiculoDto){
    
       return this.vehiculoService.createVehiculo(createVehiculoDto)
    }

    @Delete(":patente")
    deleteVehiculo(@Param ('patente') patente:string): boolean{
        return this.vehiculoService.deleteVehiculo(patente)
    }
}
