import {IsNumber} from "class-validator";

export class CreateRouletteDto {
    @IsNumber()
    random_number: number
}