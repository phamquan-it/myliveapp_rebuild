export const pagination = (router: any,
    defautPageIndex = 1,
    defautPageSize = 10
) => {
    const pageIndex:number = (!isNaN(Number(
        router.query.pageIndex))
    ) ? Number(router.query.pageIndex) : defautPageIndex;
    const pageSize:number = (!isNaN(Number(
        router.query.pageSize))
    ) ? Number(router.query.pageSize) : defautPageSize;

    return {
        pageIndex,
        pageSize,
        offset: (pageIndex - 1) * pageSize,
        limit: pageIndex * pageSize,
    }
}
