import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreatePistaDto {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    readonly titulo:string;

    @IsNumber()
    readonly duracion:number;

    @IsString()
    @IsNotEmpty()
    readonly interprete:string;
    
    @IsNumber()
    readonly lanzamiento:number;
}