import { FastifyReply, FastifyRequest } from 'fastify'
import { pipe } from '@app/common'
import { MapToValidationError } from './application/MapToValidationError'
import { PersistUser } from './application/PersistUser'
import { ValidatePayload } from './application/ValidatePayload'
import { E, RTE } from './common'
import { user } from './domain/User'
import { UserRepository } from './domain/UserRepository'
import { initServer, WebServiceConfig } from './infrastructure/ws'

const webServiceConfig: WebServiceConfig = {
    WebServiceConfig: {
        port: 8080,
        address: '0.0.0.0'
    }
}

type Handler = (request: FastifyRequest, reply: FastifyReply) => void

const createUserHandler: Handler = async (request, reply) => {
    const handler = pipe(
        ValidatePayload(request.body, user.decode, MapToValidationError),
        RTE.chainW(PersistUser),
        RTE.provide({} as UserRepository),
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

const main = pipe(
    initServer,
    RTE.provide(webServiceConfig),
    RTE.map(ws => ws.post('/user', createUserHandler)),
    RTE.execute
)

main().then(
    console.log,
    console.error
)