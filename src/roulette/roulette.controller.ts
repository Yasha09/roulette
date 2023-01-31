import {Controller} from '@nestjs/common';
import {RouletteService} from "./roulette.service";
import {EventPattern, Payload} from "@nestjs/microservices";
import {InjectRepository} from "@nestjs/typeorm";
import {Roulette} from "./entiity/roulette.entity";
import {Repository} from "typeorm";

@Controller('roulette')
export class RouletteController {
    constructor(
        private rouletteService: RouletteService,
        @InjectRepository(Roulette) private rouletteRepository: Repository<Roulette>
    ) {
    }

    @EventPattern('random_number')
    async save_random_number(@Payload() payload: number): Promise<void> {
        return await this.rouletteService.createRoulette(payload)
    }

}
