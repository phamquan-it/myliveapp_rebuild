const isUser = (userProfile: any) => {
    if (userProfile?.data?.role_id != 3 && userProfile?.data?.role_id != 2) return true
    return false
}

export {
    isUser
}
