import { RTE } from "@app/common";
import { User } from "@app/domain/User";
import { UserExists, UserRepository } from "@app/domain/UserRepository";

export function PersistUser(user: User): RTE.ReaderTaskEither<UserRepository, UserExists, void> {
    return RTE.accessM(({ UserRepository }: UserRepository) => UserRepository.createUser(user))
}