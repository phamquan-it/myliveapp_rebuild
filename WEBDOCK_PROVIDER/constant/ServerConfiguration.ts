import { REST_METHOD } from "./SERVERWebDockAPI"
import { WEBDOCK_TOKEN } from "./Token"

const SERVER_CONFIGURATION = {
    locations: () => {
        return {
            url: `/locations`,
            method: REST_METHOD.GET,
            token: WEBDOCK_TOKEN
        }
    },
    profiles: () => {
        return {
            url: `/profiles`,
            method: REST_METHOD.GET,
            token: WEBDOCK_TOKEN
        }
    },
    images: () => {
        return {
            url: `/images`,
            method: REST_METHOD.GET,
            token: WEBDOCK_TOKEN
        }
    },
}
export {
    SERVER_CONFIGURATION
}