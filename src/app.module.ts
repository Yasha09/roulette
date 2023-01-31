import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import databaseConfig from './config/database.config'
import {TypeOrmConfigService} from "./database/typeorm-config.service";
import {DataSource} from "typeorm";
import { RouletteModule } from './roulette/roulette.module';
import appConfig from "./config/app.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, databaseConfig]
        }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
            dataSourceFactory: async (options) => {
                return await new DataSource(options).initialize();
            }
        }),
        RouletteModule
    ],
    controllers: [],
})
export class AppModule {
}
