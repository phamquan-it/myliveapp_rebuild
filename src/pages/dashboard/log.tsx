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
import AdminLayout from "@/components/admin-layout";
import Link from "next/link";

const Page = () => {
    const d = useTranslations("DashboardMenu");
    const t = useTranslations("MyLanguage");
    const columns: any = [
        {
            title: t("entryno"),
            dataIndex: "id",
            key: "id",

        },
        {
            title: t("desc"),
            dataIndex: "description",
            key: "description",
        },
        {
            title: t("action"),
            dataIndex: "action",
            key: "action"
        },
        {
            title: t("createAt"),
            dataIndex: "create_at",
            key: "create_at",
            render: (text: string) => (
                <>{dayjs(text).format("DD/MM/YYYY hh:mm:ss")}</>
            ),
        },

    ];
    const router = useRouter()
    const { limit, offset, pageSize, pageIndex } = pagination(router)
    const { data } = useQuery({
        queryKey: ['log'],
        queryFn: () => axiosInstance.get('/log/list?language=en&offset=0&limit=10')
    })
    useEffect(() => {
        console.log("LOg", data?.data)

    })
    return (
        <AdminLayout selected={[]} breadcrumbItems={[
            {
                title: <Link href="/dashboard">{d('home')}</Link>
            },
            {
                title: d('log'),
            },

        ]}>
            <Table
                rowKey="id"
                dataSource={data?.data.data}
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
