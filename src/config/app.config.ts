import {IsNumber, IsString} from "class-validator";
import * as process from "process";
import {registerAs} from "@nestjs/config";
import {validateUtil} from "./validate-util";

export class AppConfigVariables {
    @IsString()
    NODE_ENV: string;

    @IsNumber()
    PORT: number

    @IsString()
    API_PREFIX: string
}

interface AppConfigInterface {
    node_env: string;
    port: number;
    host: string
}

export default registerAs('app_config', (): AppConfigInterface => {
    validateUtil(process.env, AppConfigVariables)

    return {
        node_env: process.env.node_env,
        port: parseInt(process.env.port),
        host: process.env.host
    }
})