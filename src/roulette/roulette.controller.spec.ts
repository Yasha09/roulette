import {Test, TestingModule} from '@nestjs/testing';
import {RouletteController} from './roulette.controller';
import {INestApplication} from "@nestjs/common";
import {Roulette} from "./entiity/roulette.entity";
import {DataSource, Repository} from "typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {RouletteService} from "./roulette.service";
import {TypeOrmConfigService} from "../database/typeorm-config.service";
import {ConfigModule} from "@nestjs/config";
import appConfig from "../config/app.config";
import databaseConfig from "../config/database.config";

describe('RouletteController', () => {
    let controller: RouletteController;
    let app: INestApplication;
    let repository: Repository<Roulette>;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                    load: [appConfig, databaseConfig]
                }),
                ClientsModule.register([{
                    name: 'ROULETTE_SERVICE',
                    transport: Transport.RMQ,
                    options: {
                        urls: ['amqp://guest:guest@localhost:5672'],
                        queue: 'roulette',
                        queueOptions: {
                            durable: false
                        }
                    }
                }]),
                TypeOrmModule.forRootAsync({
                    useClass: TypeOrmConfigService,
                    dataSourceFactory: async (options) => {
                        return await new DataSource(options).initialize();
                    }
                }),
                TypeOrmModule.forFeature([Roulette]),

            ],
            controllers: [RouletteController],
            providers: [RouletteService]
        }).compile();
        app = module.createNestApplication();
        repository = module.get('RouletteRepository')
        controller = module.get<RouletteController>(RouletteController);
        await app.init()
    });

    const initDatabase = async () => {
        return await repository.delete({})
    }

    afterAll(async () => {
        await initDatabase()
    });

    describe('create roulette', () => {
        const random_number_temp = 44;

        it('should be defined', () => {
            expect(controller).toBeDefined();
        });

        it('Create a new random number with correct prop', async () => {
            await controller.save_random_number(random_number_temp);

            // const rouletteFromDb = await repository.query(`SELECT roulette_number FROM roulette`);
            const {random_number} = await repository.findOne({
                where: {},
                order: {id: 'DESC'}
            })
            expect(random_number).toBe(random_number_temp)
        })
    })

});
