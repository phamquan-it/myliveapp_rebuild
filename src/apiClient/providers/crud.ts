const platformCRUD = {
    list: '/platform/list',
    create: '/platform/create',
    update: '/platform/update',
    delete: '/platform/delete'
}

const categoryCRUD = {
    list: '/category/list',
    create: '/category/create',
    update: '/category/update',
    delete: '/category/delete'
}

const userCRUD = {
    list: '/user/list',
    reset_password: '/user/reset_pasword',
    update_status: '/user/update_status',
    update_profile: '/user/profile'
}

const myAutolive = {
    create: '/my_autolive/create-new-stream',
    list: '/my_autolive/list',
    delete: '/my_autolive/delete',
    update_status: '/my_autolive/update_status'
}

const logApi = {
    list: "/log/list"
}

const statistics= {
    statistic:'/statistic'
}
const refundApi = {
    list: '/refund/list'
}
const paymentApi = {
    history: '/payment/history'
}
const cashflowApi ={
    list: '/cashflow/list'
}
const cronApi = {
    list: '/cron/list'
}
const orderAPi = {
    list: '/order/list',
    info: '/order/info'
}
const settingsApi = {
    settings:'/settings',
    update_settings:'settings/update'
}
const voucherApi = {
    voucherApi: 'voucher/list'
}


export {
    voucherApi,
    settingsApi,
    orderAPi,
    cronApi,
    platformCRUD,
    categoryCRUD,
    userCRUD,
    logApi,
    myAutolive,
    statistics,
    refundApi,
    paymentApi,
    cashflowApi
}
