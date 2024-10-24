import axiosInstance from '@/apiClient/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import { Input } from 'antd';
import React from 'react';
interface StreamLogProps {
    stream_id: string
}

const StreamLog: React.FC<StreamLogProps> = ({ stream_id }) => {
    const { data, isFetching, isError } = useQuery({
        queryKey: ['stream' + stream_id],
        queryFn: () => axiosInstance.get('autolive-control/get-log-file/' + stream_id)
    })

    return <>
        <Input.TextArea rows={5}  value={data?.data} readOnly/>
    </>

}

export default StreamLog
