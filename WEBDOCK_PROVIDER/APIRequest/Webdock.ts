enum VIRTUALIZATION {
    CONTAINER = 'container',
    KVM = 'kvm'
}
export interface ServerProvision {
    name: string,
    slug: string,
    locationId: string,
    profileSlug: string,
    virtualization: VIRTUALIZATION,
    imageSlug: string,
}
export interface UpdateServerMetaData{
    name: string,
    description: string,
    notes: string,
    nextActionDate: string
}
export interface CREATE_SERVER_SNAPNOT{
    name: string
}

export interface RESTORE_SERVER_SNAPNOT{
    snapshotId: number
}
export interface AddPublicKey{
    name: string,
    publicKey: string
}
export enum ShellGroup{
    SUDO = 'sudo'
}
export enum ShellCategory{
    BASH = '/bin/bash',
    SH = 'bin/sh'
}
export interface CreateShellUser{
    username: string,
    password: string,
    group: ShellGroup,
    shell: CreateShellUser,
    publicKeys: any
}

export interface CreateAServerScript{
    scriptId: number,
    path: string,
    makeScriptExecutable: boolean,
    executeImmediately: boolean
}