import { pipe } from '@app/common'
import { RTE } from './common'
import { CreateUserHandler } from './infrastructure/handler/CreateUserHandler'
import { InitServer, WebServiceConfig } from './infrastructure/InitServer'
import { ConnectToMysql, DatabaseConfig } from './infrastructure/ConnectToMysql'

const webServiceConfig: WebServiceConfig = {
    WebServiceConfig: {
        port: 8080,
        address: '0.0.0.0'
    }
}

const databaseConfig: DatabaseConfig = {
    DatabaseConfig: {
        host: 'mysql',
        user: 'dev',
        password: 'dev',
        database: 'test'
    }
}

const main = pipe(
    RTE.Do,
    RTE.bindW("dbConnection", () => ConnectToMysql),
    RTE.bindW("ws", () => InitServer),
    RTE.map(({ws, dbConnection}) => ws.post('/user', CreateUserHandler(dbConnection))),
    RTE.provide(databaseConfig),
    RTE.provide(webServiceConfig),
    RTE.execute
)

main().then(
    console.log,
    console.error
)
