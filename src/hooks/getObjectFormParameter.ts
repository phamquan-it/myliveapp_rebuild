const getObjecFormUrlParameters = (router:any) => {
    const queryString = router.asPath.split("?").slice(1).join("?");
    // Extract query parameters using URLSearchParams
    const params: any = new URLSearchParams(queryString);
    // Convert URLSearchParams to object
    const queryObject: any = {};
    for (const [key, value] of params) {
      queryObject[key] = value;
    }
    return queryObject;
};
export default getObjecFormUrlParameters;