import { ServerProvision, UpdateServerMetaData } from "../APIRequest/Webdock";
import { WEBDOCK_TOKEN } from "./Token"

export enum REST_METHOD {
    GET,
    POST,
    PUT,
    PATCH,
    DELETE
}
export const BASEURL = 'https://api.webdock.io/v1';
interface APIWebdock {
    url: string,
    method: REST_METHOD
    token: string
}

const accountInformation: APIWebdock = {
    url: "/account/accountInformation",
    method: REST_METHOD.GET,
    token: WEBDOCK_TOKEN
}

const SERVER = {
    list: ()=>{
        return {
            url: "/servers",
            method: REST_METHOD.GET,
            token: WEBDOCK_TOKEN
        }
    },
    provisionAServer: (data: ServerProvision)=>{
        return {
            url: "/servers",
            method: REST_METHOD.POST,
            token: WEBDOCK_TOKEN,
            data: data
        }
    },
    getASpecificServerBySlug: (serverSlug: string) => {
        return {
            url: "/servers/"+serverSlug,
            method: REST_METHOD.GET,
            token: WEBDOCK_TOKEN
        }
    },
    deleteAServer: (serverSlug: string) => {
        return {
            url: "/servers/"+serverSlug,
            method: REST_METHOD.DELETE,
            token: WEBDOCK_TOKEN
        }
    },
    updateServerMetaData:(serverSlug: string,metadata:UpdateServerMetaData)=>{
        return {
            url: "/servers/"+serverSlug,
            method: REST_METHOD.DELETE,
            token: WEBDOCK_TOKEN,
            data: metadata
        }
    }
}

const SERVER_ACTION = {
    start: (serverSlug:string)=>{
        return {
            url: `/servers/${serverSlug}/actions/start`,
            method: REST_METHOD.POST,
            token: WEBDOCK_TOKEN
        }
    },
    stop: (serverSlug:string)=>{
        return {
            url: `/servers/${serverSlug}/actions/stop`,
            method: REST_METHOD.POST,
            token: WEBDOCK_TOKEN
        }
    },
    reboot: (serverSlug:string)=>{
        return {
            url: `/servers/${serverSlug}/actions/reboot`,
            method: REST_METHOD.POST,
            token: WEBDOCK_TOKEN
        }
    },
    archiveAServer: (serverSlug:string)=>{
        return {
            url: `/servers/${serverSlug}/actions/suspend`,
            method: REST_METHOD.POST,
            token: WEBDOCK_TOKEN
        }
    },
    reinstallAServer: (serverSlug:string)=>{
        return {
            url: `/servers/${serverSlug}/actions/reinstall`,
            method: REST_METHOD.POST,
            token: WEBDOCK_TOKEN
        }
    }
}


export {
    SERVER,
    SERVER_ACTION,
    accountInformation
}