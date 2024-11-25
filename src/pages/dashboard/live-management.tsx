import { ActivityStream } from '@/@type/api_object';
import axiosInstance from '@/apiClient/axiosConfig';
import DateFilter from '@/components/DateFilter';
import MutistreamsAction from '@/components/MutistreamsAction';
import AdminLayout from '@/components/admin-layout';
import CreateNewStream from '@/components/admin/create-new-stream';
import StreamLog from '@/components/admin/streams/log';
import DeleteStream from '@/components/autolive/DeleteStream';
import StreamState from '@/components/autolive/StreamState';
import ViewAutoliveDetail from '@/components/autolive/ViewAutoliveDetail';
import SearchInput from '@/components/filters/SearchInput';
import SelectVps from '@/components/filters/SelectVps';
import UserSelect from '@/components/general/user-select';
import VpsSelect from '@/components/general/vps-select';
import CreateStreamByAdmin, { usePlatformData } from '@/components/live-streams/CreateStreamByAdmin';
import SelectDateForFilter from '@/components/live-streams/SelectDateForFilter';
import ViewStreamLog from '@/components/live-streams/ViewStreamLog';
import { pagination } from '@/helpers/pagination';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import getObjecFormUrlParameters from '@/hooks/getObjectFormParameter';
import { CheckOutlined, DownloadOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Select, Table, Image, Checkbox, ConfigProvider, Tooltip, TableProps } from 'antd';
import Title from 'antd/es/typography/Title';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { GetStaticPropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { StringifiableRecord } from 'query-string';
import React, { useEffect, useState } from 'react';


const Page = () => {
    const p = useTranslations("Placeholder")
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

    console.log(data)

    const t = useTranslations("MyLanguage")
    const d = useTranslations("DashboardMenu")
    const columns: ColumnType<ActivityStream>[] = [
        {
            title: ('ID'),
            dataIndex: 'id',
            key: 'id',
            render: (text: number) => (
                <span className="font-semibold text-blue-500">
                    {text}
                </span>
            )
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
                    {(record.loop == "infinity") ?
                        <Tooltip title="Loop">
                            <SyncOutlined className="!text-blue-600" />
                        </Tooltip>
                        : ""}
                    <Tooltip title={record.downloaded ? "Downloaded" : "Downloading"}>
                        {record.downloaded ? <CheckOutlined className="!text-green-700" /> : <DownloadOutlined />}
                    </Tooltip>
                </div>
            </div>)
        },
        {
            title: d('platform'),
            dataIndex: 'platform',
            key: 'platform',
            render: (text: string, record: any) => <>
                <Image width={25} src={record.platform?.image} alt="" />
            </>,
            align: "center",
            width: 100
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

        {
            title: t('action'),
            dataIndex: 'id',
            key: 'id',
            render: (text: string) => <ViewStreamLog id={text + ''} />
        }
    ];
    const syncObj = syncObjectToUrl(router)
    const handleInput = debounce((e) => {
        syncObj({ keyword: e.target.value })
    }, 300)
    const platformQuery = usePlatformData();
    const s = useTranslations('StreamStatus')
    const [streamsSelected, setStreamsSelected] = useState<any[]>([])
    const tableProps: TableProps<ActivityStream> = {
        rowKey: 'id',
        dataSource: data?.data?.data,
        scroll: { x: 400 },
        rowSelection: {
            type: "checkbox",
            onChange: (selectedRowKeys, selectedRows) => {
                setStreamsSelected(selectedRows)
            }
        },
        loading: isFetching,
        columns,
        pagination: {
            total: data?.data?.total,
            pageSize: pageSize,
            current: pageIndex
        },
        onChange: (pagination) => {
            syncObj({
                pageIndex: pagination.current,
            })
        }

    }
    return <AdminLayout selected={streamsSelected} breadcrumbItems={
        [
            {
                title: <Link href="/dashboard">{d('home')}</Link>
            },

            {
                title: d('livestreams'),
            },
        ]
    }
        actions={<>
            <MutistreamsAction streamsSelected={[{ id: 1 }]} setStreamsSelected={setStreamsSelected} />
        </>}
        filterOption={(
            <div className="flex gap-2 items-center hidden 2xl:flex">
                <Select className='w-48' options={platformQuery.data?.data?.platforms.map((platform: any) => ({
                    ...platform,
                    label: (
                        <div className="flex items-center gap-1">
                            <Image width={20} src={platform.image} alt="image" />
                            {platform?.name}
                        </div>
                    ),
                    value: platform.id,
                }))}
                    placeholder={p('selectplatform')}
                    onChange={(e) => {
                        syncObj({ platform: e ?? '' })
                    }}
                    allowClear
                />
                <SelectVps />
                <UserSelect />
                <Select
                    placeholder={p('select_status')}
                    allowClear
                    options={[
                        { value: 'scheduling', label: <span>{s('scheduling')}</span> },
                        { value: 'initalize', label: <span>{s('initalize')}</span> },
                        { value: 'running', label: <span>{s('running')}</span> },
                        { value: 'stopped', label: <span>{s('stopped')}</span> },
                        { value: 'error', label: <span>{s('error')}</span> },
                    ]}
                    style={{
                        width: 200
                    }}
                    onChange={(e) => {
                        syncObj({ ...router.query, status: e ?? '' })
                    }}
                />
                <DateFilter />
            </div>
        )} rightFilter={<>
            <Select className='w-48' options={platformQuery.data?.data?.platforms.map((platform: any) => ({
                ...platform,
                label: (
                    <div className="flex items-center gap-1">
                        <Image width={20} src={platform.image} alt="image" />
                        {platform?.name}
                    </div>
                ),
                value: platform.id,
            }))}
                placeholder={p('selectplatform')}
                onChange={(e) => {
                    syncObj({ platform: e ?? '' })
                }}
                allowClear
            />
            <SelectVps />
            <UserSelect />
            <Select
                placeholder={p('select_status')}
                allowClear
                options={[
                    { value: 'scheduling', label: <span>{s('scheduling')}</span> },
                    { value: 'initalize', label: <span>{s('initalize')}</span> },
                    { value: 'running', label: <span>{s('running')}</span> },
                    { value: 'stopped', label: <span>{s('stopped')}</span> },
                    { value: 'error', label: <span>{s('error')}</span> },
                ]}
                style={{
                    width: 200
                }}
                onChange={(e) => {
                    syncObj({ ...router.query, status: e ?? '' })
                }}
            />
            <DateFilter />

        </>}>
        <div className="my-3"></div>
        <ConfigProvider theme={{
            components: {
                Table: {
                    cellPaddingBlock: 3
                }
            }
        }}>
            <Table
                rowClassName='font-sans'


                {...tableProps}
            />
        </ConfigProvider>

    </AdminLayout>
}

export default Page


export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
