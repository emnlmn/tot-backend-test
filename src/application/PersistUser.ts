import { RTE } from "@app/common";
import { User } from "@app/domain/User";
import { UserExists, UserRepository } from "@app/domain/UserRepository";
import { DatabaseError } from "@app/infrastructure/ConnectToMysql";

export function PersistUser(user: User): RTE.ReaderTaskEither<UserRepository, UserExists | DatabaseError, void> {
    return RTE.accessM(({ UserRepository }: UserRepository) => UserRepository.createUser(user))
}