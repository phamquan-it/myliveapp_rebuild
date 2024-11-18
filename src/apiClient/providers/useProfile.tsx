import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '../axiosConfig';

export const useProfile = () => {
    return useQuery({
        queryKey: ["info"],
        queryFn: () =>
            axiosInstance.get(`/auth/profile`),
    });
}
