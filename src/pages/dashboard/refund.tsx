import axiosInstance from "@/apiClient/axiosConfig";
import SearchInput from "@/components/filters/SearchInput";
import { pagination } from "@/helpers/pagination";
import syncObjectToUrl from "@/helpers/syncObjectToUrl";
import { useQuery } from "@tanstack/react-query";
import { Input, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { debounce } from "lodash";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Page = () => {
    const token = getCookie("token");
    const router = useRouter();
    const t = useTranslations("MyLanguage");
    const p = useTranslations("Placeholder");
    const d = useTranslations("DashboardMenu")
    const { limit, offset, pageIndex, pageSize } = pagination(router)
    const [isReady, setIsReady] = useState(false)



    const columns: ColumnsType<any> = [
        {
            title: t("entryno"),
            dataIndex: "key",
            key: "key",
            width: 80,
            align: "center",
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
        },
        {
            title: t("email"),
            dataIndex: "key",
            key: "key",
            render: (text: string, record: any) => {
                return record?.user?.email;
            },
            ellipsis: true,
        },
        {
            width: 160,
            title: t("date"),
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string, record: any) =>
                dayjs(record.createdAt).format("DD/MM/YYYY HH:mm:ss"), //
        },
        {
            title: ("ID Stream"),
            dataIndex: "key",
            key: "key",
            render: (text: string, record: any) => {
                return record?.activityStream?.id
            },
        },
        {
            title: ("Stream name"),
            dataIndex: "key",
            key: "key",
            render: (text: string, record: any) => {
                return record?.activityStream?.name
            },
        },
        {
            title: t("status"),
            dataIndex: "key",
            key: "key",
            width: 100,
            render: (text: string, record: any) => (
                <Tag
                    color={record?.order?.status == "Canceled" ? "volcano" : "purple"}
                    className="my-1"
                >
                </Tag>
            ),
        },
        {
            width: 130,
            align: "right",
            title: ("Reason"),
            dataIndex: "reason",
            key: "reason",
        },
        {
            width: 130,
            align: "right",
            title: t("refundAmount"),
            dataIndex: "amount",
            key: "amount",
            render: (text: string) => {
                const number = parseFloat(text);
                return parseFloat(number.toFixed(5));
            },
        },
    ];
    const { data, isFetching, isError } = useQuery({
        queryKey: ["orders", router.asPath],
        queryFn: () =>
            axiosInstance.get(`/refund/list?language=en`, {
                params: {
                    keyword: router.query.keyword ?? '',
                    offset: (pageIndex - 1) * pageSize,
                    limit: pageIndex * pageSize,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        placeholderData: (previousData) => previousData,
    });


    console.log("Refund", data)

    const syncObj = syncObjectToUrl(router)
    useEffect(() => {
        setIsReady(router.isReady)
    }, [router])

    return (
        <>
            <div className="flex justify-between my-3">

                <div className="flex" id="filter">
                    <div>
                        <SearchInput />
                    </div>

                </div>
            </div>
            <Table
                loading={isFetching}
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
                    .map((refund: any, index: number) => ({
                        ...refund,
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
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
