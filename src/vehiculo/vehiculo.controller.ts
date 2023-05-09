import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post } from '@nestjs/common';
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
    async postVehiculo(@Body() loteVehiculosDto: CreateVehiculoDto[]) {
        for (const vehiculo of loteVehiculosDto) {
            const errors = await validate(vehiculo);
            if (errors.length > 0) {
              throw new HttpException('Datos de entrada inválidos', HttpStatus.BAD_REQUEST);
            }
        }
        return this.vehiculoService.almacenarVehiculos(loteVehiculosDto);
    }

    @Delete(":patente")
    deleteVehiculo(@Param('patente') patente: string): boolean {
        return this.vehiculoService.deleteVehiculo(patente)
    }
}
