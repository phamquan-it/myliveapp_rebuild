import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import format from "@/hooks/dayjsformatter";
import {
    CheckOutlined,
    CloseOutlined,
    PlusCircleFilled,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
    Button,
    Card,
    DatePicker,
    Form,
    Modal,
    Switch,
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
import { getCookie } from "cookies-next";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Input, Select } from "antd";
import TableAction from "@/components/admin/TableAction";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import { text } from "stream/consumers";
import Link from "next/link";
import filterOptionByLabel from "@/hooks/filterOptionByLabel";
import axiosInstance from "@/apiClient/axiosConfig";
import { pagination } from "@/helpers/pagination";
import syncObjectToUrl from "@/helpers/syncObjectToUrl";
import OrderStatus from "@/components/filters/OrderStatus";
import SearchInput from "@/components/filters/SearchInput";
import Statistic from "@/components/admin/order/statistic";

const { Option } = Select;

const Page = () => {
    const d = useTranslations("DashboardMenu");
    const t = useTranslations("MyLanguage");
    const router = useRouter()
    const { limit, offset, pageIndex, pageSize } = pagination(router, 1, 10)
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
                    {dayjs(text).format("HH:mm:ss")}
                    <br />
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
        {
            title: t("action"),
            dataIndex: "id",
            key: "id",
            width: 70,
            align: "center",
            render: (text: string, record: any) => {
                return (
                    <div className="flex justify-center" style={{
                        maxWidth: 500,
                        margin:"auto",
                        overflow:"hidden"
                        }}>
                        <TableAction
                            openState={openState}
                            viewDetail={<>view detail</>}
                        />
                    </div>
                );
            },
        },
    ];
    const token = getCookie("token");

    const [openState, setOpenState] = useState(false);

    const { data, isFetching, isError } = useQuery({
        queryKey: ["orders", router.asPath],
        queryFn: () =>
            axiosInstance.get("/order?language=en", {
                params: {
                    providerId: router.query.provider ?? null,
                    keyword: router.query.keyword ?? '',
                    status: status,
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
    const handleTableChange = (pagination: TablePaginationConfig) => {
        const current = pagination.current;
        const pageSize = pagination.pageSize;
        syncObj({
            pageIndex: current,
            pageSize: pageSize
        })
    };

    return (
        <>
            <Statistic />
            <div className="flex justify-between my-3 mt-10">
                <div className='grid sm:flex gap-0.5' id="filter">
                    <SearchInput />
                    <OrderStatus />
                </div>
            </div>
            <Table
                dataSource={data?.data.data.map((item: any, index: number) => ({
                    ...item,
                    key: pageIndex * 10 + (index + 1) - 10,
                }))}
                columns={columns}
                loading={isFetching}
                onChange={handleTableChange}
                scroll={{ x: 1200 }}
                pagination={{
                    total: data?.data.total,
                    pageSize: pageSize,
                    current: pageIndex,
                }}
            />
        </>
    );
};
export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../../messages/${locale}.json`)).default,
        },
    };
}

