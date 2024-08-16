import axiosInstance from '@/apiClient/axiosConfig';
import EditLiveStreams from '@/components/live-streams/EditLiveStreams';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect } from 'react';
interface LiveStreamProps {
    slug: string;
}

const LiveStream: React.FC<LiveStreamProps> = ({ slug }) => {

    const { data, isFetching } = useQuery({
        queryKey: ['livestream'],
        queryFn: () => axiosInstance.get(`/activity-stream/find-by-slug?language=en&slug=${slug}`),
    })
    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render: (text: string, record: any, index: number) => index + 1,
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: string, record: any, index: number) => {
                return record?.user?.email
            }
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any, index: number) => {
                return record?.user?.name
            }

        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            key: 'platform',

        },
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            
        },
       
    ];

    return <>
        <Title level={5} className="text-center border-b">Live stream</Title>
        <Table dataSource={data?.data} loading={isFetching} columns={columns} className="border rounded" />

    </>
}

export default LiveStream
