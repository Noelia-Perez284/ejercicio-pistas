import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { get } from 'http';
import { Vehiculo } from './vehiculo';
import { CreateVehiculoDto } from 'src/dto/createVehiculoDto';
import { validate } from 'class-validator';


@Controller('vehiculo')
export class VehiculoController {
    constructor(private readonly vehiculoService: VehiculoService) { }

    @Get()
    getVehiculos(): Vehiculo[] {
        return this.vehiculoService.getVehiculos()
    }


    @Get("/:patente")
    getVehiculoByPatente(@Param('patente') patente: string): Vehiculo {
        return this.vehiculoService.getVehiculoByPatente(patente)
    }

    @Get("lista/autos")
    getVehiculosAutos() {
        return this.vehiculoService.getListaAutos()
    }

    @Get("lista/camionetas")
    getVehiculosCamionetas(){
        return this.vehiculoService.getListaCamionetas()
    }

    @Post()
    postVehiculo(@Body() createVehiculoDto: CreateVehiculoDto) {

        return this.vehiculoService.createVehiculo(createVehiculoDto)
    }

    @Delete(":patente")
    deleteVehiculo(@Param('patente') patente: string): boolean {
        return this.vehiculoService.deleteVehiculo(patente)
    }
}
