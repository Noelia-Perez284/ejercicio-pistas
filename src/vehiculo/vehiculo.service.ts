import { Injectable, NotFoundException } from '@nestjs/common';
import { Vehiculo } from './vehiculo';
import *as  fs from 'fs'
import { CreateVehiculoDto } from 'src/dto/createVehiculoDto';

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
        return this.Vehiculos;
    }

    getVehiculoByPatente(patente: string): Vehiculo {
        const vehiculoEncontrado = this.Vehiculos.find((vehiculo) => vehiculo.patente === patente)
        return vehiculoEncontrado
    }

    getListaAutos():Vehiculo[]{
        let listaAutos=this.Vehiculos.filter(Vehiculo=>Vehiculo.tipoDeVehiculo==="A")
        return listaAutos
    }

    getListaCamionetas():Vehiculo[]{
        let listaCamionetas=this.Vehiculos.filter(Vehiculo=>Vehiculo.tipoDeVehiculo==="C")
        return listaCamionetas
    }


    almacenarVehiculos(loteVehiculosDto: CreateVehiculoDto[]) {

        for(let vehiculo of loteVehiculosDto){
            const newVehiculo = new Vehiculo(vehiculo.patente,
                vehiculo.marca,
                vehiculo.modelo,
                vehiculo.año,
                vehiculo.precio,
                vehiculo.capacidadDeCarga,
                vehiculo.tipoDeVehiculo)
    
            this.Vehiculos.push(newVehiculo); //aca subo el nuevo vehiculo al arreglo
    
            const dataArchivoTxt = this.Vehiculos.length ? "\n" + newVehiculo.toString() : newVehiculo.toString(); //paso a texto los atibutos del objeto newVehiculo
           
            fs.appendFileSync(this.url, dataArchivoTxt)//aca escribo el vehiculo creado al txt
        }

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
