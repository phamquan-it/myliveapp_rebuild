import { Platform } from "./Platform";

interface Category {
    id: number,
    name: string,
    icon: string,
    location: number,
    createdAt: string,
    platformId: number,
    platform?: Platform
}
interface CategoryQuery {
    language: string,
    keyword?: string,
    platformId?: number,
    limit?: number,
    offset?: number
}
interface CategoryUpdate {
    name: string,
    icon: string,
    platformId: number
}
interface CategoryLocation{
    id: number,
    location: number
}
export type {
    Category,
    CategoryQuery,
    CategoryLocation,
    CategoryUpdate
}