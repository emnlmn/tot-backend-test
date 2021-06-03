import { RTE } from "@app/common";
import { DatabaseError } from "@app/infrastructure/ConnectToMysql";
import { Email, User } from "./User";

export class UserExists {
    readonly _tag = 'UserExists'
    constructor(readonly email: Email) {}
}

export interface UserRepository<> {
    UserRepository: {
        createUser: (user: User) => RTE.ReaderTaskEither<unknown, UserExists | DatabaseError, void>
    }
}