import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Image, Input, Modal, Select, Skeleton, Table } from "antd";
import Head from "next/head";
import { GetStaticPropsContext } from "next";
import { PlusCircleFilled, StarFilled } from "@ant-design/icons";
import { useFormatter, useTranslations } from "next-intl";
import TextArea from "antd/lib/input/TextArea";
import axiosClient from "@/apiClient/axiosClient";
import { getCookie } from "cookies-next";
import TableAction from "@/components/admin/TableAction";
import EditService from "@/components/admin/crudform/edit/EditService";
import CreateService from "@/components/admin/crudform/create/CreateService";
import PlatformSelect from "@/components/admin/PlatformSelect";
import Title from "antd/es/typography/Title";
import { useRouter } from "next/router";
import _ from "lodash";
import PlatformSelectForFilter from "@/components/admin/PlatformSelectForFilter";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
import UpdateService from "@/components/admin/crudform/update/UpdateService";
import filterOption from "@/hooks/filterOption";
import filterOptionByLabel from "@/hooks/filterOptionByLabel";
import axiosInstance from "@/apiClient/axiosConfig";
import SearchInput from "@/components/filters/SearchInput";
import { ColumnType, ColumnsType } from "antd/es/table";
import AdminLayout from "@/components/admin-layout";
import Link from "next/link";
const Page = () => {
    const router = useRouter();
    const token = getCookie("token");

    const t = useTranslations("MyLanguage");

    const columns: ColumnsType<any> = [
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",

        },
        {
            title: t("minorder"),
            dataIndex: "min",
            key: "min",
            align: "right",

        },
        {
            title: t("maxorder"),
            dataIndex: "max",
            key: "max",

            align: "right",
        },
        {
            title: t("level"),
            dataIndex: "level",
            align: "center",
            key: "level",

        },
        {
            align: "right",
            title: t("initial_rate"),
            dataIndex: "initial_rate",
            key: "initial_rate",
        },
        {
            title: t("rate_config"),
            dataIndex: "rate_config",
            key: "rate_config",
            align: "right",
        },
        {
            title: t("rate"),
            dataIndex: "rate",
            key: "rate",
            render: (rate: number) => (
                <>
                    <div className="flex gap-1">
                        <div>{rate}</div>
                    </div>
                </>
            )
        },

        {
            width: 200,
            title: t("action"),
            dataIndex: "id",
            key: "id",
            align: "center",
            render: (id: number) => <Button type='primary' onClick={() => {
            }}>{t('buy')}</Button>
        },
    ];
    const { data, isFetching, isError } = useQuery({
        queryKey: ["service", router.asPath],
        queryFn: (querykey: any) => {
            return axiosInstance.get(`/service/list?language=${router.locale}`, {
                params: {
                    keyword: router.query.keyword ?? ''
                }
            });
        },
    });
    const d = useTranslations('DashboardMenu')
    return (
        <AdminLayout selected={[]} breadcrumbItems={[
            {
                title: <Link href="/dashboard">{d('home')}</Link>
            },
            {
                title: d('services'),
            },

        ]} staticAction={(
            <CreateService />
        )}>
            <div className="">
                <Head>
                    <title>Service</title>
                    <link rel="icon" href="/logo.png" />
                </Head>
                <div>

                    <div
                        className="grid md:flex justify-between items-center my-3 gap-2"
                        id="filter"
                    >
                    </div>

                    <Skeleton loading={isFetching}>
                        <Table rowClassName="font-sans" scroll={{
                            x: 300
                        }} dataSource={data?.data?.services} columns={columns} />
                    </Skeleton>
                </div>
            </div>
        </AdminLayout>
    );
}
export default Page

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
