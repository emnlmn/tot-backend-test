import fastify from 'fastify'
import { RTE } from '@app/common';
import { pipe } from 'fp-ts/pipeable';

export interface WebServiceConfig {
    WebServiceConfig: {
        port: number,
        address: string
    }
}

export const initServer =
    pipe(
        RTE.access(({ WebServiceConfig }: WebServiceConfig) => WebServiceConfig),
        RTE.chainW(ws => {
            const server = fastify();
            server.listen(ws.port, ws.address, (err, address) => {
                if (err) {
                    console.error(err)
                    process.exit(1)
                }
                console.log(`Server listening at ${address}`)
            })

            server.addContentTypeParser('application/json', { parseAs: 'string' }, (_, body, done) => {
                try {
                    const json = JSON.parse(body.toString())
                    done(null, json)
                } catch (err) {
                    err.statusCode = 400
                    done(err, undefined)
                }
            })

            return RTE.of(server)
        }),
    )
