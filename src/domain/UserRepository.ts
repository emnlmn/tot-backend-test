import { RTE } from "@app/common";
import { Email, User } from "./User";

export type UserExists = {
    _tag: 'UserExists',
    email: Email
}

export interface UserRepository {
    UserRepository: {
        createUser: (user: User) => RTE.ReaderTaskEither<unknown, UserExists, void>
    }
}