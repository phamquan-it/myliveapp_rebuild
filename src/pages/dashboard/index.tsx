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

const Page = () => {
    const t = useTranslations("MyLanguage");
    const data = [
        {
            title: "Deposit from Bank",
            description: "5 march, 18:33 ",
        },
        {
            title: "Ant Design Title 2",
            description: "5 march, 18:33 ",
        },
        {
            title: "Ant Design Title 3",
            description: "5 march, 18:33 ",
        },
        {
            title: "Ant Design Title 4",
            description: "5 march, 18:33 ",
        },
    ];
    const dataSource = [
        {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
    ];


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

                    <Table
                        scroll={{
                            x: 300
                        }}
                        dataSource={[
                            {
                                key: '1',
                                email: 'johndoe@outlook.com',
                                action: 'withDraw',
                                amount: '30$',
                            },
                            {
                                key: '2',
                                name: 'John',
                                age: 42,
                                address: '10 Downing Street',
                            },
                        ]} columns={[
                            {
                                title: 'No.',
                                dataIndex: 'key',
                                key: 'key',
                            },
                            {
                                title: 'Email',
                                dataIndex: 'email',
                                key: 'email',
                            },
                            {
                                title: 'Action',
                                dataIndex: 'acttion',
                                key: 'action',
                            },
                            {
                                title: 'Amount',
                                dataIndex: 'amount',
                                key: 'amount',
                            },

                        ]} pagination={false} />
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

                dataSource={dataSource}
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
