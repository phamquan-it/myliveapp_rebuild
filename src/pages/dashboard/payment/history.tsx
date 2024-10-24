import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import HistoryStatitical from "@/components/admin/crudform/statistical/HistoryStatitical";
import { useQuery } from "@tanstack/react-query";
import _, { debounce } from "lodash";
import {
    Button,
    DatePicker,
    Form,
    Input,
    Table,
    TablePaginationConfig,
    Tag,
} from "antd";
import Title from "antd/es/typography/Title";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Select } from "antd/lib";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
import filterOptionByLabel from "@/hooks/filterOptionByLabel";
import { pagination } from "@/helpers/pagination";
import axiosInstance from "@/apiClient/axiosConfig";
import syncObjectToUrl from "@/helpers/syncObjectToUrl";
import SearchInput from "@/components/filters/SearchInput";

const Page = () => {
    const router = useRouter();
    const token = getCookie("token");
    const t = useTranslations("MyLanguage");
    const d = useTranslations("DashboardMenu");
    const columns: any = [
        {
            title: t("entryno"),
            dataIndex: "key",
            key: "key",
        },
        {
            title: t("account"),
            dataIndex: "account",
            key: "account",
            render: (text: string, record: any) => record?.user?.email,
        },
        {
            title: t("creator"),
            dataIndex: "userCreate",
            key: "userCreate",
            render: (text: string, record: any) => record?.userCreate?.email,
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },

        {
            title: t("paymethod"),
            dataIndex: "method",
            key: "card_type",
        },
        {
            title: t("date"),
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm:ss"),
        },
        {
            title: t("content"),
            dataIndex: "content",
            key: "order_info",
        },
        {
            align: "center",
            title: t("status"),
            dataIndex: "status",
            key: "status",
            render: (text: string) => (
                <div className="flex justify-center">
                </div>
            ),
        },
        {
            title: t("amountusd"),
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: t("rate"),
            dataIndex: "exchange_rate",
            key: "exchange_rate",
        },
        {
            witdth: 200,
            align: "center",
            title: t("action"),
            dataIndex: "id",
            key: "id",
            render: (text: string, record: any) => {
                return (
                    <div className="flex justify-center">
                    </div>
                );
            },
        },
    ];

    const p = useTranslations("Placeholder");

    const { limit, offset, pageIndex, pageSize } = pagination(router)
    const { data, isFetching, isError } = useQuery({
        queryKey: ["history", router],
        queryFn: () =>
            axiosInstance.get("payment/history", {
                params: {
                    language: "en",
                    keyword: router.query.keyword ?? '',
                    offset,
                    limit
                },
                headers: {
                    "Authorization": `Bearer ${token}`
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
            <div className="my-3 gap-3 grid lg:grid-cols-5 md:grid-cols-2">
                <HistoryStatitical
                    color="rgb(10, 143, 220)"
                    monney={0.207}
                    info="Current Viral SMM balance"
                />
                <HistoryStatitical
                    color="rgb(23, 182, 221)"
                    monney={0.207}
                    info="Current Viral SMM balance"
                />
                <HistoryStatitical
                    color="rgb(73, 189, 101)"
                    monney={0.207}
                    info="Completed"
                />
                <HistoryStatitical
                    color="rgb(244, 152, 32)"
                    monney={0.207}
                    info="Pending"
                />
                <HistoryStatitical
                    color="rgb(158, 73, 230)"
                    monney={0.207}
                    info="In Progress"
                />
            </div>
            <div className="sm:flex gap-1 my-3" id="filter">
                <SearchInput />
                <Select className='mt-2 sm:mt-0'
                    style={{ width: 200 }}
                    placeholder={p('select_status')}
                    showSearch
                    filterOption={filterOptionByLabel}
                    allowClear
                    options={[
                        { value: 'deny', label: "Deny" },
                        { value: 'inprogress', label: "In progess" },
                        { value: 'pendding', label: "Pending" },
                        { value: 'completed', label: "Completed" },
                    ]}
                    onChange={(e) => {
                        syncObj({ status: e })
                    }
                    } />
            </div>
            <Table
                loading={isFetching}
                scroll={{
                    x: 300
                }}
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
                dataSource={data?.data?.data
                    .map((platform: any, index: number) => ({
                        ...platform,
                        key: pageIndex * pageSize + (index + 1) - pageSize,
                    }))}
                columns={columns} />

        </>
    );
};
export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../../messages/${locale}.json`))
                .default,
        },
    };
}
