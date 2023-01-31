import {registerAs} from '@nestjs/config';
import * as process from "process";
import {IsNumber, IsString} from "class-validator";
import {validateUtil} from "./validate-util";

export class DataBaseEnvVariables {
    @IsString()
    DATABASE_TYPE: string;

    @IsString()
    DATABASE_HOST: string;

    @IsNumber()
    DATABASE_PORT: number;

    @IsString()
    DATABASE_USER: string;

    @IsString()
    DATABASE_PASSWORD: string;

    @IsString()
    DATABASE_NAME: string;
}

export interface DataBaseConfigInterface {
    url: string;
    type: string;
    host: string;
    password: string;
    name: string;
    username: string;
    port: number;
    synchronize: boolean
}

export default registerAs('database_config', (): DataBaseConfigInterface => {
    validateUtil(process.env, DataBaseEnvVariables)
    return {
        url: process.env.DATABASE_URL,
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USERNAME,
        synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    }
});
