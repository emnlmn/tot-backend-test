export * from 'fp-ts/ReaderTaskEither'
import * as E from 'fp-ts/Either'
import { identity, pipe } from 'fp-ts/lib/function'
import * as RTE from 'fp-ts/ReaderTaskEither'

export function access<R, A>(f: (r: R) => A): RTE.ReaderTaskEither<R, never, A> {
    return (c) => () => new Promise(res => res(E.right(f(c))))
}

export function accessM<R, R1, E1, A>(f: (c: R) => RTE.ReaderTaskEither<R1, E1, A>): RTE.ReaderTaskEither<R & R1, E1, A> {
    return pipe(
        access(f),
        RTE.chainW(identity)
    )
}