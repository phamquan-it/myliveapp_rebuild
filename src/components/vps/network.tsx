import axiosInstance from '@/apiClient/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import { Progress } from 'antd';
import axios from 'axios';
import React, { CSSProperties } from 'react';
import { webdockConfig } from '../../../WEBDOCK_PROVIDER/APIRequest/config';
interface NetworkProps {
    slug: string
}

const Network: React.FC<NetworkProps> = ({ slug }) => {
    const { data, isFetching, isError } = useQuery({
        queryKey: ['metric' + slug],
        queryFn: () => axiosInstance.get(`/vps-provider/get-vps-network`, {
            params: { slug }
        })
    })


    const netwStyle: CSSProperties = {
        fontSize: 10

    }
    const used = Number((data?.data?.network?.total / data?.data?.network.allowed * 100))
    return <>
        <ul className="flex gap-3">
            <li style={netwStyle} className="font-sans">Used:{data?.data?.network?.total}/{data?.data?.network?.allowed} GiB</li>
        </ul>
        <Progress percent={used} showInfo={false} />
    </>
}

export default Network
