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
import { AppFilter } from '@/components/filters/filter';
import UserSelect from '@/components/general/user-select';
import VpsSelect from '@/components/general/vps-select';
import CreateStreamByAdmin, { usePlatformData } from '@/components/live-streams/CreateStreamByAdmin';
import SelectDateForFilter from '@/components/live-streams/SelectDateForFilter';
import ViewStreamLog from '@/components/live-streams/ViewStreamLog';
import { pagination } from '@/helpers/pagination';
import syncObjectToUrl, { removeEmptyStringProperties } from '@/helpers/syncObjectToUrl';
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
import { MdOutlineSync, MdOutlineSyncDisabled } from 'react-icons/md';


const Page = () => {
    const p = useTranslations("Placeholder")
    const router = useRouter()
    const { limit, offset, pageIndex, pageSize } = pagination(router, 1, 20)
    const [isReady, setIsReady] = useState(false)
    const platforms = Array.isArray(router.query.platform)
        ? router.query.platform // It's already an array
        : router.query.platform
            ? [router.query.platform] // Wrap the string in an array
            : '';
    const { data, isFetching } = useQuery({
        queryKey: ['activityStream', router.query],
        queryFn: () => axiosInstance.get("/activity-stream?language=en", {
            params: removeEmptyStringProperties({
                ...router.query,
                offset,
                limit,
                platforms,
                platform: ''
            })
        })
    })

    console.log()

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
            title: t('loop'),
            dataIndex: 'loop',
            key: 'loop',
            render: (text, record: any) => <>
                <div className="flex justify-center">{text == "infinity" ? <MdOutlineSync /> : <MdOutlineSyncDisabled />}</div>
            </>,
            align: "center",
            width: 100
        },
        {
            title: ('Vps'),
            dataIndex: 'vps',
            key: 'vps',
            render: (vps: any, record: any) => <>
                <Button type="link" href={`/dashboard/vps?slug=${vps?.hostname}&stream_id=${record?.id}`}>
                    {vps?.hostname}
                </Button>
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
        filterOptions={[AppFilter.PLATFORM, AppFilter.USER, AppFilter.VPS, AppFilter.STREAM_STATUS]}
        actions={<>
            <MutistreamsAction streamsSelected={streamsSelected} setStreamsSelected={setStreamsSelected} />
        </>}
    >
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
