import { CreateAServerScript } from "../APIRequest/Webdock"
import { REST_METHOD } from "./SERVERWebDockAPI"
import { WEBDOCK_TOKEN } from "./Token"

const SCRIPTS = {
    getListPublicScripts: () => {
        return {
            url: `/scripts`,
            method: REST_METHOD.GET,
            token: WEBDOCK_TOKEN
        }
    },
    getAlistServerScripts: (serverSlug: string) => {
        return {
            url: `/servers/${serverSlug}/scripts`,
            method: REST_METHOD.GET,
            token: WEBDOCK_TOKEN
        }
    },
    createAServerScripts: (serverSlug: string, data: CreateAServerScript) => {
        return {
            url: `/servers/${serverSlug}/scripts`,
            method: REST_METHOD.POST,
            token: WEBDOCK_TOKEN,
            data: data
        }
    },
    getServerScriptById: (serverSlug: string, scriptId: number) => {
        return {
            url: `/servers/${serverSlug}/scripts/${scriptId}`,
            method: REST_METHOD.GET,
            token: WEBDOCK_TOKEN
        }
    },
    deleteAServerScript: (serverSlug: string, scriptId: number) => {
        return {
            url: `/servers/${serverSlug}/scripts/${scriptId}`,
            method: REST_METHOD.DELETE,
            token: WEBDOCK_TOKEN
        }
    }

}
export {
    SCRIPTS
}