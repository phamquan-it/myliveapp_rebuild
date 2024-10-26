export interface User {
    id?: string
    name?: string
    email?: string
    remains?: number
    total?: number
    role_id?: number
    isActive?: boolean
    createAt?: string
    updateAt?: string
}

export interface Vps {
    vpsProvider?: number
    manufacturer: string
    rand: string,
    vendor: string,
    family: string,
    model: string,
    stepping: string,
    revision: string,
    voltage: string,
    speed: number,
    speedMin: string,
    speedMax: string,
    governor: string,
    cores: number,
    physicalCores: number,
    performanceCores: number,
    efficiencyCores: number,
    processors: number,
    socket: string,
    virtualization: boolean,
    platform: string,
    distro: string,
    release: string,
    codename: string,
    kernel: string,
    arch: string,
    hostname: string,
    fqdn: string,
    codepage: string,
    logofile: string,
    serial: string,
    build: string,
    servicepack: string,
    uefi: boolean,
    createAt: string,
    updateAt: string,
    ipv4: string,
    port: number
}


export interface Platform {
    id: number,
    name: string,
    rmtp: string,
    image: string,
    location: number,
    createAt: string,
    updateAt: string
}

export interface ActivityStream {
    id?: number
    key?: string
    status?: string
    createAt?: string
    updateAt?: string
    user?: User,
    platform?: Platform
    vps?: Vps
    resolution?: string | null,
    start_at?: string,
    end_at?: string
    downloaded: any
}
