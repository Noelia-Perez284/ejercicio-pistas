import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { get } from 'http';
import { Vehiculo } from './vehiculo';
import { createVehiculoDto } from 'src/dto/createVehiculoDto';

@Controller('vehiculo')
export class VehiculoController {
    constructor(private readonly vehiculoService:VehiculoService){}

    @Get()
    getVehiculos():Vehiculo[]{
        return this.vehiculoService.getVehiculos()
    }


    @Get(":patente")
    getVehiculoByPatente(@Param('patente') patente:string): Vehiculo{
        return this.vehiculoService.getVehiculoByPatente(patente)
    }

    @Post()
    postVehiculo(@Body() createVehiculoDto: createVehiculoDto){
        return this.vehiculoService.createVehiculo(createVehiculoDto)
    }
}
