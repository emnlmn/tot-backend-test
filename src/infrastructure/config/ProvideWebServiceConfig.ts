import { pipe, RTE } from "@app/common"

function GetWebserviceConfig() {
    return ({
        WebServiceConfig: {
            port: 8080,
            address: '0.0.0.0'
        }
    })
}

export const ProvideWebserviceConfig = pipe(
    GetWebserviceConfig(),
    RTE.provide
)