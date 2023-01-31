import {Module} from '@nestjs/common';
import {RouletteService} from './roulette.service';
import {RouletteController} from "./roulette.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Roulette} from "./entiity/roulette.entity";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
    imports: [
        TypeOrmModule.forFeature([Roulette]),
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
        }])
    ],
    controllers: [RouletteController],
    providers: [RouletteService]
})
export class RouletteModule {
}
