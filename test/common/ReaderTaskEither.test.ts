import { RTE, E } from "@app/common"
import { pipe } from "fp-ts/lib/function"

describe('ReaderTaskEither', () => {
    it('should use access', async () => {
        interface Config {
            Config: {
                multiplier: number
            }
        }

        const program = RTE.access(({ Config }: Config) => Config.multiplier * 3)

        const main = program({
            Config: {
                multiplier: 2,
            }
        })

        const result = await main()

        expect(result).toEqual(E.right(6))
    })
    it('should use accessM', async () => {
        const outputs: string[] = [];

        interface Printer {
            Printer: {
                printLn: (line: string) => RTE.ReaderTaskEither<unknown, never, void>
            }
        }

        function printLn(line: string) {
            return RTE.accessM(({ Printer }: Printer) => Printer.printLn(line))
        }

        const program = pipe(
            printLn("hello"),
            RTE.chain(() => printLn("world"))
        )

        const testPrinter: Printer = {
            Printer: {
                printLn: line => RTE.fromIO(() => {
                    outputs.push(line)
                })
            }
        }

        const main = program(testPrinter)

        const result = await main()

        expect(result).toEqual(E.right(undefined))
        expect(outputs).toEqual(['hello', 'world'])
    })
})
