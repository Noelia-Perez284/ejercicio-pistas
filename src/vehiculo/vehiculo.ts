export class Vehiculo{
    patente:string;
    marca:string;
    modelo:string;
    año:number;
    precio:number;
    capacidadDeCarga:number;
    tipoDeVehiculo:string;

    constructor(
        patente:string,
        marca:string,
        modelo:string,
        año:number,
        precio:number,
        capacidadDeCarga:number,
        tipoDeVehiculo:string
        ){
            this.patente=patente;
            this.marca=marca;
            this.modelo=modelo;
            this.año=año;
            this.precio=precio;
            this.capacidadDeCarga=capacidadDeCarga;
            this.tipoDeVehiculo=tipoDeVehiculo;
        }

        toString(){
            return `${this.patente},${this.marca},${this.modelo},${this.año},${this.precio}, ${this.capacidadDeCarga},${this.tipoDeVehiculo}`
        }
}