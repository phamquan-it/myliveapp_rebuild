interface Service {
    key: number,
    id: number,
    name: string,
    type: string,
    min: string,
    max: string,
    dripfeed: string,
    refill: string,
    cancel: string,
    level: number,
    description_vi: string,
    rate_config: number
}
interface ServiceQuery {
    language: string,
    platformId?: number,
    categoriesId?: number,
    providerId?: number,
    keyword?: string,
    status?: number,
    limit?: number,
    offset?: number
}
interface ServiceDetailQuery {
    language: string,
    id: number
}
interface ServiceUpdate {
    status: number,
    amount?: string,
    amount_vi?: string,
    exchange_rate: number
}
export type {
    Service,
    ServiceDetailQuery,
    ServiceQuery,
    ServiceUpdate
}