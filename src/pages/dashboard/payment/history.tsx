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
            dataIndex: "card_type",
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
            dataIndex: "order_info",
            key: "order_info",
        },
        {
            align: "center",
            title: t("status"),
            dataIndex: "status",
            key: "status",
            render: (text: string) => (
                <div className="flex justify-center">
                    <Tag
                        color={
                            text == "-1"
                                ? "red"
                                : text == "1"
                                    ? "green"
                                    : text == "3"
                                        ? "orange"
                                        : "cyan"
                        }
                    >
                        {text == "-1"
                            ? "Deny"
                            : text == "1"
                                ? "Completed"
                                : text == "3"
                                    ? "Pending"
                                    : "In Progress"}
                    </Tag>
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
            align: "right",
            title: t("amountvnd"),
            dataIndex: "amount_vi",
            key: "amount_vi",
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
        queryKey: ["platform", router],
        queryFn: () =>
            axiosInstance.get("/platform/list", {
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
            <Title level={2} className="text-center">
                {d("paymenthistory")}
            </Title>
            <div className="flex gap-1 my-3" id="filter">
                <Input
                    placeholder={p("search")} defaultValue={router?.query?.keyword}
                    style={{ width: 200 }} onChange={handleInput}
                />
                <Select
                    style={{ width: 200 }}
                    placeholder={p('select_status')}
                    showSearch
                    filterOption={filterOptionByLabel}
                    allowClear
                    options={[
                        { value: -1, label: "Deny" },
                        { value: 2, label: "In progess" },
                        { value: 3, label: "Pending" },
                        { value: 1, label: "Completed" },
                    ]}
                />
            </div>
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
            <Table
                dataSource={[]}
                columns={columns}
                className="border rounded-md shadow overflow-hidden"
                scroll={{ x: 800 }}
            />
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
