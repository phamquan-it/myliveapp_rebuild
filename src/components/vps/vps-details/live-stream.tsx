import axiosInstance from '@/apiClient/axiosConfig';
import EditLiveStreams from '@/components/live-streams/EditLiveStreams';
import { useQuery } from '@tanstack/react-query';
import { Table, Image } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect } from 'react';
interface LiveStreamProps {
    slug: string;
}

const LiveStream: React.FC<LiveStreamProps> = ({ slug }) => {

    const { data, isFetching } = useQuery({
        queryKey: ['livestream'],
        queryFn: () => axiosInstance.get(`/activity-stream/find-by-slug`, {
            params: {
                language: "en",
                slug: slug,
                offset: 0,
                limit: 5
            }
        }),
    })
    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
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
            render: (text: string, record: any) => (
                <Image src="https://cdn-icons-png.flaticon.com/128/174/174883.png" width={32}/>
            )

        },
        {
            title: 'Key',
            dataIndex: 'stkey',
            key: 'stkey',

        },

    ];

    return <>
        <Title level={5} className="text-center border-b">Live stream</Title>
        <Table dataSource={data?.data?.map((data: any, index: number) => ({
            ...data, stkey: data.key, key: index + 1
        }))} loading={isFetching} columns={columns} className="border rounded" onChange={() => {

        }} pagination={{
            pageSize: 5
            }} />

    </>
}

export default LiveStream
