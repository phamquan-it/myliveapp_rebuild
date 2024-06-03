import { Platform } from "@/@type";
import axiosClient from "./axiosClient";
import { platform } from "os";
export interface PlatformParams{
    language:string,
    keyword: string,
    offset:  number
}

const getListPlatform = async (params:PlatformParams):Promise<Platform[]>=>{
    const response = await axiosClient.get<Platform[]>('/platform/list', {
        params
    });
    return response.data;
}
const  getDetailPlatform =  async (id:number, locale:string):Promise<Platform>=>{
    const response = await axiosClient.get<Platform>(`/platform/detail/${id}?language=${locale}`);
    return response.data;
}
const editPlatform = async (platform:Platform,id:number, locale:string)=>{
    const response = await axiosClient.patch<Platform>(
        `/platform/update/${id}?language=${locale}`,
         platform
    );
    return response.data;
}
const deletePlatform = async (id:number,  locale:string)=>{
    const response = await axiosClient.delete(`/platform/delete/${id}?language=${locale}`);
    return  response.data;
}

export  {
    getListPlatform,
    getDetailPlatform,
    editPlatform,
    deletePlatform
}