import axiosClient from "@/apiClient/axiosClient";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
    Table,
    TablePaginationConfig,
    Tag,
} from "antd";
import { AnyObject } from "antd/es/_util/type";
import {
    FilterValue,
    SorterResult,
    TableCurrentDataSource,
} from "antd/es/table/interface";
import Title from "antd/es/typography/Title";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
import SearchInput from "@/components/filters/SearchInput";
import { pagination } from "@/helpers/pagination";
import axiosInstance from "@/apiClient/axiosConfig";

const Page = () => {
    const d = useTranslations("DashboardMenu");
    const t = useTranslations("MyLanguage");
    const columns: any = [
        {
            title: t("entryno"),
            dataIndex: "key",
            key: "key",
            align: "center",
        },
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("email"),
            dataIndex: "email",
            key: "email",
        },
        {
            title: t("method"),
            dataIndex: "method",
            key: "method",
            render: (text: string) => (
                <Tag color={text == "POST" ? "orange" : "purple"}>{text}</Tag>
            ),
        },
        {
            title: t("action"),
            dataIndex: "action",
            key: "action",
        },
        {
            title: t("createAt"),
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string) => (
                <>{dayjs(text).format("DD/MM/YYYY hh:mm:ss")}</>
            ),
        },

    ];
    const router = useRouter()
    const { limit, offset, pageSize, pageIndex } = pagination(router)
    const { data } = useQuery({
        queryKey: ['log'],
        queryFn: ()=>axiosInstance.get('/log/list')
    }) 
    return (
        <>
            <Title level={2} className="text-center">
                {d("log")}
            </Title>
            <div className="my-3 flex gap-1">
                <div id="filter">
                    <SearchInput />
                </div>
            </div>
            <Table
                className="border rounded shadow-md"
                dataSource={data?.data.data.map((item: any, index: number) => ({
                    ...item,
                    key: pageIndex * pageSize + (index + 1) - pageSize,
                }))}
                scroll={{ x: 800 }}
                columns={columns}
                pagination={{
                    total: data?.data.total,
                    pageSize: pageSize,
                    current: pageIndex,
                    showSizeChanger: true,
                    position: ["bottomCenter"],
                }}
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
