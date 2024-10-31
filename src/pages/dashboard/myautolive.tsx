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
} from "antd";
import EditLiveStreams from "@/components/live-streams/EditLiveStreams";
import LiveState from "@/components/client/LiveState";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { ColumnType, ColumnsType } from "antd/es/table";
import StreamState, { StreamType } from "@/components/autolive/StreamState";
import StreamAction from "@/components/autolive/stream-action";
import { DeleteFilled, DesktopOutlined, DownloadOutlined, StopOutlined } from "@ant-design/icons";
import SearchInput from "@/components/filters/SearchInput";
import StatisticStatus from "@/components/admin/order/statistic-status";
import { IoPlay } from "react-icons/io5";
import MutistreamsAction from "@/components/MutistreamsAction";
import CountdownTimer from "@/components/client/CountdownTimer";
import HorizoneMenu from "@/components/admin/HorizoneMenu";
import PlatformSelect from "@/components/admin/PlatformSelect";
import { usePlatformData } from "@/components/live-streams/CreateStreamByAdmin";
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
            title: t("entryno"),
            dataIndex: "key",
            key: "key",
            align: "center",
            width: 70
        },
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            ellipsis: true
        },
        {
            title: ("ID"),
            dataIndex: "id",
            key: "id",
        },
        {
            title: d("platform"),
            dataIndex: "platform",
            key: "platform",
            render: (text: string, record: any) => record?.platform?.name
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
            title: t("start_time"),
            dataIndex: "start_at",
            key: "start_at",
            ellipsis: true,
            render: (text) => (<>
                <CountdownTimer startTime={text} />
            </>)
        },
        {
            title: t('end_time'),
            dataIndex: 'end_at',
            key: 'end_at',
            render: (text: string) => text == undefined ? 'Not schedule' : dayjs(text).format('YYYY/MM/DD HH:mm')
        },
        {
            title: t("price"),
            dataIndex: "price",
            key: "price",
        },
        {
            title: t("status"),
            dataIndex: "status",
            key: "status",
            render: (text: string, record) => (
                record.downloaded ? <StreamState state={text} /> :
                    <Tooltip title="Downloading">
                        <Spin size="small" />
                    </Tooltip>
            ),
        },
        {
            title: t("createAt"),
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string) => (
                <>{dayjs(text).format("DD/MM/YYYY")}</>
            ),
        }
    ];

    const token = getCookie('token')
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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        placeholderData: (previousData) => previousData,
    });

    const [streamsSelected, setStreamsSelected] = useState<StreamDataType[]>([])
    const syncObj = syncObjectToUrl(router)
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: StreamDataType[]) => {
            setStreamsSelected(selectedRows)
        },
        getCheckboxProps: (record: StreamDataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    const s = useTranslations('StreamStatus')
    return (
        <>
            <Affix>
                <HorizoneMenu data={streamsSelected}>
                    <MutistreamsAction streamsSelected={streamsSelected} setStreamsSelected={setStreamsSelected} />
                </HorizoneMenu>
            </Affix>
            <div className="flex justify-between items-center">
                <div className={`sm:flex py-3 gap-2 transition duration-500 transform ${streamsSelected.length == 0 ? '' : ''}`}>
                    <SearchInput />
                    <Select
                        placeholder="Select platform"
                        style={{
                            width: 200
                        }} options={platformQuery?.data?.data?.platforms.map((platform: any) => ({
                            ...platform,
                            label: (
                                <div className="flex items-center gap-1">
                                    <Image width={20} src={platform.image} alt="image" />
                                    {platform?.name}
                                </div>
                            ),
                            value: platform.id,
                        }))} onChange={(e) => {
                            if (e == undefined) e = ""
                            syncObj({ ...router.query, platform: e })
                        }} allowClear />
                    <Select allowClear
                        options={[
                            { value: 'initalize', label: <span>{s('initalize')}</span> },
                            { value: 'scheduling', label: <span>{s('scheduling')}</span> },
                            { value: 'running', label: <span>{s('running')}</span> },
                            { value: 'stopped', label: <span>{s('stopped')}</span> },
                            { value: 'error', label: <span>{s('error')}</span> },
                        ]} className='w-full mt-2 sm:mt-0 sm:w-48'
                        placeholder="Select status"
                        onChange={(e) => {
                            syncObj({ ...router.query, status: e ?? '' })
                        }}
                    />
                </div>
            </div>
            <Table
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,

                }}
                loading={isFetching}
                onChange={(pagination) => {
                    syncObj({
                        pageIndex: pagination.current,
                    })
                }}
                pagination={{
                    total: data?.data?.total,
                    pageSize: pageSize,
                    current: pageIndex
                }}

                dataSource={data?.data.data.map((item: any, index: number) => ({
                    ...item,
                    key: pageIndex * pageSize + (index + 1) - pageSize,
                }))}
                scroll={{ x: 800 }}
                columns={columns}

            />
        </>
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
