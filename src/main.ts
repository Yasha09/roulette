import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from "@nestjs/config";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const microservice = app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://guest:guest@localhost:5672'],
            queue: 'random_number',
            queueOptions: {
                durable: false
            }
        }
    })
    const config = app.get(ConfigService);
    app.setGlobalPrefix(config.get('API_PREFIX'))

    await app.startAllMicroservices()
    await app.listen(config.get('PORT'));

}

bootstrap();

