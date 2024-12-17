import axiosInstance from '@/apiClient/axiosConfig';
import { usePlatformData } from '@/components/live-streams/CreateStreamByAdmin';
import EditLiveStreams from '@/components/live-streams/EditLiveStreams';
import { FilterFilled, SlackSquareFilled, YoutubeFilled } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Table, Image, Select } from 'antd';
import { ColumnType } from 'antd/es/table';
import Title from 'antd/es/typography/Title';
import React, { ReactNode, useEffect, useState } from 'react';
import LiveSpeed from './live-speed';
import { useRouter } from 'next/router';
interface LiveStreamProps {
    slug: any;
    setService: Function
}

const LiveStream: React.FC<LiveStreamProps> = ({ slug, setService }) => {

    const { data, isFetching } = useQuery({
        queryKey: ['livestream'],
        queryFn: () => axiosInstance.get(`/activity-stream/find-by-slug`, {
            params: {
                language: "en",
                slug: slug.slug,
            }
        }),
    })
    const platforms = usePlatformData()
    useEffect(() => {
        console.log(platforms?.data?.data?.platforms)
    }, [platforms])

    const columns: any = [
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
            width: 100,
            align: 'center',
            render: (text: string, record: any) => (
                <Image alt="" src="https://cdn-icons-png.flaticon.com/128/174/174883.png" width={25} />
            ),
            filterIcon: (filtered: boolean) => (
                <Image alt="" src="https://cdn-icons-png.flaticon.com/128/174/174883.png" width={15} preview={false} />
            ),
            filterMode: () => {
                return "menu";
            },
            filters: [],
        },
        {
            title: 'Speed',
            dataIndex: 'platform',
            key: 'platform',
            render: (text: string, record: any) => <LiveSpeed stream={{ ...record, ipv4: slug.ipv4 }} />,
        },
        {
            title: 'Key',
            dataIndex: 'stkey',
            key: 'stkey',
            ellipsis: true
        }
    ];

    const router = useRouter()
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([Number(router.query?.stream_id)]);
    useEffect(() => {
        setTimeout(() => {
            setService("vps-log" + Number(router.query?.stream_id))
        }, 1000)
    }, [router.query])
    return <>
        <Title level={5} className="text-center border-b">Live stream</Title>
        <Table id="live-table" rowKey="id" dataSource={data?.data?.map((data: any, index: number) => ({
            ...data, stkey: data.key, key: index + 1
        }))} loading={isFetching}
            columns={columns}
            className="border rounded"
            pagination={false}
            scroll={{ y: 230 }}
            onRow={(record) => {
                return {
                    onClick: () => {
                        console.log(record)
                        setService("vps-log" + record.id)
                        setSelectedRowKeys([record.id]);
                    }
                }
            }}
            rowSelection={{
                renderCell: () => <></>,
                type: 'radio',
                selectedRowKeys, // controlled selected row keys
            }}
        />

    </>
}

export default LiveStream
