import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Image, Input, Modal, Select, Table } from "antd";
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
export default function Index() {
    const router = useRouter();
    const token = getCookie("token");

    const [seriveData, setSeriveData] = useState({
        data: [],
        total: 0,
    });

    const t = useTranslations("MyLanguage");

    const columns: any[] = [
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",

        },
        {
            title: t("rate"),
            dataIndex: "rate",
            key: "rate",
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
            width: 200,
            title: t("action"),
            dataIndex: "id",
            key: "id",
            align: "center",

        },
    ];
    const { data, isFetching, isError } = useQuery({
        queryKey: ["service", router.asPath],
        queryFn: (querykey: any) => {
            console.log(querykey);

            return axiosInstance.get(`/service/list?language=${router.locale}`, {
                params: {
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },
    });
    useEffect(() => {
        console.log(data?.data?.services)
    }, [data])

    const p = useTranslations("Placeholder")
    return (
        <div className="">
            <Head>
                <title>Service</title>
                <link rel="icon" href="/logo.png" />
            </Head>
            <div>
                <>
                    <Title level={2} className="text-center">
                        {t("service")}
                    </Title>

                    <div
                        className="grid md:flex justify-between items-center my-3"
                        id="filter"
                    >
                        <div>
                            <Input placeholder={p('search')}/>
                        </div>
                    </div>

                    <Table
                        className="border rounded-md shadow-md overflow-hidden"
                        loading={isFetching}
                        dataSource={data?.data?.services
                            .map((service: any, index: number) => ({
                                ...service, key: index
                            }))}
                        columns={columns}
                        expandable={{
                            expandedRowRender: (record: any) => (
                                <TextArea
                                    value={record.description_en}
                                    readOnly
                                    autoSize
                                />
                            ),
                            rowExpandable: (record) =>
                                record?.description_en !== undefined,
                        }}
                        scroll={{ x: 1000 }}
                        pagination={{
                            position: ["bottomCenter"],
                            defaultCurrent: 1,
                            showSizeChanger: true,
                            pageSize: 20,
                        }}
                        onChange={(pagination: any) => {
                        }}
                    />
                </>
            </div>
        </div>
    );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
