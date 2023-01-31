import {Test, TestingModule} from '@nestjs/testing';
import {RouletteService} from './roulette.service';
import {CreateRouletteDto} from "./dto/Create-Roulette.dto";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Roulette} from "./entiity/roulette.entity";

describe('RouletteService', () => {
    let service: RouletteService;

    class RouletteRepo {
        save(roulette_number: Roulette) {
            return roulette_number
        }
    }

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RouletteService,
                {
                    provide: getRepositoryToken(Roulette),
                    useClass: RouletteRepo
                },
            ],
        }).compile();

        service = module.get<RouletteService>(RouletteService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Create Roulette - It save new randomly generated number', async () => {
        const createRandomNumber: CreateRouletteDto = {
            random_number: 33
        }

        const savedRandomNumber = await service.createRoulette(createRandomNumber.random_number)
        expect(savedRandomNumber).toBeDefined();
        expect(savedRandomNumber).toEqual(createRandomNumber)
    })
});
