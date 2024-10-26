import { ActivityStream } from '@/@type/api_object';
import axiosInstance from '@/apiClient/axiosConfig';
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
import { pagination } from '@/helpers/pagination';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import getObjecFormUrlParameters from '@/hooks/getObjectFormParameter';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Select, Table, Image } from 'antd';
import Title from 'antd/es/typography/Title';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { GetStaticPropsContext, NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { StringifiableRecord } from 'query-string';
import React, { useEffect, useState } from 'react';

interface PageProps {
    modal?: any;
}

const Page: NextPage<PageProps> = ({ modal }) => {
    const p = useTranslations("Placeholder")
    const router = useRouter()
    const { limit, offset, pageIndex, pageSize } = pagination(router, 1, 20)
    const [isReady, setIsReady] = useState(false)

    const { data, isFetching } = useQuery({
        queryKey: ['activityStream', router.asPath],
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
            title: t('entryno'),
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: t('email'),
            dataIndex: 'email',
            key: 'email',
            render: (text: string, record, index) => record?.user?.email
        },
        {
            title: ('Slug'),
            dataIndex: 'hostname',
            key: 'hostname',
            render: (text, record) => record?.vps?.hostname,
        },
        {
            title: ('ID'),
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: d('platform'),
            dataIndex: 'platform',
            key: 'platform',
            render: (text: string, record, index) => record?.platform?.name
        },
        {
            title: ('Downloaded'),
            dataIndex: 'downloaded',
            key: 'downloaded',
            render: (downloaded: boolean) => (downloaded) ? 'Yes' : 'No'
        },
        {
            title: ('Loop'),
            dataIndex: 'loop',
            key: 'loop',
        },
        {
            title: t('status'),
            dataIndex: 'status',
            key: 'status',
            render: (text) => (<StreamState state={text} />)
        },
        {
            title: t('start_time'),
            dataIndex: 'start_at',
            key: 'start_at',
            render: (text: string) => text == undefined ? 'Not schedule' : dayjs(text).format('YYYY/MM/DD HH:mm')
        },
        {
            title: t('end_time'),
            dataIndex: 'end_at',
            key: 'end_at',
            render: (text: string) => text == undefined ? 'Not schedule' : dayjs(text).format('YYYY/MM/DD HH:mm')
        },
        {
            title: t('createAt'),
            dataIndex: 'createAt',
            key: 'createAt',
            render: (text: string) => dayjs(text).format('YYYY/MM/DD')
        },

    ];
    const syncObj = syncObjectToUrl(router)
    const handleInput = debounce((e) => {
        syncObj({ keyword: e.target.value })
    }, 300)
    const platformQuery = usePlatformData();
    const s = useTranslations('StreamStatus')
    return <>
        <div className="md:flex py-3 gap-2 justify-between">
            <div className='grid gap-2 md:flex gap-2'>
                <SearchInput />
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
                    placeholder="Select platform"
                    onChange={(e) => {
                        syncObj({ platform: e ?? '' })
                    }}
                    allowClear
                />
                <SelectVps />
                <UserSelect />
                <Select defaultValue={''}
                    options={[
                        { value: '', label: <span>{s('all')}</span> },
                        { value: 'scheduling', label: <span>{s('scheduling')}</span> },
                        { value: 'initalize', label: <span>{s('initalize')}</span> },
                        { value: 'running', label: <span>{s('running')}</span> },
                        { value: 'stopped', label: <span>{s('stopped')}</span> },
                        { value: 'error', label: <span>{s('error')}</span> },
                    ]} className='w-full mt-2 sm:mt-0 sm:w-48'
                    onChange={(e) => {
                        syncObj({ ...router.query, status: e })
                    }}
                />
                <SelectDateForFilter />
            </div>
        </div>

        <Table dataSource={data?.data?.data.map((livestream: any, index: number) => ({
            ...livestream,
            key: pageIndex * pageSize + (index + 1) - pageSize,
        }))}

            scroll={{
                x: 400
            }}
            loading={isFetching}
            columns={columns}
            pagination={{
                total: data?.data?.total,
                pageSize: pageSize,
                current: pageIndex
            }}
            rowSelection={{
                type: 'checkbox'
            }}
            onChange={(pagination) => {
                syncObj({
                    pageIndex: pagination.current,
                })
            }}
            expandable={{
                expandedRowRender: (record) => <p style={{ margin: 0 }}>
                    <StreamLog stream_id={record.id + ''} />
                </p>,
            }}
        />
    </>
}

export default Page


export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
