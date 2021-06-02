import { PersistUser } from "@app/application/PersistUser"
import { E, RTE } from "@app/common"
import { User, Email } from "@app/domain/User"
import { UserExists, UserRepository } from "@app/domain/UserRepository"

describe('Persist user to repository', () => {
    it('should successfully persist user', async () => {
        const memoryStorage: User[] = []

        const user = {} as User
        
        const program = PersistUser(user)

        const testUserRepository: UserRepository = {
            UserRepository: {
                createUser: user => RTE.fromIO(() => {
                    memoryStorage.push(user)
                })
            }
        }

        const main = program(testUserRepository)

        const result = await main()

        expect(result).toEqual(E.right(undefined))
    })
    it('should propagate error if user exists', async () => {
        const error: UserExists = {
            _tag: 'UserExists',
            email: 'test@mail.com' as Email,
        }

        const user = {} as User
        
        const program = PersistUser(user)

        const testUserRepository: UserRepository = {
            UserRepository: {
                createUser: () => RTE.left(error)
            }
        }

        const main = program(testUserRepository)

        const result = await main()

        expect(result).toEqual(E.left(error))
    })
})
