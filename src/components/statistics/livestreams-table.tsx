import { ActivityStream } from '@/@type/api_object';
import axiosInstance from '@/apiClient/axiosConfig';
import { pagination } from '@/helpers/pagination';
import { useQuery } from '@tanstack/react-query';
import { Table, Tooltip, Image, Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import StreamState from '../autolive/StreamState';
import { CheckOutlined, DownloadOutlined } from '@ant-design/icons';
import { DashboardRouter } from '@/enums/router/dashboard';
interface LivestreamsStatisticTableProps {
    currentTotal: number,
    remains: number
}

const LivestreamsStatisticTable: React.FC<LivestreamsStatisticTableProps> = ({ currentTotal, remains }) => {
    const t = useTranslations('MyLanguage')
    const router = useRouter()
    const { limit, offset, pageIndex, pageSize } = pagination(router, 1, 20)
    const [isReady, setIsReady] = useState(false)


    const { data, isFetching } = useQuery({
        queryKey: ['livestreams', router.asPath],
        queryFn: () => axiosInstance.get("/activity-stream?language=en", {
            params: {
                keyword: router.query.keyword ?? '',
                offset,
                limit,
                ...router.query
            }
        })
    })

    const columns: ColumnsType<ActivityStream> = [
        {
            title: t('entryno'),
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: t('email'),
            dataIndex: 'email',
            key: 'email',
            render: (text: string, record, index) => (<div className="flex justify-between">
                <div>
                    {record?.user?.email}
                </div>
                <div className="flex gap-3">
                    <Tooltip title={record.downloaded ? "Downloaded" : "Downloading"}>
                        {record.downloaded ? <CheckOutlined className="!text-green-700" /> : <DownloadOutlined />}
                    </Tooltip>
                </div>
            </div>)
        },
        {
            title: t('name'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('platform'),
            dataIndex: 'platform',
            key: 'platform',
            render: (text: string, record: any) => <>
                <Image width={25} src={record.platform?.image} alt="" />
            </>,
            align: "center",
            width: 100
        },
        {
            title: t('resolution'),
            dataIndex: 'resolution',
            key: 'resolution',
        },
        {
            title: t('start_time'),
            dataIndex: 'start_at',
            key: 'start_at',
            render: (text: string) => text == undefined ? t('notschedule') : dayjs(text).format('YYYY/MM/DD HH:mm')
        },
        {
            title: t('end_time'),
            dataIndex: 'end_at',
            key: 'end_at',
            render: (text: string) => text == undefined ? t('notschedule') : dayjs(text).format('YYYY/MM/DD HH:mm')
        },
        {
            title: t('status'),
            dataIndex: 'status',
            key: 'status',
            render: (text) => (<StreamState state={text} />)
        },
        {
            title: t('createAt'),
            dataIndex: 'createAt',
            key: 'createAt',
            render: (text: string) => dayjs(text).format('YYYY/MM/DD')
        },
    ];

    return <>
        <Table<ActivityStream> rowKey="id" showHeader={true} title={() => (
            <div className="flex justify-between">
                <div className="font-semibold text-slate-700 flex gap-5">
                    <div>
                        Revenuse: ${currentTotal - remains}
                    </div>
                    <div>
                        Cost:
                    </div>
                    <div>
                        Profit:
                    </div>
                </div>
                <Button href={DashboardRouter.LIVESTREAM} type="link" className="!px-0 !font-semibold !text-slate-700">Manage</Button>
            </div>
        )} dataSource={data?.data?.data} pagination={{
            pageSize
        }} columns={columns} />
    </>
}

export default LivestreamsStatisticTable
