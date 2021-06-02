import { E } from '@app/common'
import { validatePayload } from "@app/application/ValidatePayload"
import { Errors } from 'io-ts'

describe('Validate payload module', () => {
    it('should validate successfully', async () => {
        const payload = {key: 'value'}
        const successDecoder = (p: unknown) => E.right(p)
        
        const program = validatePayload(payload, successDecoder)
        const main = program({})

        const result = await main()

        expect(result).toEqual(E.right(payload))
    })
    it('should propagate error', async () => {
        const payload = {key: 'value'}
        const failureDecoder = (_: unknown) => E.left('error' as any as Errors)
        
        const program = validatePayload(payload, failureDecoder)
        const main = program({})

        const result = await main()

        expect(result).toEqual(E.left('error'))
    })
})