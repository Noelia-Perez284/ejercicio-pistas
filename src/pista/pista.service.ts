import { Injectable, NotFoundException } from '@nestjs/common';
import { Pista } from './pista';
import *as  fs from 'fs'
import { v4 as uuid } from "uuid";
import { CreatePistaDto } from 'src/dto/create-pista.dto';

@Injectable()
export class PistaService {
  private Pistas:Pista[]=[];
  private url: string='./src/pista/pistas2.txt'

  constructor(){
    let datos= fs.readFileSync(this.url, 'utf-8');

    //en el caso de que el archivo este vacio, realizo una validacion
    if(datos.length){ //si este valor es cero, no entra al if, ya que lo toma con false.
      let renglon= datos.split('\r\n');
    for(let linea of renglon){
      //console.log(datos.length+"cantidad de lineas")
      console.log(linea+"una linea")
      
      let partes=linea.split(',');
      
      let nuevaPista=new Pista((partes[0]),partes[1],Number(partes[2]),partes[3],Number(partes[4]))
      this.Pistas.push(nuevaPista);
    }
    
    }
  }

  getPistas():Pista[]{
    console.log("laspistas en service")
    console.log(this.Pistas)
    return this.Pistas;
  }
  
  
  getPistaById(id:string):Pista {
    const pista= this.Pistas.find((pista)=> pista.id===id);
    
    if(!pista){
      //si no encuentra pista, va a devolver una excepcion
      throw new NotFoundException();
      
    }
    return pista
  }

  createPista(CreatePistadto:CreatePistaDto){
    
    const newPista= new Pista( uuid(),
    CreatePistadto.titulo,
    CreatePistadto.duracion,
    CreatePistadto.interprete,
    CreatePistadto.lanzamiento)
    
    //aca valida si el [] tiene elementos realiza el "\n", sino lo escribe sin salto
    // Si this.Pistas.length es verdadero, entonces la expresión después del signo ? se ejecutará, 
    //de lo contrario, la expresión después de : se ejecutará.

    const dataAppend = this.Pistas.length ? "\n" + newPista.toString(): newPista.toString();


    this.Pistas.push(newPista);

    fs.appendFileSync(this.url, dataAppend)  //aca pasa al txt la nueva pista generada
  }

}

