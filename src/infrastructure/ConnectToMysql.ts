import { pipe, RTE, TE } from "@app/common";
import * as mysql from "mysql2/promise"

export interface DatabaseConfig {
  DatabaseConfig: {
    host: string,
    user: string,
    database: string
    password: string
  }
}

export class DatabaseError {
  readonly _tag = 'DatabaseError'

  constructor(readonly sqlMessage: string, readonly code: string, readonly sqlstate: string, readonly errno: number) {
  }
}

export class DatabaseConnectionError {
  readonly _tag = 'DatabaseConnectionError'

  constructor(readonly error: string) {
  }
}

export const ConnectToMysql = pipe(
  RTE.access(({DatabaseConfig}: DatabaseConfig) => DatabaseConfig),
  RTE.chainTaskEitherKW(cfg => TE.tryCatch(
    () => mysql.createConnection(cfg),
    error => {
      console.log(error)
      return new DatabaseConnectionError('Could not connect to mysql')
    }
    )
  )
)