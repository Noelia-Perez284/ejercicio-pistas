import { Injectable, NotFoundException } from '@nestjs/common';
import { Vehiculo } from './vehiculo';
import *as  fs from 'fs'
import { createVehiculoDto } from 'src/dto/createVehiculoDto';
import { Pista } from 'src/pista/pista';

@Injectable()
export class VehiculoService {
    private Vehiculos: Vehiculo[] = [];
    private url: string = './src/vehiculo/vehiculos.txt';

    constructor() {
        let datos = fs.readFileSync(this.url, 'utf-8');

        if (datos.length) {
            let renglon = datos.split('\r\n');

            for (let linea of renglon) {
                let partesDeLinea = linea.split(',')

                let nuevoVehiculo = new Vehiculo(
                    partesDeLinea[0],
                    partesDeLinea[1],
                    partesDeLinea[2],
                    Number(partesDeLinea[3]),
                    Number(partesDeLinea[4]),
                    Number(partesDeLinea[5]),
                    partesDeLinea[6]);

                this.Vehiculos.push(nuevoVehiculo);
            }
        }
    }

    getVehiculos(): Vehiculo[] {
        console.log(this.Vehiculos)
        return this.Vehiculos;
    }

    getVehiculoByPatente(patente: string): Vehiculo {
        const vehiculoEncontrado = this.Vehiculos.find((vehiculo) => vehiculo.patente === patente)

        if (!vehiculoEncontrado) {
            throw new NotFoundException();
        }
        return vehiculoEncontrado
    }


    createVehiculo(createVehiculoDto: createVehiculoDto) {

        const newVehiculo = new Vehiculo(createVehiculoDto.patente,
            createVehiculoDto.marca,
            createVehiculoDto.modelo,
            createVehiculoDto.año,
            createVehiculoDto.precio,
            createVehiculoDto.capacidadDeCarga,
            createVehiculoDto.tipo)

        this.Vehiculos.push(newVehiculo); //aca subo el nuevo vehiculo al arreglo

        const dataArchivoTxt = this.Vehiculos.length ? "\n" + newVehiculo.toString() : newVehiculo.toString(); //paso a texto los atibutos del objeto newVehiculo
       
        fs.appendFileSync(this.url, dataArchivoTxt)//aca escribo el vehiculo creado al txt
    }

    deleteVehiculo(patente:string):boolean {
        const vehiculoAEliminar=this.Vehiculos.findIndex((e)=>{return e.patente===patente});

        if(vehiculoAEliminar!=-1){
            this.Vehiculos.splice(vehiculoAEliminar,1);
            return true;
        }
        return false;
    }


}
