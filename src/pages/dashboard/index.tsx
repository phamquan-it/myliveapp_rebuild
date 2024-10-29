"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
    ssr: false,
});
import DashBoardLayout from "@/components/admin/DashBoardLayout";
const data = {
    labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ],
    datasets: [
        {
            label: "Revenue",
            data: [65000, 59000, 80000, 81000, 56000, 75000, 60000],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
        },
    ],
};

import { GetStaticPropsContext } from "next";
import { Avatar, Input, List, Skeleton, Switch, Table, Tag } from "antd";
import { useTranslations } from "use-intl";
import DashBoardStatical from "@/components/admin/crudform/statistical/DashboardStatiticcal";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/apiClient/axiosConfig";

const Page = () => {
    const t = useTranslations("MyLanguage");
      const columns: any[] = [
        {
            title: "ID Orders",
            dataIndex: "id",
            key: "id",
            align: "center",
        },
        {
            title: t("service"),
            dataIndex: "service",
            key: "service",
            render: (text: any, record: any) => record?.service?.name,
            ellipsis: true,
        },

        {
            title: "User	",
            dataIndex: "key",
            key: "key",
            align: "center",
            render: (text: any, record: any) => record?.user?.email,
            ellipsis: true,
        },
        {
            title: t("createat"),
            dataIndex: "create_date",
            key: "create_date",
            align: "center",
            render: (text: string) => (
                <>
                    {dayjs(text).format("YYYY-MM-DD")}
                </>
            ),
        },

        {
            title: "Charge",
            dataIndex: "charge",
            key: "charge",
            render: (text: string) => parseFloat(text).toFixed(5),
        },
        {
            title: "Actually spent",
            dataIndex: "order_id",
            key: "order_id",
            render: () => 0,
        },
        {
            title: "Start count",
            dataIndex: "start_count",
            key: "start_count",
            render: (text: any) =>
                text != null || text != undefined || text != null ? text : 0,
        },
        {
            title: t("quantity"),
            dataIndex: "quantity",
            key: "quantity",
        },

        {
            title: t("remains"),
            dataIndex: "remains",
            key: "remains",
        },
        {
            title: t("status"),
            dataIndex: "status",
            key: "status",
            render: (text: string) => {
                return (
                    <div className="flex justify-center">
                        <Tag
                            color={
                                text == "Completed"
                                    ? "green"
                                    : text == "In progress"
                                        ? "yellow"
                                        : text == "Canceled"
                                            ? "orange"
                                            : text == "Processing"
                                                ? "cyan"
                                                : text == "Partial"
                                                    ? "blue"
                                                    : text == "Pending"
                                                        ? "yellow"
                                                        : "red"
                            }
                        >
                            {text == undefined ? "Null" : text}
                        </Tag>
                    </div>
                );
            },
        },
    ];



    const cashflowQuery = useQuery({
        queryKey: ["cashflow"],
        queryFn: () => axiosInstance.get('/cashflow/list', {
            params: {
                language: "en",
                offset: 0,
                limit: 10
            }
        }),
        placeholderData: (previousData) => previousData,
    });

    const orderQuery = useQuery({
        queryKey: ["orders"],
        queryFn: () =>
            axiosInstance.get("/order?language=en", {
                params: {
                    offset: 0,
                    limit: 10,
                },
            }),
        placeholderData: (previousData) => previousData,
    });


    return (
        <>
            <div>
                <DashBoardStatical />
            </div>
            <div className=" grid md:grid-cols-2 gap-3">
                <div className="Payment rounded border overflow-hidden shadow">
                    <div
                        className="py-3 font-medium ps-3 border-b text-gray-600"
                        style={{ fontSize: 14 }}
                    >
                        Cashflow
                    </div>

                    <Table loading={cashflowQuery.isFetching}
                        scroll={{
                            x: 300
                        }}
                        dataSource={cashflowQuery?.data?.data?.data.map((cashflow: any, index: number) => ({ ...cashflow, key: index + 1 }))} columns={
                            [
                                {
                                    title: t("entryno"),
                                    dataIndex: "key",
                                    key: "key",
                                    width: "6%",
                                    align: "center",

                                },
                                {
                                    title: "Description",
                                    dataIndex: "description",
                                    key: "description",
                                },
                                {
                                    title: ("Balance"),
                                    dataIndex: "balance",
                                    key: "balance",
                                    width: "13%",
                                    align: "center",
                                },
                                {
                                    title: ("Inflow"),
                                    dataIndex: "inflow",
                                    key: "inflow",
                                    width: "10%",
                                    align: "center",
                                },
                                {
                                    title: ("outflow"),
                                    dataIndex: "outflow",
                                    key: "outflow",
                                    width: "10%",
                                    align: "right",
                                },
                                {
                                    title: t("createat"),
                                    dataIndex: "createdAt",
                                    key: "createdAt",
                                    width: "15%",
                                    align: "center",
                                    render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
                                },
                            ]

                        } pagination={false} />
                </div>
                <div className="Payment rounded border overflow-hidden shadow">
                    <div
                        className="py-3 font-medium ps-3 border-b text-gray-600"
                        style={{ fontSize: 14 }}
                    >
                        Vps logs
                    </div>

                    <Table
                        scroll={{
                            x: 300
                        }}

                        dataSource={[
                            {
                                key: '1',
                                slug: 'aglive1',
                                stream_name: 'test 1',
                                log: 'input output error',

                            },
                            {
                                key: '2',
                                slug: 'aglive1',
                                stream_name: 'test 1',
                                log: 'completed',

                            },
                        ]} columns={[
                            {
                                title: 'No.',
                                dataIndex: 'key',
                                key: 'key',
                            },
                            {
                                title: 'Slug',
                                dataIndex: 'slug',
                                key: 'slug',
                            },
                            {
                                title: 'Stream name',
                                dataIndex: 'stream_name',
                                key: 'stream_name',
                            },

                            {
                                title: 'Log',
                                dataIndex: 'log',
                                key: 'log',
                            },
                            {
                                title: 'Action',
                                dataIndex: 'action',
                                key: 'action',
                            },

                        ]} pagination={false} />
                </div>


            </div>
            <Table title={() => <span className=''>
                Recent orders
            </span>}

                dataSource={orderQuery?.data?.data.data.map((item: any, index: number) => ({
                    ...item,
                    key: index + 1,
                }))}
                columns={columns}
                className="border rounded-md overflow-hidden mt-3"
                pagination={false}
                scroll={{ y: 300, x: 600 }}
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
