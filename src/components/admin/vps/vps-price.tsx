import axiosInstance from '@/apiClient/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
interface VpsPriceProps {
    profile: string,
    profiles: any
}

const VpsPrice: React.FC<VpsPriceProps> = ({ profile, profiles }) => {
    const { data, isFetching, isError } = useQuery({
        queryKey: ['profile' + profile],
        queryFn: () => axiosInstance.get("vps-profile/get-price", {
            params: {
                profile
            }
        })
    })

    console.log("vps", data?.data)
    return <>${data?.data/ 100}</>
}

export default VpsPrice
