import { E } from "@app/common"
import { email } from "@app/domain/User"

describe('User', () => {
  it('should validate email', () => {
      const validEmail = 'test@gmail.com'
      const invalidEmail = 'test'

      const validResult = email.decode(validEmail)
      const invalidResult = email.decode(invalidEmail)

      expect(validResult).toEqual(E.right(validEmail))
      expect(E.isLeft(invalidResult)).toBeTruthy()
  })
})
