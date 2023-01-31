import { Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Roulette} from "./entiity/roulette.entity";
import {Repository} from "typeorm";

@Injectable()
export class RouletteService {
    constructor(
        @InjectRepository(Roulette) private rouletteRepository: Repository<Roulette>,
    ) {
    }


    async createRoulette(random_number: number): Promise<any> {
        const newRandomNumber = new Roulette()
        newRandomNumber.random_number = random_number
        return await this.rouletteRepository.save(newRandomNumber);
    }
}
