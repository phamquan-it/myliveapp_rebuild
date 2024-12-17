import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosConfig";

const useExchangeRate = () => {
    return useQuery({
        queryKey: ['exchange-rate'],
        queryFn: () =>
            axiosInstance.get('/exchange-rate'),
    });
};

export {
    useExchangeRate
}
