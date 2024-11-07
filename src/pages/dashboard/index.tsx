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
import CashflowTable from "@/components/cashflowTable";

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
            <CashflowTable />
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
