import { E } from '@app/common'
import { ValidatePayload } from "@app/application/ValidatePayload"
import { Errors } from 'io-ts'
import { identity } from 'fp-ts/lib/function'

describe('Validate payload module', () => {
    it('should validate successfully', async () => {
        const payload = { key: 'value' }
        const successDecoder = (p: unknown) => E.right(p)

        const program = ValidatePayload(payload, successDecoder, identity)
        const main = program({})

        const result = await main()

        expect(result).toEqual(E.right(payload))
    })
    it('should propagate error', async () => {
        const payload = { key: 'value' }
        const failureDecoder = (_: unknown) => E.left('error' as any as Errors)

        const program = ValidatePayload(payload, failureDecoder, identity)
        const main = program({})

        const result = await main()

        expect(result).toEqual(E.left('error'))
    })
})