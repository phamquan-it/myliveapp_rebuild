import { AddPublicKey } from "../APIRequest/Webdock"
import { REST_METHOD } from "./SERVERWebDockAPI"
import { WEBDOCK_TOKEN } from "./Token"

const SERVER_KEY = {
    getPublicKey: ()=>{
        return {
            url: `/account/publicKeys`,
            method: REST_METHOD.GET,
            token: WEBDOCK_TOKEN
        }
    },
    addPublicKey: (data:AddPublicKey)=>{
        return {
            url: `/account/publicKeys`,
            method: REST_METHOD.POST,
            token: WEBDOCK_TOKEN,
            data: data
        }
    },
    deletePublicKey: (id: number)=>{
        return {
            url: `/account/publicKeys/${id}`,
            method: REST_METHOD.GET,
            token: WEBDOCK_TOKEN
        }
    },
}
export {
    SERVER_KEY
}