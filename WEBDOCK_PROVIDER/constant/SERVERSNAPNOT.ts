import { REST_METHOD } from "./SERVERWebDockAPI"
import { WEBDOCK_TOKEN } from "./Token"

const SERVER_SNAPNOT = {
    createASnapnot: (serverSlug: string)=>{
        return {
            url: `/servers/${serverSlug}/actions/snapshot`,
            method: REST_METHOD.POST,
            token: WEBDOCK_TOKEN
        }
    },
    dryRunForServerProfileChange: (serverSlug:string, data:{profileSlug: string})=>{
        return {
            url: `/servers/${serverSlug}/actions/resize/dryrun`,
            method: REST_METHOD.POST,
            token: WEBDOCK_TOKEN,
            data: data
        }
    },
    restoreTheServerToASnapshot: (serverSlug: string, data:{snapshotId: number}) => {
        return {
            url: "/servers/"+serverSlug,
            method: REST_METHOD.GET,
            token: WEBDOCK_TOKEN,
            data: data
        }
    },
    changeAServerProfile: (serverSlug: string, profileSlug: { profileSlug: string}) => {
        return {
            url: `/servers/${serverSlug}/actions/resize`,
            method: REST_METHOD.POST,
            token: WEBDOCK_TOKEN,
            data: profileSlug
        }
    },
}
export {
    SERVER_SNAPNOT
}