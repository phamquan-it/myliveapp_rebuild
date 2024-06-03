import { ReactNode } from "react"

interface Platform{
    key: number,
    id: number,
    name:  string,
    icon: string,
    location: number,
    createdAt: string,
    value?:string | number,
    label?:ReactNode
}
interface PlatformAdd{
    name: string,
    icon: string
}
interface PlatformFilter{
    language?: string,
    keyword?: string,
    offset?: number
}
export type{
    Platform,
    PlatformAdd,
    PlatformFilter
}
