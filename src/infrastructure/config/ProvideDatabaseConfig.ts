import { pipe, RTE } from "@app/common";
import { DatabaseConfig } from "../ConnectToMysql";

export function GetDatabaseConfig(): DatabaseConfig {
    return ({
        DatabaseConfig: {
            host: 'mysql',
            user: 'dev',
            password: 'dev',
            database: 'test'
        }
    })
}

export const ProvideDatabaseConfig = pipe(
    GetDatabaseConfig(),
    RTE.provide,
)