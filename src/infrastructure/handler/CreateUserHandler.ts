import { MapToValidationError } from "@app/application/MapToValidationError"
import { PersistUser } from "@app/application/PersistUser"
import { ValidatePayload } from "@app/application/ValidatePayload"
import { E, pipe, RTE } from "@app/common"
import { user } from "@app/domain/User"
import { MysqlConnection, MysqlUserRepository } from "../MysqlUserRepository"
import { Handler } from "./Handler"

export const CreateUserHandler = (connection: MysqlConnection): Handler => async (request, reply) => {
    const handler = pipe(
        ValidatePayload(request.body, user.decode, MapToValidationError),
        RTE.chainW(PersistUser),
        RTE.provide(MysqlUserRepository(connection)),
        RTE.execute,
    )

    const result = await handler()

    if (E.isLeft(result)) {
        const error = result.left
        switch (error._tag) {
            case 'UserExists':
                reply.send(`User with email ${error.email} already exists`)
                break;
            case 'ValidationError':
                reply.send(error.error)
                break;
        }
    }

    reply.send('User created successfully')
}