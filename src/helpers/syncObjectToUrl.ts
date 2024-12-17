export function removeEmptyStringProperties(obj: { [key: string]: any }): { [key: string]: any } {
    for (const key in obj) {
        if (obj[key] === '' || obj[key] == undefined) {
            delete obj[key];
        }
    }
    return obj;
}
const syncObjectToUrl = (router: any) => {
    const oldParams = router.query;
    const syncObj = (newParams: any) => {
        return router.push({
            query: removeEmptyStringProperties({ ...oldParams, ...newParams })
        })
    }
    return syncObj;
}
export default syncObjectToUrl;
