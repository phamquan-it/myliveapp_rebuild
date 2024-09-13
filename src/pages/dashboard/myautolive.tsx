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
const Page = () => {

    const router = useRouter()
    const { limit, offset, pageIndex, pageSize } = pagination(router)
    const [isReady, setIsReady] = useState(false)
    const d = useTranslations("DashboardMenu");
    const t = useTranslations("MyLanguage");
    const columns:any = [
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
            title: t("status"),
            dataIndex: "status",
            key: "method",
            render: (text: string) => (
                <LiveState liveKey="" platfornId={1} state={false} />
            ),
        },
        {
            title: t("createAt"),
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string) => (
                <>{dayjs(text).format("DD/MM/YYYY hh:mm:ss")}</>
            ),

        },
        {
            title: t("action"),
            dataIndex: "action",
            key: "id",
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
    const handleInput = debounce((e) => {
        syncObj({ keyword: e.target.value })
    }, 300)

    return (
        <>
            <Title level={2} className="text-center">
                {'Autolive'}
            </Title>
            <div className="grid grid-cols-4 gap-3">
                <Card title="" style={{
                    backgroundColor:'#1677ff'
                    }}>
                     Initalize
                </Card>
                <Card title="" className='bg-green-400'>
                    Running
                </Card>
                <Card title="" className='bg-orange-400'>
                    Pendding
                </Card>
                <Card title="" className='bg-rose-500'>
                    Stopped
                </Card>

            </div>
            <div className="flex py-3 gap-2">
                <Input style={{
                    width: 200
                }} placeholder="Search..." onChange={handleInput} defaultValue={router.query.keyword ?? ''} />
                <Select defaultValue={0}
                    options={[
                        { value: 0, label: <span>All</span> },
                        { value: 1, label: <span>Initalize</span> },
                        { value: 2, label: <span>Pending</span> },
                        { value: 3, label: <span>Running</span> },
                        { value: 4, label: <span>Stopped</span> },
                    ]} style={{
                        width: 100
                    }} onChange={(e)=>{
                        syncObj({...router.query, status:e})
                    }}
                />
            </div>
            <Table
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
