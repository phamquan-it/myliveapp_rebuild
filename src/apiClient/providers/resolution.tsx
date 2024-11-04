import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosConfig";

export interface Resolution {
    key: string,
    description: string
}
export const useResolutionList = () => {
    return useQuery({
        queryKey: ['resolution'],
        queryFn: (data: any) => axiosInstance.get<Resolution[]>('resolution'),
    });
};


