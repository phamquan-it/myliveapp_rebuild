import { AddPublicKey, CreateShellUser } from "../APIRequest/Webdock"
import { REST_METHOD } from "./SERVERWebDockAPI"
import { WEBDOCK_TOKEN } from "./Token"

const SHELL_USER = {
    getListShellUser: (serverSlug: string)=>{
        return {
            url: `/servers/${serverSlug}/shellUsers`,
            method: REST_METHOD.GET,
            token: WEBDOCK_TOKEN
        }
    },
    createAShellUser: (serverSlug: string, data: CreateShellUser)=>{
        return {
            url: `/servers/${serverSlug}/shellUsers`,
            method: REST_METHOD.POST,
            token: WEBDOCK_TOKEN,
            data:data
        }
    },
    createShortLivedTokenForWebSSH: (serverSlug: string, username: {username: string})=>{
        return {
            url: `/servers/${serverSlug}/shellUsers`,
            method: REST_METHOD.POST,
            token: WEBDOCK_TOKEN,
            data: username
        }
    },
    deleteShellUser: (serverSlug: string, shellUserId:number)=>{
        return {
            url: `/servers/${serverSlug}/shellUsers/${shellUserId}`,
            method: REST_METHOD.DELETE,
            token: WEBDOCK_TOKEN
        }
    },
    updateShellUserPublicKey: (serverSlug: string, shellUserId : { shellUserId: number})=>{
        return {
            url: `/servers/${serverSlug}/shellUsers/${shellUserId}`,
            method: REST_METHOD.PATCH,
            token: WEBDOCK_TOKEN
        }
    },
}
export {
    SHELL_USER
}