import { RTE, pipe } from '@app/common'
import { CreateUserHandler } from '@app/infrastructure/handler/CreateUserHandler'
import { InitServer } from '@app/infrastructure/InitServer'
import { ConnectToMysql } from '@app/infrastructure/ConnectToMysql'
import { ProvideDatabaseConfig } from '@app/infrastructure/config/ProvideDatabaseConfig'
import { ProvideWebserviceConfig } from '@app/infrastructure/config/ProvideWebServiceConfig'

const main = pipe(
    RTE.Do,
    RTE.bindW("dbConnection", () => ConnectToMysql),
    RTE.bindW("ws", () => InitServer),
    RTE.map(({ws, dbConnection}) => ws.post('/user', CreateUserHandler(dbConnection))),
    ProvideDatabaseConfig,
    ProvideWebserviceConfig,
    RTE.execute
)

main().then(
    console.log,
    console.error
)
