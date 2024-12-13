import axiosClient from "@/apiClient/axiosClient";
import _ from "lodash";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '@/apiClient/axiosConfig';
import TableAction from '@/components/admin/TableAction';
import CreatePlatform from '@/components/general/create-platform';
import { pagination } from '@/helpers/pagination';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import getObjecFormUrlParameters from '@/hooks/getObjectFormParameter';
import Title from 'antd/es/typography/Title';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { GetStaticPropsContext } from 'next';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import {
    Affix,
    Button,
    Card,
    DatePicker,
    Form,
    Input,
    message,
    Modal,
    Select,
    Table,
    TablePaginationConfig,
    Tag,
    Image,
    Spin,
    Tooltip,
    Divider,
} from "antd";
import EditLiveStreams from "@/components/live-streams/EditLiveStreams";
import LiveState from "@/components/client/LiveState";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { ColumnType, ColumnsType, TableProps } from "antd/es/table";
import StreamState, { StreamType } from "@/components/autolive/StreamState";
import StreamAction from "@/components/autolive/stream-action";
import { CheckOutlined, DeleteFilled, DesktopOutlined, DownloadOutlined, StopOutlined, SyncOutlined } from "@ant-design/icons";
import SearchInput from "@/components/filters/SearchInput";
import StatisticStatus from "@/components/admin/order/statistic-status";
import { IoPlay } from "react-icons/io5";
import MutistreamsAction from "@/components/MutistreamsAction";
import CountdownTimer from "@/components/client/CountdownTimer";
import HorizoneMenu from "@/components/admin/HorizoneMenu";
import PlatformSelect from "@/components/admin/PlatformSelect";
import { usePlatformData } from "@/components/live-streams/CreateStreamByAdmin";
import { FaPlay } from "react-icons/fa";
import AdminLayout from "@/components/admin-layout";
import Link from "next/link";
import { AppFilter } from "@/components/filters/filter";
export interface StreamDataType {
    createAt?: string
    download_link?: string
    duration?: number
    end_at?: string
    id?: number
    key?: string
    loop?: string
    name?: string
    platform?: any[]
    platformId?: number
    resolution?: number
    start_at?: string
    status?: string
    updateAt?: string
    user?: any
    userId?: number
    vps?: string
    vpsId?: number
    downloaded?: boolean
}
const Page = () => {

    const router = useRouter()
    const { limit, offset, pageIndex, pageSize } = pagination(router)
    const [isReady, setIsReady] = useState(false)
    const d = useTranslations("DashboardMenu");
    const t = useTranslations("MyLanguage");
    const platformQuery = usePlatformData();
    const columns: ColumnsType<StreamDataType> = [
        {
            title: ("ID"),
            dataIndex: "id",
            key: "id",
            render: (text) => (
                <span className="font-semibold">
                    {text}
                </span>
            )
        },
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            ellipsis: true,
            render: (text, record) => (<>
                <div className="flex justify-between">
                    <div className="w-8/12 overflow-hidden">
                        {text}
                    </div>
                    {record.downloaded ?
                        <CheckOutlined style={{
                            color: "green"
                        }} /> :
                        <Tooltip title="Downloading">
                            <DownloadOutlined />
                        </Tooltip>
                    }
                </div>
            </>)
        },
        {
            title: d("platform"),
            dataIndex: "platform",
            key: "platform",
            render: (text: string, record: any) => <>
                <Image width={25} src={record.platform?.image} alt="" />
            </>,
            align: "center"
        },
        {
            title: t("resolution"),
            dataIndex: "resolution",
            key: "resolution",
        },
        {
            title: t("duration"),
            dataIndex: "duration",
            key: "duration",
        },
        {
            title: t("loop"),
            dataIndex: "loop",
            key: "loop",
            render: (text: string, record: any) => <SyncOutlined className="!text-sky-600" />
        },

        {
            title: t("start_time"),
            dataIndex: "start_at",
            key: "start_at",
            render: (text) => (<>
                <CountdownTimer startTime={text} />
            </>),
            ellipsis: true
        },
        {
            title: t('end_time'),
            dataIndex: 'end_at',
            key: 'end_at',
            render: (text: string) => text == undefined ? 'Not schedule' : dayjs(text).format('YYYY/MM/DD HH:mm'),
        },
        {
            title: t("price"),
            dataIndex: "price",
            key: "price",
            render: (text) => `$${text}`
        },
        {
            title: t("status"),
            dataIndex: "status",
            key: "status",
            render: (text: string, record) => (
                <StreamState state={text} />
            ),
        },
        {
            title: t('createAt'),
            dataIndex: 'createAt',
            key: 'createAt',
            render: (text: string) => dayjs(text).format('YYYY/MM/DD')
        },
    ];

    const { data, isFetching, isError } = useQuery({
        queryKey: ["activityStream", router.asPath],
        queryFn: () =>
            axiosInstance.get("/activity-stream/client-activity-stream?language=en", {
                params: {
                    keyword: router.query.keyword ?? '',
                    offset: (pageIndex - 1) * pageSize,
                    limit: pageIndex * pageSize,
                    status: router?.query?.status,
                    platform: router?.query?.platform
                },
            }),
        placeholderData: (previousData) => previousData,
    });

    const [streamsSelected, setStreamsSelected] = useState<StreamDataType[]>([])
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const syncObj = syncObjectToUrl(router)
    const s = useTranslations('StreamStatus')

    // handle table
    const tableProps: TableProps = {
        rowKey: 'id',
        rowSelection: {
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: StreamDataType[]) => {
                setSelectedRowKeys(selectedRowKeys)
                setStreamsSelected(selectedRows)
            },
            getCheckboxProps: (record: StreamDataType) => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
            selectedRowKeys
        },
        columns,
        rowClassName: "!font-sans",
        loading: isFetching,
        onChange: (pagination) => {
            syncObj({
                pageIndex: pagination.current,
            })
        },
        dataSource: data?.data.data.map((item: any, index: number) => ({
            ...item,
            key: pageIndex * pageSize + (index + 1) - pageSize,
        })),
        scroll: { x: 800 },
        pagination: {
            total: data?.data?.total,
            pageSize: pageSize,
            current: pageIndex
        }
    }
    const p = useTranslations("Placeholder")
    return (
        <AdminLayout selected={streamsSelected} breadcrumbItems={
            [
                {
                    title: <Link href="/dashboard">{d('home')}</Link>
                },
                {
                    title: d('myautolive'),
                },
            ]
        } actions={
            <MutistreamsAction streamsSelected={streamsSelected} setStreamsSelected={setStreamsSelected} setSelectedRowKeys={setSelectedRowKeys} />
        }
        >
            <Table {...tableProps} />
        </AdminLayout>
    );
};
export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
