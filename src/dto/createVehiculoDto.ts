import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, isNumber, maxLength } from "class-validator";

export class CreateVehiculoDto{
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    readonly patente:string;

    @IsString()
    @IsNotEmpty()
    readonly marca:string;

    @IsString()
    @IsNotEmpty()
    readonly modelo:string;

    @IsNumber()
    @IsNotEmpty()
    readonly año:number;

    @IsNumber()
    @IsNotEmpty()
    readonly precio:number;

    @IsNumber()
    readonly capacidadDeCarga:number;
    
    @IsString()
    @IsNotEmpty()
    readonly tipo:string;
}