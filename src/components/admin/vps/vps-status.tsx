import axiosWebdock from '@/apiClient/axiosWebdockConfig';
import { useQuery } from '@tanstack/react-query';
import { Tooltip } from 'antd';
import React from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
interface VpsStatusProps {
    slug?: string
}

const VpsStatus: React.FC<VpsStatusProps> = ({ slug }) => {
    const api_path = `/servers/${slug}`
    const info = useQuery({
        queryKey: ['info' + slug],
        queryFn: () => axiosWebdock.get(api_path)
    })
    return (<>
        <div className="flex justify-center">
            {(info?.data?.data?.status == "running") ?
                <FaPlay className="text-sky-500" />
                :
                <FaStop className="text-red-500" />
            }
        </div>
    </>)
}

export default VpsStatus
