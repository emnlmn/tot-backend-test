import { RTE, TE } from "@app/common";
import { UserExists, UserRepository } from "@app/domain/UserRepository";
import { pipe } from "fp-ts/lib/pipeable";
import * as mysql from "mysql2/promise"
import { DatabaseError } from "./ConnectToMysql";
import { User } from '@app/domain/User';

export interface MysqlConnection extends mysql.Connection {
}

export const MysqlUserRepository = (connection: MysqlConnection): UserRepository => ({
    UserRepository: {
        createUser: user => pipe(
            RTE.fromTaskEither(TE.tryCatch(
                () => executeInsertQuery(connection, user),
                mapError(user)
            )
            ),
            RTE.map(() => {
            }),
        )
    }
})

const executeInsertQuery = (connection: MysqlConnection, user: User) => connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [user.name, user.email,])

const isDatabaseError = (error: any): error is DatabaseError => 'code' in error && 'sqlState' in error && 'sqlMessage' in error && 'errno' in error

const mapError = (user: User) => (error: unknown) =>
    isDatabaseError(error)
        ? (
            error.code === 'ER_DUP_ENTRY'
                ? new UserExists(user.email)
                : new DatabaseError(error.sqlMessage, error.code, error.sqlstate, error.errno)
        )
        : new DatabaseError('unkown', '', '', 0)