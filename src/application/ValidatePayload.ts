import { RTE } from '@app/common'
import { identity, pipe } from 'fp-ts/lib/function'
import { Decode } from 'io-ts'

export function validatePayload<I extends unknown, T>(payload: I, decoder: Decode<I, T>): RTE.ReaderTaskEither<unknown, unknown, T> {
    return pipe(
        RTE.of(payload),
        RTE.map(decoder),
        RTE.chainEitherKW(identity),
    )
}