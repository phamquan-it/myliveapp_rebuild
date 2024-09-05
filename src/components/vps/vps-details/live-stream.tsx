import axiosInstance from '@/apiClient/axiosConfig';
import { usePlatformData } from '@/components/live-streams/CreateStreamByAdmin';
import EditLiveStreams from '@/components/live-streams/EditLiveStreams';
import { FilterFilled, SlackSquareFilled, YoutubeFilled } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Table, Image, Select } from 'antd';
import { ColumnType } from 'antd/es/table';
import Title from 'antd/es/typography/Title';
import React, { ReactNode, useEffect } from 'react';
interface LiveStreamProps {
    slug: string;
    setService: Function
}

const LiveStream: React.FC<LiveStreamProps> = ({ slug, setService }) => {

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
    const platforms = usePlatformData()
    useEffect(() => {
        console.log(platforms?.data?.data?.platforms)
    }, [platforms])

    const columns: ColumnType<any> = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            width: 50
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: string, record: any, index: number) => {
                return record?.user?.email
            },
            ellipsis: true

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
                <Image alt="" src="https://cdn-icons-png.flaticon.com/128/174/174883.png" width={25} />
            ),
            filterIcon: (filtered: boolean) => (
                <Image alt="" src="https://cdn-icons-png.flaticon.com/128/174/174883.png" width={15} preview={false} />
            ),
            filterMode: () => {
                return "menu";
            },
            filters:[
            { text: '>=35', value: 'gte35' },
            { text: '<18', value: 'lt18' },
          ],
        },
        {
            title: 'Speed',
            dataIndex: 'platform',
            key: 'platform',
            render: () => '1x'
        },
        {
            title: 'Key',
            dataIndex: 'stkey',
            key: 'stkey',
            ellipsis: true
        },

    ];

    return <>
        <Title level={5} className="text-center border-b">Live stream</Title>
        <Table dataSource={data?.data?.map((data: any, index: number) => ({
            ...data, stkey: data.key, key: index + 1
        }))} loading={isFetching} columns={columns} className="border rounded" onChange={() => {

        }} pagination={false}
            scroll={{ y: 230 }}
            onRow={(record) => {
                return {
                    onClick: () => {
                        console.log(record)
                        setService("vps-log" + record.id)
                    }
                }
            }}
        />

    </>
}

export default LiveStream
