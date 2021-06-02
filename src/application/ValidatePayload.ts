import { pipe, RTE } from '@app/common'
import { Decode, Errors } from 'io-ts'

export type ValidationError = {
    _tag: 'ValidationError',
    error: string,
}

export function ValidatePayload<I extends unknown, T, E>(payload: I, decoder: Decode<I, T>, mapErrors: (e: Errors) => E): RTE.ReaderTaskEither<unknown, E, T> {
    return pipe(
        RTE.fromEither(decoder(payload)),
        RTE.mapLeft(mapErrors),
    )
}