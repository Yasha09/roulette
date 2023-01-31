import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {ConfigService} from "@nestjs/config";
import {Injectable} from "@nestjs/common";
import {Roulette} from "../roulette/entiity/roulette.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: this.configService.get('DATABASE_TYPE'),
            url: this.configService.get('DATABASE_URL'),
            host: this.configService.get('DATABASE_HOST'),
            port: this.configService.get('DATABASE_PORT'),
            username: this.configService.get('DATABASE_USER'),
            password: this.configService.get('DATABASE_PASSWORD'),
            database: this.configService.get('DATABASE_NAME'),
            entities: [Roulette],
            synchronize: true,
        } as TypeOrmModuleOptions
    }
}