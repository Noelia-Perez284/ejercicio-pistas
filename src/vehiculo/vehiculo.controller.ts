import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { get } from 'http';
import { Vehiculo } from './vehiculo';
import { createVehiculoDto } from 'src/dto/createVehiculoDto';
import { validate } from 'class-validator';

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
    async postVehiculo(@Body() createVehiculoDto : any[]){
        console.log("reciboVVVVCCCCVVV:");
        console.log(createVehiculoDto);
        const errors = [];
        for (const vehicle of createVehiculoDto) {
            const validationErrors = await validate(vehicle);
            if (validationErrors.length > 0) {
              errors.push(validationErrors);
            } else {
              // código para guardar el vehículo en la base de datos
            }
        }

        //const errors = await validate(createVehiculoDto);
    // if (errors.length > 0) {
    //     console.log("los errores son")
    //     console.log(errors)
    //   //throw new Error('Datos de vehículos inválidos');
    // }
        console.log(createVehiculoDto);
       return this.vehiculoService.createVehiculo(createVehiculoDto[0])
    }

    @Delete(":patente")
    deleteVehiculo(@Param ('patente') patente:string): boolean{
        return this.vehiculoService.deleteVehiculo(patente)
    }
}
// export class ListaVehiculos {
//     listado:createVehiculoDto;
  
//   }
