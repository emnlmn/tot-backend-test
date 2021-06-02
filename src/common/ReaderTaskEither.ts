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

export function provide<R>(r: R) {
    return <R2, E, A>(
        self: RTE.ReaderTaskEither<R & R2, E, A>
    ): RTE.ReaderTaskEither<R2, E, A> => (r2) => self({ ...r2, ...r })
}

export function provideM<R3, E2, R>(mr: RTE.ReaderTaskEither<R3, E2, R>) {
    return <R2, E, A>(
        self: RTE.ReaderTaskEither<R & R2, E, A>
    ): RTE.ReaderTaskEither<R2 & R3, E | E2, A> =>
        pipe(
            mr,
            RTE.chainW((r) => provide(r)(self))
        )
}

export function execute<E, A>(self: RTE.ReaderTaskEither<unknown, E, A>) {
    return self({})
}