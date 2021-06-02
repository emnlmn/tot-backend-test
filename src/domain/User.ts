import * as t from 'io-ts'

interface NameBrand {
    readonly Name: unique symbol
}

export const name = t.brand(
    t.string,
    (n): n is t.Branded<string, NameBrand> => n.length > 1,
    'Name'
)

interface EmailBrand {
    readonly Email: unique symbol
}

export const email = t.brand(
    t.string,
    (e): e is t.Branded<string, EmailBrand> => /^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/.test(String(e)),
    'Email'
)

export type Email = t.TypeOf<typeof email>

export const user = t.strict({
    name: name,
    email: email
})

export type User = t.TypeOf<typeof user>