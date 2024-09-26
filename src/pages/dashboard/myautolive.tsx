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
} from "antd";
import EditLiveStreams from "@/components/live-streams/EditLiveStreams";
import LiveState from "@/components/client/LiveState";
import { useTranslations } from "next-intl";
import { getCookie } from "cookies-next";
import { ColumnType } from "antd/es/table";
import StreamState, { StreamType } from "@/components/autolive/StreamState";
import StreamAction from "@/components/autolive/stream-action";
import { DesktopOutlined } from "@ant-design/icons";
import SearchInput from "@/components/filters/SearchInput";
import StatisticStatus from "@/components/admin/order/statistic-status";
const Page = () => {

    const router = useRouter()
    const { limit, offset, pageIndex, pageSize } = pagination(router)
    const [isReady, setIsReady] = useState(false)
    const d = useTranslations("DashboardMenu");
    const t = useTranslations("MyLanguage");
    const columns: any = [
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
            dataIndex: "start_time",
            key: "start_time",
        },
        {
            title: t("end_time"),
            dataIndex: "end_time",
            key: "end_time",
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
            render: (text: string) => (
                <StreamState state={text} />
            ),
        },
        {
            title: t("createAt"),
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string) => (
                <>{dayjs(text).format("DD/MM/YYYY")}</>
            ),

        },
        {
            title: "",
            dataIndex: "id",
            key: "id",
            render: (text: any, record: any) => (
                <StreamAction personStream={text} status={record.status} reloadData={function(): void {
                    throw new Error("Function not implemented.");
                }} />
            )
        },

    ];

    const token = getCookie('token')
    const { data, isFetching, isError } = useQuery({
        queryKey: ["activity-stream", router.asPath],
        queryFn: () =>
            axiosInstance.get("/activity-stream?language=en", {
                params: {
                    keyword: router.query.keyword ?? '',
                    offset: (pageIndex - 1) * pageSize,
                    limit: pageIndex * pageSize,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        placeholderData: (previousData) => previousData,
    });

    const syncObj = syncObjectToUrl(router)
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: any) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    const s = useTranslations('StreamStatus')
    return (
        <>
            <Title level={2} className='text-center'>{('Autolive')}</Title>

            <div className="flex justify-between items-center">
                <div className="flex py-3 gap-2">
                    <SearchInput />
                    <Select defaultValue={0}
                        options={[
                            { value: 0, label: <span>{s('all')}</span> },
                            { value: 1, label: <span>{s('scheduling')}</span> },
                            { value: 2, label: <span>{s('starting')}</span> },
                            { value: 3, label: <span>{s('running')}</span> },
                            { value: 4, label: <span>{s('stopped')}</span> },
                        ]} style={{
                            width: 200
                        }} onChange={(e) => {
                            syncObj({ ...router.query, status: e })
                        }}
                    />
                </div>
                <Button type="primary" icon={<DesktopOutlined />}></Button>
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

                className="border rounded shadow-md"
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
